import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { useState } from 'React'

export function App() {
        const [page, setPage] = useState('home')
    return (
        // <section className="app">
        //     <header className="app-header">
        //         <h1>My App</h1>
        //     </header>
        //     <main class="container">
        //         <Home />
        //     </main>
        // </section>

          <section className="app">
                    <header className="app-header container">
                        <section>
                            <h1>Miss books</h1>
                            <nav className="app-nav">
                                <a onClick={() => setPage('home')}>Home</a>
                                <a onClick={() => setPage('about')}>About</a>
                                <a onClick={() => setPage('book')}>Books</a>
                            </nav>
                        </section>
                    </header>
        
                    <main>
                        {page === 'home' && <Home />}
                        {page === 'about' && <About />}
                        {page === 'book' && <BookIndex />}
                    </main>
                </section>
    )

}