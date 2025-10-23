import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: [],
};

const itemSlicer = createSlice({
  name: "itemCourse",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setItem: (state, action) => {
      state.item.push(action.payload);
      state.loading = false;
    },

    setClearItemCourse: () => initialState,

    setSubItemCourse: (state, action) => {
      if (state.item) {
        if (!state.item.subItemSection) {
          state.item.subItemSection = [];
        } else {
          state.item.subItemSection.push(action.payload);
        }
      }
    },

    deleteItemCourse: (state, action) => {
      if (state.item && state.item.subItemSection) {
        state.item.subItemSection = state.item.subItemSection.filter(
          (course) => course._id !== action.payload.id
        );
      }
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setItem,
  setClearItemCourse,
  setSubItemCourse,
  deleteItemCourse,
} = itemSlicer.actions;

export default itemSlicer.reducer;
