import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slice/bookSlice";
import favoritesReducer from "./slice/favoriteSlice";
import { loadState, saveState } from "../utils";

const persistedBooksState = loadState<{ books: any[]; additionalBooks: any[] }>(
  "books"
);
const persistedFavoritesState = loadState<number[]>("favorites");

const store = configureStore({
  reducer: {
    books: booksReducer,
    favorites: favoritesReducer,
  },
  preloadedState: {
    books: {
      books: persistedBooksState?.books || [],
      additionalBooks: persistedBooksState?.additionalBooks || [],
      loading: false,
      error: null,
    },
    favorites: {
      favorites: persistedFavoritesState || [],
    },
  },
});

store.subscribe(() => {
  saveState("books", {
    books: store.getState().books.books,
    additionalBooks: store.getState().books.additionalBooks,
  });
  saveState("favorites", store.getState().favorites.favorites);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
