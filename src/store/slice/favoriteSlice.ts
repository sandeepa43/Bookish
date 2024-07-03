import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  favorites: number[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const bookId = action.payload;
      if (state.favorites.includes(bookId)) {
        state.favorites = state.favorites.filter((id) => id !== bookId);
      } else {
        state.favorites.push(bookId);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
