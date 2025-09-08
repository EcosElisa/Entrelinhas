import { createRouter } from "next-connect";
import controller from "infra/controller";
import book from "models/book.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const bookInputValues = request.body;
  const newBook = await book.create(bookInputValues);
  return response.status(201).json(newBook);
}
