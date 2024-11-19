
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  value: 0,
};

// Function to fetch products by filters
export async function fetchProductsByFilters(filter, sort, pagination) {
  // filter example: { category: "smartphone" }
  // sort = {_sort:"price", _order="desc"}
  // pagination = {_page:1, _limit=10}
  // TODO: on server we will support multi values in filter
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

for(let key in sort){
  queryString += `${key}=${sort[key]}&`
}

for(let key in pagination){
  queryString += `${key}=${sort[key]}&`
}
  
  try {
    // Fixed template literal with backticks
    const response = await fetch(`http://localhost:4000/products?${queryString}`);
    const data = await response.json();
    return { data };
  } catch (error) {
    return { data: null, error };
  }
}

// Async thunk to fetch all products
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

// Async thunk to fetch products by filters
export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({filter, sort, pagination}) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    return response.data;
  }
);

// Create the product slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => { // Corrected thunk name
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

// Export actions
export const { increment } = productSlice.actions;

// Selector to get all products
export const selectAllProducts = (state) => state.product.products;

// Export the reducer
export default productSlice.reducer;
