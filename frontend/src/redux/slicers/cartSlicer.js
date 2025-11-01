import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addCourse: (state, action) => {
      const newCourse = action.payload;

      const itemExist = state.items.find((item) => item.id == newCourse.id);

      if (!itemExist) {
        state.items.push(newCourse);
      }
    },
    removeCourse: (state, action) => {},

    setQuantity: () => {},
    clearCart: () => {},
  },
});

export const { addCourse } = cartSlice.actions;
export default cartSlice.reducer;
