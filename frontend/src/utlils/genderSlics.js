import { createSlice } from "@reduxjs/toolkit";

const genderSlice = createSlice({
  name: "genders",
  initialState: {
    types: [],
  },
  reducers: {
    addGenders: (state, action) => {
      state.types = action.payload;
    },
  },
});
export const { addGenders} = genderSlice.actions;
export default genderSlice.reducer;
