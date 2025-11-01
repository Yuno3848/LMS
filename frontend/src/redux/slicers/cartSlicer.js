import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addCourse: (state, action) => {
      const newCourse = payload.action;

      const itemExist = state.items.find((item) => item == newCourse.id);

      if (!itemExist) {
        state.items.push(newCourse);
      }
    },
    removeCourse: (state, action) => {},
    countCartItems: () => {},
    setQuantity: () => {},
    clearCart: () => {},
  },
});
