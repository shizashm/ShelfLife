import { useEffect, useState } from "react";
import { BooksContext } from "./BooksContext.js";

// Load saved books when the app starts.
function loadSavedBooks() {
  try {
    const saved = localStorage.getItem("shelflife-books");

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

// Provider stores and manages the books.
export function BooksProvider({ children }) {
  const [books, setBooks] = useState(loadSavedBooks);

  // Save books whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem(
        "shelflife-books",
        JSON.stringify(books)
      );
    } catch {
      console.warn("Could not save books.");
    }
  }, [books]);

  // Add a book or move it to another shelf.
  function handleMove(book, newShelf) {
    setBooks((previous) => {
      if (newShelf === "none") {
        return previous.filter(
          (item) => item.id !== book.id
        );
      }

      const exists = previous.some(
        (item) => item.id === book.id
      );

      if (exists) {
        return previous.map((item) =>
          item.id === book.id
            ? { ...item, shelf: newShelf }
            : item
        );
      }

      return [
        ...previous,
        { ...book, shelf: newShelf }
      ];
    });
  }

  // Remove a book from My Shelves.
  function handleDelete(id) {
    setBooks((previous) =>
      previous.filter((book) => book.id !== id)
    );
  }

  return (
    <BooksContext.Provider
      value={{ books, handleMove, handleDelete }}
    >
      {children}
    </BooksContext.Provider>
  );
}

