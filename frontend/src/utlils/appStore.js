import { configureStore } from '@reduxjs/toolkit';
import userReducer from './useSlice';
import genderReducer from './genderSlics';


const appStore = configureStore({
  reducer: {
    user: userReducer,
    gender:genderReducer,
  }
});

export default appStore;
