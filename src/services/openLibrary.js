export async function searchBooks(query, searchBy, signal) {
  const params = new URLSearchParams({
    [searchBy]: query.trim(),
    fields: "key,title,author_name,first_publish_year,cover_i,subject,edition_count",
    limit: "30"
  });
    
  const res = await fetch(`https://openlibrary.org/search.json?${params}`, { signal });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = await res.json();
  return (data.docs || []).map((book) => ({
    id: book.key,
    title: book.title || "Unknown Title",
    author: book.author_name?.[0] || "Unknown Author",
    year: book.first_publish_year || "Unknown",
    subjects: book.subject || [],
    subject: book.subject?.[0] || "General",
    coverId: book.cover_i || null,
    editions: book.edition_count || 0,
    shelf: "none"
  }));
}

export async function getBookDetails(bookId, signal) {
  // URL params contain a work key, for example /works/OL123W.
  const workId = bookId.replace(/^\/works\//, "");
  const res = await fetch(
    `https://openlibrary.org/works/${encodeURIComponent(workId)}.json`,
    { signal }
  );
  if (!res.ok) {
    throw new Error(`Could not load book details: ${res.status}`);
  }
  const data = await res.json();
  return {
    description: typeof data.description === "string"
      ? data.description
      : data.description?.value || "No description available for this book.",
    subjects: data.subjects || []
  };
}
