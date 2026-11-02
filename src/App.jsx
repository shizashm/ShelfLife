import { useState } from "react";
import { Routes, Route, NavLink, Navigate, useNavigate } from "react-router-dom";
import BookDetails from "./pages/BookDetails.jsx";
import Home from "./pages/Home.jsx";
import MyShelves from "./pages/MyShelves.jsx";
import Statistics from "./pages/Statistics.jsx";
import "./App.css";

function App() {
  // The shelves start empty. Books are added from live Open Library results.
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const navigate = useNavigate();

  function handleLogoClick() {
    setSearchQuery("");
    setSearchBy("title");
    navigate("/");
  }

  function handleMove(book, newShelf) {
    setBooks((previous) => {
      // Removing a book from the shelves is different from searching for it.
      if (newShelf === "none") {
        return previous.filter((item) => item.id !== book.id);
      }

      const exists = previous.some((item) => item.id === book.id);
      if (exists) {
        return previous.map((item) =>
          item.id === book.id ? { ...item, shelf: newShelf } : item
        );
      }
      return [...previous, { ...book, shelf: newShelf }];
    });
  }

  function handleDelete(id) {
    setBooks((previous) => previous.filter((book) => book.id !== id));
  }

  return (
    <div className="app">
      <header className="navbar">
        <h2
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          ShelfLife
        </h2>
        <nav>
          <NavLink to="/">Search</NavLink>
          <NavLink to="/shelves">My Shelves</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
        </nav>
        <div className="profile-icon"><span>👤</span></div>
      </header>

      <Routes>    
        <Route
          path="/"
          element={
            <Home
              query={searchQuery}
              setQuery={setSearchQuery}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
            />
          }
        />
        <Route path="/books/:id" element={<BookDetails books={books} onMove={handleMove} />} />
        <Route path="/shelves" element={<MyShelves books={books} onMove={handleMove} onDelete={handleDelete} />} />
        <Route path="/statistics" element={<Statistics books={books} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
