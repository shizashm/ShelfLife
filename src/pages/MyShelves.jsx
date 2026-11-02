import { Link } from "react-router-dom";
import BookCard from "../components/BookCard.jsx";

function MyShelves({ books, onMove, onDelete }) {
  const shelves = [
    { id: "want", title: "Want to Read" },
    { id: "reading", title: "Currently Reading" },
    { id: "finished", title: "Finished" }
  ];

  return (
    <main className="shelves-page">
      <div className="shelves-content">
        <div className="page-heading">
          <div>
            <h1>My Shelves</h1>
            <p>Organize your reading journey</p>
          </div>
        </div>

        <div className="shelves-container">
          
          <div className="shelves-welcome">
            {books.length === 0 ? (
              <>
                <h2>📚 Your reading journey starts here</h2>
                <p>
                  Your shelves are waiting for their first story.
                  Explore books and start building your personal library.
                </p>
              </>
            ) : (
              <>
                <h2>📚 Your library is growing!</h2>
                <p>
                  You have {books.length} {books.length === 1 ? "book" : "books"} in
                  your library. Keep discovering stories and adding them to your shelves.
                </p>
              </>
            )}

            <Link to="/">Explore Books</Link>
          </div>


          {shelves.map((shelf) => {
            const shelfBooks = books.filter(
              (book) => book.shelf === shelf.id
            );

            return (
              <section className="shelf" key={shelf.id}>
                <h2>{shelf.title} ({shelfBooks.length})</h2>

                <div className="books">
                  {shelfBooks.length > 0 ? (
                    shelfBooks.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        onMove={onMove}
                        onDelete={onDelete}
                      />
                    ))
                  ) : (
                    <p className="empty-shelf-text">
                      No books on this shelf yet.
                    </p>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default MyShelves;
