import { createSlice } from "@reduxjs/toolkit";

const genderSlice = createSlice({
  name: "genders",
  initialState: {
    name: [],
  },
  reducers: {
    addGenders: (state, action) => {
      state.name = action.payload;
    },
  },
});
export const { addGenders} = genderSlice.actions;
export default genderSlice.reducer;
