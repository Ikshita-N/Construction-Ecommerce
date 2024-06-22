import { createSlice } from "@reduxjs/toolkit";

export const FavoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const itemPresent = state.favorites.find(
        (item) => item.id === action.payload.id
      );
      if (!itemPresent) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = FavoritesSlice.actions;
export default FavoritesSlice.reducer;
