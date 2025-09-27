import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
// import { animateCSS } from "../services/util.service.js"
import { BookDetails } from "../cmps/BookDetails.jsx"

const { useState, useEffect, Fragment } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy())
    
    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    // function onRemoveBook(bookId, { target }) {
    //     const elLi = target.closest('li')

    //     bookService.remove(bookId)
    //         // .then(() => animateCSS(elLi, 'fadeOut'))
    //         .then(() => {
    //             setBooks(books => books.filter(book => book.id !== bookId))
    //         })
    //         .catch(err => console.log('err:', err))
    // }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    /* 
        filterBy = {txt:'asd', minSpeed:123, labels:[...]}
        newFilterBy = {txt:'asd', minSpeed:123}
    */
    function onSetFilterBy(newFilterBy) {
        const prevFilter = bookService.getFilterBy()
        newFilterBy = {...prevFilter, ...newFilterBy}
        bookService.setFilterBy(newFilterBy)
        setFilterBy(newFilterBy)
    }


    // console.log('render')
    if (!books) return <div>Loading...</div>

    return (
        <section className="books-index">
            {selectedBookId
                ? <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />
                : <Fragment>
                    <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                    <BookList
                        books={books}
                        // onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </Fragment>
            }
        </section>
    )

}
