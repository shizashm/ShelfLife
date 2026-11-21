import { useState } from "react";
import { usePreferences } from "../context/usePreferences.js";

function ReadingPreferences() {
  const { preferences, savePreferences, genreOptions } = usePreferences();

  const [name, setName] = useState(preferences.name);
  const [genres, setGenres] = useState(preferences.genres);
  const [readingGoal, setReadingGoal] = useState(
    String(preferences.readingGoal)
  );

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleGenreChange(genre) {
    setGenres((previous) =>
      previous.includes(genre)
        ? previous.filter((item) => item !== genre)
        : [...previous, genre]
    );

    setErrors((previous) => ({
      ...previous,
      genres: "",
      form: ""
    }));

    setSuccess("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Please enter your name.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (genres.length === 0) {
      newErrors.genres =
        "Please select at least one favorite genre.";
    }

    const goalNumber = Number(readingGoal);

    if (readingGoal.trim() === "") {
      newErrors.readingGoal = "Please enter your reading goal.";
    } else if (
      !Number.isInteger(goalNumber) ||
      goalNumber < 1 ||
      goalNumber > 365
    ) {
      newErrors.readingGoal =
        "Reading goal must be a whole number between 1 and 365.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSuccess("");
      return;
    }

    try {
      savePreferences({
        name: name.trim(),
        genres,
        readingGoal: goalNumber
      });

      setSuccess("Your reading preferences have been saved!");
    } catch {
      setErrors({
        form: "Could not save preferences. Please try again."
      });
      setSuccess("");
    }
  }

  return (
    <main className="preferences-page">
      <h1>Reading Preferences</h1>
      <p>Choose your favorite genres to personalize your book recommendations and set a reading goal.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="reader-name">
            Reader Name
          </label>

          <input
            id="reader-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "", form: "" }));
              setSuccess("");
            }}
            placeholder="Enter your name"
            aria-invalid={!!errors.name}
          />

          {errors.name && (
            <p className="field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-field">
          <label>Favorite Genres</label>

          <div className="genre-options">
            {genreOptions.map((genre) => (
              <label className="genre-option" key={genre}>
                <input
                  type="checkbox"
                  checked={genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>

          {errors.genres && (
            <p className="field-error">
              {errors.genres}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="reading-goal">
            Reading Goal
          </label>

          <input
            id="reading-goal"
            type="number"
            value={readingGoal}
            onChange={(e) => {
              setReadingGoal(e.target.value);
              setErrors((prev) => ({
                ...prev,
                readingGoal: "",
                form: ""
              }));
              setSuccess("");
            }}
            placeholder="e.g. 12"
            aria-invalid={!!errors.readingGoal}
          />

          {errors.readingGoal && (
            <p className="field-error">
              {errors.readingGoal}
            </p>
          )}
        </div>

        {errors.form && (
          <p className="field-error" role="alert">
            {errors.form}
          </p>
        )}

        <button type="submit">
          Save Preferences
        </button>

        {success && (
          <p className="form-success" role="status">
            {success}
          </p>
        )}
      </form>
    </main>
  );
}

export default ReadingPreferences;
