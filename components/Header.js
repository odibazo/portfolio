import Link from 'next/link';

export default function Header() {
    return (
        <header style={{ backgroundColor: 'black', padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: 'white' }}>Odi Bazó</h1>
            <nav>
                <Link href="/" style={{ margin: '0 15px', color: 'white' }}>Home</Link>
                <Link href="/ui-graphic-design" style={{ margin: '0 15px', color: 'white' }}>UI & Graphic Design</Link>
                <Link href="/video" style={{ margin: '0 15px', color: 'white' }}>Video</Link>
            </nav>
        </header>
    );
}
