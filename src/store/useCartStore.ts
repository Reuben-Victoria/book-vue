import { defineStore } from "pinia";

import {
  BookWithQuantityType,
  QueryType,
  BooksType,
  BookType,
} from "../types/books";
import { getbooks, getBookById } from "../services/apis";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cartData: [] as BookWithQuantityType[],
      query: { page: 1, search: "", limit: 10 } as QueryType,
      data: [] as BooksType,
      viewBook: {} as BookType,
      allSearchBooks: [] as BooksType,
      isPending: false,
      isFetching: false,
    };
  },
  getters: {
    totalPrice: (state) => {
      return state.cartData?.reduce(
        (accum, item) => accum + item?.price! * item?.quantity!,
        0
      );
    },
    totalItemsInBag: (state) => {
      return state.cartData?.reduce(
        (accum, item) => accum + (item?.quantity! ?? 0),
        0
      );
    },
    totalPages: (state) => {
      return Math.ceil(state.allSearchBooks?.length! / state.query.limit);
    },
    searchBooks: (state) => {
      return state.query.search !== ""
        ? state.data?.filter((book: BookType) =>
            book?.Title?.toLowerCase().includes(
              state.query.search.toLowerCase()
            )
          )
        : state.data;
    },
    paginateBooks: (state) => {
      const pageSize = state.query.limit;
      const startIndex = (state.query.page - 1) * pageSize;
      const endIndex = state.query.page * pageSize;
      return state.allSearchBooks.slice(startIndex, endIndex);
    },
  },
  actions: {
    setCartData(newState: any) {
      this.cartData = newState;
    },
    updateQuery(newState: Partial<QueryType>) {
      this.$patch({ query: { ...this.query, ...newState } });
    },

    async getAllbooks() {
      this.isPending = true;
      try {
        const response = await getbooks(this.query);
        this.data = response.data;
        this.isPending = false;
        this.allSearchBooks = this.query.search !== ""
          ? response.data.filter((book: BookType) =>
              book?.Title?.toLowerCase().includes(
                this.query.search.toLowerCase()
              )
            )
          : response.data;
      } catch (error) {
        console.error("Error", error);
      } finally {
        this.isPending = false;
      }
    },

    async getBookById(id: string) {
      this.isFetching = true;
      try {
        const response = await getBookById(id);
        this.isFetching = false;
        this.viewBook = response.data;
      } catch (error) {
        console.error("Error", error);
      } finally {
        this.isFetching = false;
      }
    },

    removeFromCartData(id: number) {
      return (this.cartData = this.cartData.filter((item) => item.id !== id));
    },
    updateCartQuantity(id: number, quantity: number) {
      return (this.cartData = this.cartData.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ));
    },
    addToCart(item: BookWithQuantityType) {
      const existingItem = this.cartData.find((book) => book.id === item.id);
      if (existingItem)
        return (this.cartData = this.cartData.map((book) =>
          book.id === item.id
            ? { ...book, quantity: book.quantity! + 1, price: 50 }
            : book
        ));

      return this.cartData.push({ ...item, quantity: 1, price: 50 });
    },
  },
});
