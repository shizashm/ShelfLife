
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchBooks } from "../services/openLibrary.js";

function Home({ query, setQuery, searchBy, setSearchBy }) {
  const [shownBooks, setShownBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const requestRef = useRef(0);

  function handleSearchChange(e) {
    setQuery(e.target.value);
    setLoading(true);
    setError("");
    setShownBooks([]);
  }

  function handleSearchByChange(e) {
    setSearchBy(e.target.value);
    setLoading(true);
    setError("");
    setShownBooks([]);
  }

  useEffect(() => {
    const controller = new AbortController();
    const requestId = ++requestRef.current;

    async function loadBooks() {
      setLoading(true);
      setError("");
      setShownBooks([]);

      try {
        // Show fantasy books when the search box is empty.
        const searchTerm = query.trim() || "fantasy";
        const field = query.trim() ? searchBy : "subject";

        const results = await searchBooks(
          searchTerm,
          field,
          controller.signal
        );

        if (requestId === requestRef.current) {
          setShownBooks(results);
          setHasSearched(query.trim() !== "");
        }
      } catch (err) {
        if (
          err.name !== "AbortError" &&
          requestId === requestRef.current
        ) {
          setError(
            "Could not load books. Please try again."
          );
        }
      } finally {
        if (requestId === requestRef.current) {
          setLoading(false);
        }
      }
    }

    const timer = setTimeout(
      loadBooks,
      query.trim() ? 350 : 0
    );

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, searchBy]);

  return (
    <main className="home-page">
      <section className="home-intro">
        <div className="home-text">
          <h1>Find your next great read</h1>

          <p>Search for books by title, author or subject</p>

          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search for a book..."
            className="search-input"
          />

          <div className="search-options">
            {[
              { value: "title", label: "Title" },
              { value: "author", label: "Author" },
              { value: "subject", label: "Subject" }
            ].map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="searchBy"
                  value={option.value}
                  checked={searchBy === option.value}
                  onChange={handleSearchByChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="home-image">
          <span>📚</span>
        </div>
      </section>

      <section className="search-results">
        <h2>Search Results</h2>

        {/* Loading State */}
        {loading && (
          <div className="search-status" role="status">
            <div className="loading-spinner"></div>
            <h3>Searching the shelves...</h3>
            <p>Finding your next great read.</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="search-status" role="alert">
            <span className="status-emoji">📚</span>
            <h3>Oops! We lost our place.</h3>
            <p>
              We couldn't load the books right now.
              Please try again.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          !error &&
          hasSearched &&
          shownBooks.length === 0 && (
            <div className="search-status">
              <span className="status-emoji">🔎</span>
              <h3>No books found</h3>
              <p>
                We couldn't find a match.
                Try another title, author, or subject!
              </p>
            </div>
          )}

        {/* Book Results */}
        {!loading && !error && shownBooks.length > 0 && (
          <div className="result-books">
            {shownBooks.map((book) => (
              <div className="result-card" key={book.id}>
                <Link
                  to={
                    "/books/" +
                    encodeURIComponent(book.id)
                  }
                  state={{ book }}
                  className="book-link"
                >
                  <div className="result-cover">
                    {book.coverId ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                        alt={`Cover of ${book.title}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    ) : (
                      <span>📖</span>
                    )}
                  </div>

                  <h3>{book.title}</h3>
                </Link>

                <p>{book.author}</p>
                <p>{book.year}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
