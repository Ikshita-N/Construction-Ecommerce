import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartReducer';
import favoritesReducer from './FavReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export default store;
