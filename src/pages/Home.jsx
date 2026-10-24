
import { useState } from "react";
import { Link } from "react-router-dom";

function Home({ books }) {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");

  const shownBooks = books.filter((book) => {
    if (searchBy === "subject") {
      return book.subjects.some((subject) =>
        subject.toLowerCase().includes(query.toLowerCase())
      );
    }

    return (book[searchBy] || "").toLowerCase().includes(query.toLowerCase());
  });

  return (
    <main className="home-page">

      <section className="home-intro">
        <div className="home-text">
          <h1>Find your next great read</h1>

          <p>Search for books by title, author or subject</p>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a book..."
            className="search-input"
          />

          <div className="search-options">
            <label>
              <input
                type="radio"
                name="searchBy"
                value="title"
                checked={searchBy === "title"}
                onChange={(e) => setSearchBy(e.target.value)}
              />
              Title
            </label>

            <label>
              <input
                type="radio"
                name="searchBy"
                value="author"
                checked={searchBy === "author"}
                onChange={(e) => setSearchBy(e.target.value)}
              />
              Author
            </label>

            <label>
              <input
                type="radio"
                name="searchBy"
                value="subject"
                checked={searchBy === "subject"}
                onChange={(e) => setSearchBy(e.target.value)}
              />
              Subject
            </label>
          </div>
        </div>

        <div className="home-image">
          <span>📚</span>
        </div>
      </section>

      <section className="search-results">
        <h2>Search Results</h2>

        {shownBooks.length === 0 && (
          <p>No books found.</p>
        )}

        <div className="result-books">
          {shownBooks.map((book) => (
            <div className="result-card" key={book.id}>
              <Link to={"/books/" + book.id} className="book-link">
                <div className="result-cover">📖</div>
                <h3>{book.title}</h3>
              </Link>

              <p>{book.author}</p>
              <p>{book.year}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

export default Home;
