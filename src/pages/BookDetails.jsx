
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getBookDetails } from "../services/openLibrary.js";

function BookDetails({ books, onMove }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const savedBook = books.find((item) => String(item.id) === id);
  const linkedBook = location.state?.book;

  // Only use navigation state when it matches the requested work ID.
  const book = savedBook || (linkedBook?.id === id ? linkedBook : null);

  const [extra, setExtra] = useState(null);
  const [detailsError, setDetailsError] = useState("");
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    // Only Open Library works can be looked up at the Works endpoint.
    if (!id?.startsWith("/works/")) return;

    const controller = new AbortController();
    let active = true;

    async function loadDetails() {
      setDetailsLoading(true);
      setDetailsError("");
      setExtra(null);

      try {
        const details = await getBookDetails(id, controller.signal);

        if (active) {
          setExtra(details);
        }
      } catch (err) {
        if (active && err.name !== "AbortError") {
          setDetailsError("Could not load the additional book details.");
        }
      } finally {
        if (active) {
          setDetailsLoading(false);
        }
      }
    }

    loadDetails();

    return () => {
      active = false;
      controller.abort();
    };
  }, [id]);

  if (!book) {
    return (
      <main className="book-details-page">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Search
        </button>

        <p>
          Book information isn't available here.
          Open the book from Search again.
        </p>
      </main>
    );
  }

  const subjects = extra?.subjects?.length
    ? extra.subjects
    : (book.subjects || []);

  // Remove series tags, duplicates, and empty subjects.
  const cleanedSubjects = [...new Set(subjects)]
    .filter(
      (subject) =>
        typeof subject === "string" &&
        subject.trim() !== "" &&
        !subject.trim().toLowerCase().startsWith("[series:")
    )
    .slice(0, 8);

  const savedShelf = savedBook?.shelf || "none";

  const description =
    extra?.description ||
    book.description ||
    "No description available for this book.";

  return (
    <main className="book-details-page">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="book-details-layout">
        <div className="book-details-left">
          <div className="book-details-info">
            <div className="details-cover">
              {book.coverId ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                  alt={`Cover of ${book.title}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "14px"
                  }}
                />
              ) : (
                <span>📖</span>
              )}
            </div>

            <div className="details-text">
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>

              <p className="details-year">
                Published {book.year}
              </p>

              <h3 className="details-subject-heading">
                Subjects
              </h3>

              <div className="subject-tags">
                {cleanedSubjects.length > 0 ? (
                  cleanedSubjects.map((subject) => (
                    <span
                      className="subject-tag"
                      key={subject}
                    >
                      {subject}
                    </span>
                  ))
                ) : (
                  <p>Subjects not available.</p>
                )}
              </div>
            </div>
          </div>

          <div className="details-shelf">
            <label htmlFor="details-shelf-select">
              Add to Shelf
            </label>

            <select
              id="details-shelf-select"
              value={savedShelf}
              onChange={(e) =>
                onMove({ ...book, ...extra }, e.target.value)
              }
            >
              <option value="none">Not on a shelf</option>
              <option value="want">Want to Read</option>
              <option value="reading">Currently Reading</option>
              <option value="finished">Finished</option>
            </select>
          </div>
        </div>

        <div className="book-details-right">
          <h2>About the Book</h2>

          {detailsLoading ? (
            <p>Loading book description...</p>
          ) : (
            <p className="details-description">
              {description}
            </p>
          )}

          {detailsError && (
            <p role="alert">{detailsError}</p>
          )}

          <div className="edition-note">
            <h3>Other Editions</h3>

            <p>
              {book.editions
                ? `${book.editions} editions listed`
                : "No edition information available."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookDetails;
