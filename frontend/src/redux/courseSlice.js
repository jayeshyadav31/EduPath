import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    data: {},
  },
  reducers: {
    addCourse: (state, action) => {
      console.log("I am at createSlice addCourse", action.payload);
      state.data = action.payload;
      console.log(state.data);
    },
    removeCourse: (state) => {
      state.data = {};
    },
  },
});

export const { addCourse, removeCourse } = courseSlice.actions;
export default courseSlice.reducer;
