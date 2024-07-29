export interface QueryType {
  search: string;
  limit: number;
  page: number;
}

export interface BookType {
  id: number;
  Year: number;
  Title: string;
  handle: string;
  Publisher: string;
  ISBN: string;
  Pages: number;
  Notes: string[];
  created_at: string;
  villains: { name: string; url: string }[];
}

export type BooksType = BookType[];

export interface QueryResponseType<T> {
  data: T;
}

export type BookWithQuantityType = BookType & {
  quantity?: number;
  price?: number;
};
