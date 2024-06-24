import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartReducer';
import favoritesReducer from './FavReducer';
import OrderReducer from './OrderReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    orders: OrderReducer,
  },
});

export default store;
