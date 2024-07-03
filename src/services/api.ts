const BASE_URL = "https://my-json-server.typicode.com/cutamar/mock/books";

export const fetchBooks = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const fetchBookDetail = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
};
