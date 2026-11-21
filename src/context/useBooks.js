import { useContext } from "react";
import { BooksContext } from "./BooksContext.js";

export function useBooks() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error(
      "useBooks must be used inside BooksProvider"
    );
  }

  return context;
}
