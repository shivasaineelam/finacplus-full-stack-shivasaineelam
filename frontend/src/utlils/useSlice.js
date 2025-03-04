import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
  },
  reducers: {
    addname: (state, action) => {
      state.name = action.payload;
    },
  },
});
export const { addname } = userSlice.actions;
export default userSlice.reducer;
