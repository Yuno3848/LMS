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
      state.item = action.payload;
      state.loading = false;
    },


    addItemCourse: (state, action) => {
      state.item.push(action.payload);
      state.loading = false;
    },


    updateItemCourse: (state, action) => {
      const index = state.item.findIndex(
        (section) => section.id === action.payload.id
      );
      if (index !== -1) {
        state.item[index] = action.payload;
      }
      state.loading = false;
    },


    deleteItemCourse: (state, action) => {
      state.item = state.item.filter(
        (section) =>
          section.id !== action.payload && section._id !== action.payload
      );
      state.loading = false;
    },

    addSubItemToSection: (state, action) => {
      const { sectionId, subItem } = action.payload;
      const section = state.item.find(
        (s) => s.id === sectionId || s._id === sectionId
      );
      if (section) {
        if (!section.subItemSection) {
          section.subItemSection = [];
        }
        section.subItemSection.push(subItem);
        section.totalLectures = section.subItemSection.length;
      }
      state.loading = false;
    },

 
    removeSubItemFromSection: (state, action) => {
      const { sectionId, itemId } = action.payload;
      const section = state.item.find(
        (s) => s.id === sectionId || s._id === sectionId
      );
      if (section && section.subItemSection) {
        section.subItemSection = section.subItemSection.filter(
          (item) => item.id !== itemId && item._id !== itemId
        );
        section.totalLectures = section.subItemSection.length;
      }
      state.loading = false;
    },

    
    updateSubItemInSection: (state, action) => {
      const { sectionId, itemId, updatedItem } = action.payload;
      const section = state.item.find(
        (s) => s.id === sectionId || s._id === sectionId
      );
      if (section && section.subItemSection) {
        const itemIndex = section.subItemSection.findIndex(
          (item) => item.id === itemId || item._id === itemId
        );
        if (itemIndex !== -1) {
          section.subItemSection[itemIndex] = {
            ...section.subItemSection[itemIndex],
            ...updatedItem,
          };
        }
      }
      state.loading = false;
    },

  
    setClearItemCourse: () => initialState,
  },
});

export const {
  setLoading,
  setItem,
  addItemCourse,
  updateItemCourse,
  deleteItemCourse,
  addSubItemToSection,
  removeSubItemFromSection,
  updateSubItemInSection,
  setClearItemCourse,
} = itemSlicer.actions;

export default itemSlicer.reducer;
