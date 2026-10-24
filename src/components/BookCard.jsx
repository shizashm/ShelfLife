
import { Link } from "react-router-dom";

function BookCard({ book, onMove, onDelete }) {
  return (
    <div className="book-card">
      <Link to={"/books/" + book.id} className="book-link">
        <div className="book-cover">
          <span>📖</span>
        </div>

        <h4>{book.title}</h4>
      </Link>

      <button
        type="button"
        className="delete-book-btn"
        onClick={() => onDelete(book.id)}
        title="Delete book"
      >
        ✘
      </button>

      <p>{book.author}</p>

      <select
        value={book.shelf}
        onChange={(e) => onMove(book.id, e.target.value)}
      >
        <option value="want">Want to Read</option>
        <option value="reading">Currently Reading</option>
        <option value="finished">Finished</option>
      </select>
    </div>
  );
}

export default BookCard;
