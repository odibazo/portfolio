const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const download = require('download');

const URL = 'https://odibazo.com'; // Reemplaza con la URL correcta

async function extractContent() {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        // Extrae los titulares y URLs de las imágenes
        const posts = [];
        $('.post').each((index, element) => {
            const title = $(element).find('.post-title').text().trim();
            const imgUrl = $(element).find('.post-image img').attr('src');

            posts.push({ title, imgUrl });
        });

        // Guarda el JSON con la información extraída
        fs.writeFileSync(path.join(__dirname, 'posts.json'), JSON.stringify(posts, null, 2));

        // Descarga las imágenes
        for (const post of posts) {
            if (post.imgUrl) {
                const imageUrl = new URL(post.imgUrl, URL).href; // Resolviendo URLs relativas
                const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const imagePath = path.join(__dirname, 'public', path.basename(imageUrl));
                fs.writeFileSync(imagePath, imageBuffer.data);
            }
        }

        console.log('Posts saved to posts.json');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

extractContent();
