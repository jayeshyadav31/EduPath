import { configureStore } from "@reduxjs/toolkit";
import courseReducer from './courseSlice';

const appStore = configureStore({
  reducer: {
    course: courseReducer
  }
});

export default appStore;
