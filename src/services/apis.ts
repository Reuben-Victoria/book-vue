import { getQueryToString } from "../utils";
import { GET_BOOKS_API, GET_BOOK_API } from "../constants/apis";

const BASE_URL = import.meta.env.VITE_BOOKS_BASE_URL;

export const getbooks = async (query: Record<string, any>) => {
  const res = await fetch(
    `${BASE_URL}/${GET_BOOKS_API}?${getQueryToString(query)}`
  );
  return res.json();
};

export const getBookById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${GET_BOOK_API}/${id}`);
  return res.json();
};
