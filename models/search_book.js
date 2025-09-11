const API_BASE_URL = "https://openlibrary.org/";

async function searchBooks(query) {
  if (!query) {
    return [];
  }

  const fields = "key,title,author_name,cover_i,first_publish_year";

  const params = new URLSearchParams({
    q: query,
    limit: 10,
    fields: fields,
  });

  try {
    const response = await fetch(`${API_BASE_URL}/search.json?${params}`);

    if (!response.ok) {
      console.error("Failed to fetch from API:", response.statusText);
      return [];
    }

    const data = await response.json();

    const formattedBooks = data.docs.map((doc) => ({
      key: doc.key,
      title: doc.title,
      author_name: doc.author_name,
      cover_id: doc.cover_i,
      cover_url: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : null,
      first_publish_year: doc.first_publish_year,
    }));

    return formattedBooks;
  } catch (error) {
    console.error("An error occurred while searching for books:", error);
    return [];
  }
}

export default searchBooks;
