import { useState } from "react";
import { PreferencesContext } from "./PreferencesContext.js";

const genreOptions = [
  "Fantasy",
  "Romance",
  "Mystery",
  "Science Fiction",
  "Horror",
  "Thriller",
  "Historical Fiction",
  "Contemporary Fiction"
];

function loadPreferences() {
  try {
    const saved = localStorage.getItem("shelflife-preferences");

    if (!saved) {
      return {
        name: "",
        genres: [],
        readingGoal: ""
      };
    }

    const data = JSON.parse(saved);

    return {
      name: typeof data.name === "string" ? data.name : "",
      genres: Array.isArray(data.genres)
        ? data.genres.filter((genre) =>
            genreOptions.includes(genre)
          )
        : typeof data.genre === "string" &&
            genreOptions.includes(data.genre)
          ? [data.genre]
          : [],
      readingGoal:
        Number.isInteger(Number(data.readingGoal)) &&
        Number(data.readingGoal) >= 1 && Number(data.readingGoal) <= 365
          ? String(data.readingGoal)
          : ""
    };
  } catch {
    return {
      name: "",
      genres: [],
      readingGoal: ""
    };
  }
}

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(loadPreferences);

  // Save only after the form passes validation.
  function savePreferences(nextPreferences) {
    localStorage.setItem(
      "shelflife-preferences",
      JSON.stringify(nextPreferences)
    );
    setPreferences(nextPreferences);
  }

  return (
    <PreferencesContext.Provider value={{ preferences, savePreferences, genreOptions }}>
      {children}
    </PreferencesContext.Provider>
  );
}
