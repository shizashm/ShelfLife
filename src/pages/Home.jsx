import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { usePreferences } from "../context/usePreferences.js";
import { searchBooks } from "../services/openLibrary.js";

function Home({ query, setQuery, searchBy, setSearchBy }) {
  const { preferences } = usePreferences();
  const { name, genres } = preferences;
  const [shownBooks, setShownBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        let results;

        if (query.trim()) {
          results = await searchBooks(query, searchBy, controller.signal);
        } else if (genres.length > 0) {
          // Search for books matching any of the saved genres in one request.
          const genreQuery = genres.map((genre) => `subject:"${genre}"`).join(" OR ");
          results = await searchBooks(genreQuery, "q", controller.signal);
          results = results.slice(0, 21);
        } else {
          results = await searchBooks("fantasy", "subject", controller.signal);
        }

        if (!controller.signal.aborted && requestId === requestRef.current) {
          setShownBooks(results);
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
        if (!controller.signal.aborted && requestId === requestRef.current) {
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
  }, [query, searchBy, genres]);

  return (
    <main className="home-page">
      <section className="home-intro">
        <div className="home-text">
          <h1>{name ? `Find your next great read, ${name}` : "Find your next great read"}</h1>

          <p>Search for books by title, author or subject</p>

          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search for a book..."
            aria-label="Search for a book"
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
        <h2>{query.trim() ? "Search Results" : genres.length > 0 ? "Recommended for You" : "Discover Books"}</h2>
        {!query.trim() && genres.length > 0 && (
          <p>Based on your favorite genres: <i>{genres.join(", ")}</i></p>
        )}

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
          shownBooks.length === 0 && (
            <div className="search-status">
              <span className="status-emoji">🔎</span>
              <h3>No books found</h3>
              <p>
                {query.trim()
                  ? "Try another title, author, or subject!"
                  : "Try a search or change your favorite genres in Preferences."}
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
