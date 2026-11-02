import { Link } from "react-router-dom";

function BookCard({ book, onMove, onDelete }) {
  return (
    <div className="book-card">
      <Link
        to={"/books/" + encodeURIComponent(book.id)}
        state={{ book }}
        className="book-link"
      >
        <div className="book-cover">
          {book.coverId ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
              alt={`Cover of ${book.title}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "9px" }}
            />
          ) : (
            <span>📖</span>
          )}
        </div>
        <h4>{book.title}</h4>
      </Link>

      <button
        type="button"
        className="delete-book-btn"
        title="Remove from My Shelves"
        aria-label={`Remove ${book.title} from My Shelves`}
        onClick={() => onDelete(book.id)}
      >
        ✘
      </button>

      <p>{book.author}</p>
      <select
        aria-label={`Shelf for ${book.title}`}
        value={book.shelf}
        onChange={(e) => onMove(book, e.target.value)}
      >
        <option value="want">Want to Read</option>
        <option value="reading">Currently Reading</option>
        <option value="finished">Finished</option>
      </select>
    </div>
  );
}

export default BookCard;
