import { useState } from "react";

export default function SearchBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchResults([]);
    setError(null);

    if (!searchQuery.trim()) {
      setError("Por favor, digite um termo para buscar.");
      return;
    }

    setIsLoading(true);

    try {
      const params = new URLSearchParams({ q: searchQuery });

      const response = await fetch(`/api/v1/search_books?${params}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocorreu um erro na busca.");
      }

      const books = await response.json();
      console.log("books: ", books);
      setSearchResults(books);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBook = async (bookToSave) => {
    try {
      const response = await fetch("/api/v1/books", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bookToSave),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar livro");
      }

      const savedBook = await response.json();
      alert(`Livro "${savedBook.title}" foi salvo com sucesso!`);
    } catch (err) {
      console.error("Save Error: ", err);
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1> Busca de Livros</h1>
      <p>Use a barra abaixo para encontrar seus livros.</p>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ex: O senhor dos Anéis"
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "15px" }}>Erro: {error}</p>
      )}
      <div id="results" style={{ marginTop: "30px" }}>
        {searchResults.map((book) => (
          <div
            key={book.key}
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "20px",
            }}
          >
            <img
              src={
                book.cover_url || "https://placehold.co/128x192?text=Sem+Capa"
              }
              alt={`Capa do livro ${book.title}`}
              style={{ width: "128px", height: "192px", objectFit: "cover" }}
            />
            <div>
              <h2 style={{ marginTop: 0 }}>{book.title}</h2>
              <p>
                <strong>Author:</strong> {book.author_name[0]}
              </p>
              <p>
                <strong> Ano de Publicação:</strong> {book.first_publish_year}
              </p>
              {/* TODO: Add a button to save the book to a list */}
              <button onClick={() => handleSaveBook(book)}>
                Adicionar à Lista
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
