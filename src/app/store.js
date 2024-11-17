import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/counter/product/productSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
