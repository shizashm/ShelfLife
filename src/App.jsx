import { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import BookDetails from "./pages/BookDetails.jsx";
import Home from "./pages/Home.jsx";
import MyShelves from "./pages/MyShelves.jsx";
import Statistics from "./pages/Statistics.jsx";
import "./App.css";


const sampleBooks = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    subject: "Fantasy",
    shelf: "want",
    subjects: ["Fantasy", "Adventure", "Fiction", "Classics"],
    description: "Bilbo Baggins enjoys a quiet life until the wizard Gandalf persuades him to join a band of dwarves on a dangerous journey. Along the way, he encounters trolls, a creature called Gollum, and a powerful ring. The adventure changes his understanding of courage and home."
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    subject: "Science Fiction",
    shelf: "want",
    subjects: ["Science Fiction", "Dystopian", "Thriller", "Classics"],
    description: "Winston Smith lives in Oceania, where the Party watches its citizens and rewrites the past. As he begins to question the world around him, he risks everything to seek truth and a private life. George Orwell's novel explores surveillance, power, and the manipulation of language."
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    subject: "Romance",
    shelf: "want",
    subjects: ["Romance", "Drama", "Fiction", "Classics"],
    description: "Elizabeth Bennet is quick-witted and determined to think for herself, even as her family worries about marriage and status. Her encounters with the reserved Mr. Darcy lead both of them to reconsider their first impressions. The novel is a lively portrait of love, pride, class, and family expectations."
  },
  {
    id: 4,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    year: 2008,
    subject: "Science Fiction",
    shelf: "want",
    subjects: ["Science Fiction", "Action", "Adventure", "Young Adult"],
    description: "In the nation of Panem, each district must send two young people to a televised contest in which only one can survive. Katniss Everdeen volunteers to protect her sister and enters an arena designed to entertain the powerful. Her choices turn a fight for survival into an act of defiance."
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    subject: "Science Fiction",
    shelf: "reading",
    subjects: ["Science Fiction", "Adventure", "Fantasy", "Action"],
    description: "Paul Atreides arrives on Arrakis, a desert planet prized for the substance called spice. When rival powers threaten his family, he must navigate unfamiliar cultures, political schemes, and a destiny he does not fully understand. The story explores ecology, belief, and the dangers of power."
  },
  {
    id: 6,
    title: "Little Women",
    author: "Louisa May Alcott",
    year: 1868,
    subject: "Classic Fiction",
    shelf: "reading",
    subjects: ["Classics", "Drama", "Family", "Romance"],
    description: "Meg, Jo, Beth, and Amy March grow up together while their father is away during the American Civil War. Each sister pursues different hopes and learns from friendship, hardship, and change. Their story is about family bonds, independence, and finding a place in the world."
  },
  {
    id: 7,
    title: "Harry Potter",
    author: "J.K. Rowling",
    year: 1997,
    subject: "Fantasy",
    shelf: "finished",
    subjects: ["Fantasy", "Adventure", "Mystery", "Young Adult"],
    description: "On his eleventh birthday, Harry Potter learns that he is a wizard and has been invited to Hogwarts School of Witchcraft and Wizardry. There, he makes close friends, discovers secrets about his past, and faces a mystery hidden within the school. This sample entry represents the first book in the series."
  },
  {
    id: 8,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    subject: "Classic Fiction",
    shelf: "finished",
    subjects: ["Classics", "Romance", "Drama", "Fiction"],
    description: "Nick Carraway moves to Long Island and becomes fascinated by his wealthy, mysterious neighbor Jay Gatsby. Gatsby's extravagant parties conceal a longing for a past he hopes to reclaim. Set during the Jazz Age, the novel examines ambition, wealth, love, and illusion."
  },
  {
    id: 9,
    title: "The Book Thief",
    author: "Markus Zusak",
    year: 2005,
    subject: "Historical Fiction",
    shelf: "finished",
    subjects: ["Historical Fiction", "Drama", "War", "Young Adult"],
    description: "In Nazi Germany, Liesel Meminger finds comfort in reading after being sent to live with a foster family. She begins collecting books and sharing stories as war reshapes the lives of people around her. The novel portrays friendship, grief, and the power of words during a frightening time."
  }
];


const emptyForm = {
  title: "",
  author: "",
  year: "",
  shelf: "want"
};

function App() {
  const [books, setBooks] = useState(sampleBooks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const wantBooks = books.filter((book) => book.shelf === "want");
  const readingBooks = books.filter((book) => book.shelf === "reading");
  const finishedBooks = books.filter((book) => book.shelf === "finished");

  function handleMove(id, newShelf) {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, shelf: newShelf } : book
      )
    );
  }

  function handleDelete(id) {
    handleMove(id, "none");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleAddBook(e) {
    e.preventDefault();

    if (
      form.title.trim() === "" ||
      form.author.trim() === "" ||
      form.year === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const newBook = {
      id: Math.max(0, ...books.map((book) => book.id)) + 1,
      title: form.title.trim(),
      author: form.author.trim(),
      year: Number(form.year),
      shelf: form.shelf,
      subject: "General",
      subjects: ["General"],
      description: "No description available yet."
    };

    setBooks([...books, newBook]);
    setForm(emptyForm);
    setError("");
    setShowAddForm(false);
  }

  function handleToggleForm() {
    setShowAddForm(!showAddForm);
    setForm(emptyForm);
    setError("");
  }

  return (
    <div className="app">
      <header className="navbar">
        <h2>ShelfLife</h2>

        <nav>
          <NavLink to="/">Search</NavLink>
          <NavLink to="/shelves">My Shelves</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
        </nav>

        <div className="profile-icon">
          <span>👤</span>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home books={books} />} />

        <Route
          path="/books/:id"
          element={
            <BookDetails
              books={books}
              onMove={handleMove}
            />
          }
        />

        <Route
          path="/shelves"
          element={
            <MyShelves
              wantBooks={wantBooks}
              readingBooks={readingBooks}
              finishedBooks={finishedBooks}
              onMove={handleMove}
              showAddForm={showAddForm}
              handleToggleForm={handleToggleForm}
              form={form}
              onDelete={handleDelete}
              handleChange={handleChange}
              handleAddBook={handleAddBook}
              error={error}
            />
          }
        />

        <Route
          path="/statistics"
          element={<Statistics books={books} />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
