import { useNavigate, useParams } from "react-router-dom";

function BookDetails({ books, onMove }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const book = books.find((item) => item.id === Number(id));

  if (!book) {
    return (
      <main className="book-details-page">
        <button className="back-button" onClick={() => navigate("/shelves")}>← Back to My Shelves</button>
        <p>Book not found.</p>
      </main>
    );
  }

  return (
    <main className="book-details-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="book-details-layout">
        <div className="book-details-left">
          <div className="book-details-info">
            <div className="details-cover">📖</div>

            <div className="details-text">
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
              <p className="details-year">Published {book.year}</p>

              <h3 className="details-subject-heading">Subjects</h3>
              <div className="subject-tags">
                {(book.subjects || [book.subject || "General"]).map((subject) => (
                  <span className="subject-tag" key={subject}>{subject}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="details-shelf">
            <label htmlFor="details-shelf-select">Add to Shelf</label>
            <select
              id="details-shelf-select"
              value={book.shelf}
              onChange={(e) => onMove(book.id, e.target.value)}
            >
              <option value="none">Select a shelf</option>
              <option value="want">Want to Read</option>
              <option value="reading">Currently Reading</option>
              <option value="finished">Finished</option>
            </select>
          </div>
        </div>

        <div className="book-details-right">
          <h2>About the Book</h2>
          <p className="details-description">{book.description}</p>

          <div className="edition-note">
            <h3>Other Editions</h3>
            <p>No editions found.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookDetails;
