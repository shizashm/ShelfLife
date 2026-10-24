
function Statistics({ books }) {
  const savedBooks = books.filter((book) => book.shelf !== "none");

  const wantCount = books.filter(
    (book) => book.shelf === "want"
  ).length;

  const readingCount = books.filter(
    (book) => book.shelf === "reading"
  ).length;

  const finishedCount = books.filter(
    (book) => book.shelf === "finished"
  ).length;

  const totalBooks = savedBooks.length;

  const shelfStats = [
    { name: "Want to Read", count: wantCount },
    { name: "Currently Reading", count: readingCount },
    { name: "Finished", count: finishedCount }
  ];

  const publicationStats = [
    {
      name: "Before 1950",
      count: savedBooks.filter((book) => book.year < 1950).length
    },
    {
      name: "1950–1999",
      count: savedBooks.filter(
        (book) => book.year >= 1950 && book.year <= 1999
      ).length
    },
    {
      name: "2000 and later",
      count: savedBooks.filter((book) => book.year >= 2000).length
    }
  ];

  return (
    <main className="statistics-page">
      <h1>Reading Statistics</h1>
      <p>Track your reading journey</p>

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
                    width: totalBooks === 0
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
                    width: totalBooks === 0
                      ? "0%"
                      : `${(item.count / totalBooks) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Statistics;
