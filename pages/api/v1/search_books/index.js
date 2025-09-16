import searchBooks from "models/search_book";

export default async function getHandler(request, response) {
  const { q } = request.query;
  const books = await searchBooks(q);
  return response.status(200).json(books);
}
