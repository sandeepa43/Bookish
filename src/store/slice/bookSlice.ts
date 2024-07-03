import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TBook } from "../../interfaces/Book";
import { fetchBooks } from "../../services/api";

interface BooksState {
  books: TBook[];
  additionalBooks: TBook[];
  loading: boolean;
  error: number | null;
}

const initialState: BooksState = {
  books: [],
  additionalBooks: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: any) => {
      state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<TBook>) => {
      state.additionalBooks.push({ ...action.payload, createdBy: "user" });
    },
    updateBook: (state, action: PayloadAction<TBook>) => {
      const index = state.additionalBooks.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.additionalBooks[index] = action.payload;
      }
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      state.additionalBooks = state.additionalBooks.filter(
        (book) => book.id !== action.payload
      );
    },
  },
});

export const { addBook, setBooks, updateBook, deleteBook } = booksSlice.actions;

export default booksSlice.reducer;
