/** Visual QA for the existing ODI portfolio on a local production build.
 * Only runs in CI against localhost. No publishing or production changes.
 */
const { chromium, devices } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const baseURL = process.env.QA_BASE_URL || 'http://127.0.0.1:3100';
  const artifacts = path.resolve('qa-artifacts');
  fs.mkdirSync(artifacts, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = { baseURL, checks: [], errors: [] };
  const mark = (name) => { report.checks.push({ name, status: 'PASS' }); console.log('PASS', name); };

  async function checkHome(name, contextOptions) {
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    page.on('pageerror', (error) => report.errors.push(name + ': ' + error.message));
    try {
      const response = await page.goto(baseURL + '/', { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200);
      await page.getByRole('heading', { level: 1 }).waitFor();
      assert.match(await page.title(), /Odi Bazó/);
      assert(await page.getByRole('link', { name: /Contact me/i }).count() > 0);
      assert(await page.getByText('Artistic Obsessions.', { exact: false }).count() > 0);
      mark(name + ' - hero, contact, archive');
      const width = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, inner: innerWidth }));
      assert(width.doc <= width.inner + 2, 'Horizontal page overflow: ' + JSON.stringify(width));
      mark(name + ' - no horizontal overflow');
      await page.locator('#work').scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      const broken = await page.locator('#work img').evaluateAll((imgs) =>
        imgs.filter((im) => !im.complete || im.naturalWidth === 0).map((im) => im.getAttribute('src')));
      assert.deepEqual(broken, [], 'Broken project images: ' + broken.join(', '));
      mark(name + ' - project images load');
      await page.screenshot({ path: path.join(artifacts, 'home-' + name + '.png'), fullPage: true, animations: 'disabled' });

      if (name === 'desktop') {
        await page.evaluate(() => scrollTo(0, 0));
        await page.mouse.move(120, 120);
        await page.mouse.move(290, 235, { steps: 10 });
        await page.waitForTimeout(90);
        const activeParticles = await page.locator('canvas[aria-hidden="true"]').first().evaluate((c) => {
          const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
          let count = 0;
          for (let i = 3; i < d.length; i += 4) if (d[i] > 0) count++;
          return count;
        });
        assert(activeParticles > 0, 'Cursor trail canvas did not draw particles');
        mark('desktop - cursor trail produces real painted pixels');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.waitForTimeout(80);
        mark('desktop - reduced motion mode exercised');
      }
    } finally { await context.close(); }
  }

  async function check404(name, contextOptions) {
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    page.on('pageerror', (error) => report.errors.push(name + ': ' + error.message));
    try {
      const response = await page.goto(baseURL + '/play-404', { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200);
      await page.getByRole('heading', { name: /Break the/i }).waitFor();
      assert(await page.locator('main canvas[role="img"]').count() === 1);
      await page.getByRole('button', { name: /CHAOS MODE/i }).click();
      await page.getByText('CHAOS: 01').waitFor();
      await page.getByRole('button', { name: /RESET/i }).click();
      await page.getByText('CHAOS: 00').waitFor();
      mark(name + ' - 404 canvas, chaos and reset interaction');
      await page.screenshot({ path: path.join(artifacts, '404-' + name + '.png'), fullPage: true, animations: 'disabled' });
      const width = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, inner: innerWidth }));
      assert(width.doc <= width.inner + 2, '404 horizontal overflow: ' + JSON.stringify(width));
      mark(name + ' - 404 responsive width');
    } finally { await context.close(); }
  }

  try {
    await checkHome('desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, hasTouch: false });
    await checkHome('mobile', { ...devices['iPhone 13'], locale: 'en-US' });
    await check404('desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await check404('mobile', { ...devices['iPhone 13'], locale: 'en-US' });
    assert.deepEqual(report.errors, [], 'Client runtime errors: ' + report.errors.join(' | '));
    mark('browser JS - no uncaught page errors');
    report.status = 'PASS';
  } catch (error) {
    report.status = 'FAIL';
    report.failure = String(error.stack || error);
    console.error(report.failure);
    process.exitCode = 1;
  } finally {
    fs.writeFileSync(path.join(artifacts, 'report.json'), JSON.stringify(report, null, 2));
    await browser.close();
  }
})().catch((e) => { console.error(e); process.exitCode = 1; });
