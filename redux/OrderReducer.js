import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Load initial state from AsyncStorage
const loadInitialOrders = async () => {
  try {
    const orders = await AsyncStorage.getItem("orders");
    return orders ? JSON.parse(orders) : [];
  } catch (e) {
    console.error("Failed to load orders from AsyncStorage", e);
    return [];
  }
};

const initialState = {
  orders: [],
  loading: true,
};

export const OrderSlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    addOrder: (state, action) => {
      const newOrders = [...state.orders, action.payload];
      AsyncStorage.setItem("orders", JSON.stringify(newOrders)).catch((e) =>
        console.error("Failed to save orders to AsyncStorage", e)
      );
      state.orders = newOrders;
    },
    completeOrder: (state, action) => {
      const newOrders = [...state.orders, action.payload];
      AsyncStorage.setItem("orders", JSON.stringify(newOrders)).catch((e) =>
        console.error("Failed to save orders to AsyncStorage", e)
      );
      state.orders = newOrders;
    },
    removeOrder: (state, action) => {
      const newOrders = state.orders.filter(
        (order) => order.id !== action.payload.id
      );
      AsyncStorage.setItem("orders", JSON.stringify(newOrders)).catch((e) =>
        console.error("Failed to save orders to AsyncStorage", e)
      );
      state.orders = newOrders;
    },
    clearOrders: (state) => {
      AsyncStorage.setItem("orders", JSON.stringify([])).catch((e) =>
        console.error("Failed to save orders to AsyncStorage", e)
      );
      state.orders = [];
    },
  },
});

export const { setOrders, addOrder, completeOrder, removeOrder, clearOrders } = OrderSlice.actions;

export const loadOrders = () => async (dispatch) => {
  const orders = await loadInitialOrders();
  dispatch(setOrders(orders));
};

export default OrderSlice.reducer;
