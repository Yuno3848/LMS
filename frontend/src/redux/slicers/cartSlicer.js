import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.items = action.payload;
    },
    removeCourse: (state, action) => {

    state.items = state.items.filter((item)=>item._id !== action.payload)

    },

    setQuantity: () => {},
    clearCart: () => ({ ...initialState }),
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addCourse, setLoading, clearCart, removeCourse } = cartSlice.actions;
export default cartSlice.reducer;
