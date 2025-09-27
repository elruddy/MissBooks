export function BookPreview({ book }) {
    const { title } = book

    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            {/* <h4>Car Speed: {speed}</h4>
            <img src={`../assets/img/${vendor}.png`} alt="Car Image" /> */}
        </article>
    )
}