import { useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  Link
} from "react-router-dom";
import ReadingPreferences from "./pages/ReadingPreferences.jsx";

import BookDetails from "./pages/BookDetails.jsx";
import Home from "./pages/Home.jsx";
import MyShelves from "./pages/MyShelves.jsx";
import Statistics from "./pages/Statistics.jsx";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");

  function handleLogoClick() {
    setSearchQuery("");
    setSearchBy("title");
  }

  return (
    <div className="app">
      <header className="navbar">
        <Link to="/" className="navbar-brand" onClick={handleLogoClick}>
          <img src="/shelflife-icon.png" alt="" className="brand-icon" />
          <h2>ShelfLife</h2>
        </Link>

        <nav>
          <NavLink to="/">Search</NavLink>
          <NavLink to="/shelves">My Shelves</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
          <NavLink to="/preferences">Preferences</NavLink>
        </nav>

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

        <Route
          path="/books/:id"
          element={<BookDetails />}
        />

        <Route
          path="/shelves"
          element={<MyShelves />}
        />

        <Route
          path="/statistics"
          element={<Statistics />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="/preferences"
          element={<ReadingPreferences />}
        />
      </Routes>
    </div>
  );
}

export default App;
