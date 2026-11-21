
import { useState } from "react";
import { useBooks } from "../context/useBooks.js";

function Statistics() {
  const { books } = useBooks();

  // Load saved reading goal from Preferences
  const [readingGoal] = useState(() => {
    try {
      const saved = localStorage.getItem("shelflife-preferences");

      if (!saved) return 0;

      const preferences = JSON.parse(saved);
      const goal = Number(preferences.readingGoal);

      return Number.isInteger(goal) && goal > 0
        ? goal
        : 0;
    } catch {
      return 0;
    }
  });

  // Get all saved books
  const savedBooks = books.filter(
    (book) => book.shelf !== "none"
  );

  // Count books in each shelf
  const wantCount = savedBooks.filter(
    (book) => book.shelf === "want"
  ).length;

  const readingCount = savedBooks.filter(
    (book) => book.shelf === "reading"
  ).length;

  const finishedCount = savedBooks.filter(
    (book) => book.shelf === "finished"
  ).length;

  const totalBooks = savedBooks.length;

  // Calculate annual reading goal progress
  const goalProgress =
    readingGoal > 0
      ? Math.min((finishedCount / readingGoal) * 100, 100)
      : 0;

  // Books by shelf
  const shelfStats = [
    { name: "Want to Read", count: wantCount },
    { name: "Currently Reading", count: readingCount },
    { name: "Finished", count: finishedCount }
  ];

  // Books by publication date
  const publicationStats = [
    {
      name: "Before 1950",
      count: savedBooks.filter(
        (book) => book.year < 1950
      ).length
    },
    {
      name: "1950–1999",
      count: savedBooks.filter(
        (book) => book.year >= 1950 && book.year <= 1999
      ).length
    },
    {
      name: "2000 and later",
      count: savedBooks.filter(
        (book) => book.year >= 2000
      ).length
    }
  ];

  return (
    <main className="statistics-page">
      <h1>Reading Statistics</h1>
      <p>Track your reading journey</p>

      {/* Summary cards */}
      <div className="stats-summary">
        <div className="stat-box">
          <h2>Total Books</h2>
          <p>{totalBooks}</p>
        </div>

        <div className="stat-box">
          <h2>Finished Books</h2>
          <p>{finishedCount}</p>
        </div>
      </div>

      {/* Statistics charts */}
      <div className="stats-charts">
        <section className="stat-box">
          <h2>Books by Shelf</h2>

          {shelfStats.map((item) => (
            <div className="chart-item" key={item.name}>
              <div className="chart-label">
                <span>{item.name}</span>
                <span>{item.count}</span>
              </div>

              <div className="chart-bar">
                <div
                  className="chart-fill"
                  style={{
                    width:
                      totalBooks === 0
                        ? "0%"
                        : `${(item.count / totalBooks) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </section>

        <section className="stat-box">
          <h2>Books by Publication Date</h2>

          {publicationStats.map((item) => (
            <div className="chart-item" key={item.name}>
              <div className="chart-label">
                <span>{item.name}</span>
                <span>{item.count}</span>
              </div>

              <div className="chart-bar">
                <div
                  className="chart-fill"
                  style={{
                    width:
                      totalBooks === 0
                        ? "0%"
                        : `${(item.count / totalBooks) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Annual Reading Goal */}
      <section className="reading-goal-card">
        <h2>Annual Reading Goal</h2>

        {readingGoal > 0 ? (
          <>
            <p>
              <strong>{finishedCount}</strong> / {readingGoal} books finished
            </p>

            <div className="reading-goal-track">
              <div
                className="reading-goal-fill"
                style={{ width: `${goalProgress}%` }}
              ></div>
            </div>

            <p>
              {Math.round(goalProgress)}% of your goal completed
            </p>
          </>
        ) : (
          <p>
            No reading goal set yet. Visit Preferences to set one!
          </p>
        )}
      </section>
    </main>
  );
}

export default Statistics;
