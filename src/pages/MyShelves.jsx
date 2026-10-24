import BookCard from "../components/BookCard.jsx";

function MyShelves({
  wantBooks,
  readingBooks,
  finishedBooks,
  onMove,
  onDelete,
  showAddForm,
  handleToggleForm,
  form,
  handleChange,
  handleAddBook,
  error
}) {
  return (
    <main className="shelves-page">
      <div className="shelves-content">

        <div className="page-heading">
          <div>
            <h1>My Shelves</h1>
            <p>Organize your reading journey</p>
          </div>

          <button onClick={handleToggleForm}>
            {showAddForm ? "Cancel" : "+ Add Book"}
          </button>
        </div>

        {showAddForm && (
          <div className="popup-overlay">
            <div className="add-book-form">
              <h2>Add a New Book</h2>

              <form onSubmit={handleAddBook}>
                <div>
                  <label htmlFor="title">Book Title:</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                  />
                </div>

                <div>
                  <label htmlFor="author">Author:</label>
                  <input
                    id="author"
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                  />
                </div>

                <div>
                  <label htmlFor="year">Publication Year:</label>
                  <input
                    id="year"
                    type="number"
                    name="year"
                    min="1"
                    value={form.year}
                    onChange={handleChange}
                    placeholder="Enter publication year"
                  />
                </div>

                <div>
                  <label htmlFor="shelf">Shelf:</label>
                  <select
                    id="shelf"
                    name="shelf"
                    value={form.shelf}
                    onChange={handleChange}
                  >
                    <option value="want">Want to Read</option>
                    <option value="reading">Currently Reading</option>
                    <option value="finished">Finished</option>
                  </select>
                </div>

                {error && <p className="form-error">{error}</p>}

                <div className="form-buttons">
                  <button type="submit">Add Book</button>
                  <button type="button" onClick={handleToggleForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="shelf">
          <h2>Want to Read ({wantBooks.length})</h2>

          <div className="books">
            {wantBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onMove={onMove}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>

        <section className="shelf">
          <h2>Currently Reading ({readingBooks.length})</h2>

          <div className="books">
            {readingBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onMove={onMove}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>

        <section className="shelf">
          <h2>Finished ({finishedBooks.length})</h2>

          <div className="books">
            {finishedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onMove={onMove}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>
      </div>

    </main>
  );
}

export default MyShelves;
