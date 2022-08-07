import { configureStore } from '@reduxjs/toolkit';
import postReducer from './modules/postSlice';

import comments from './modules/commentsSlice';
import comment from './modules/commentSlice';



export const store = configureStore({
  reducer: {
    post: postReducer,
    comments,
    comment,
  },
});

export default store;
