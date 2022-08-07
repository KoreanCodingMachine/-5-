import { configureStore } from '@reduxjs/toolkit';
import postReducer from './modules/postSlice';
import comments from "./modules/commentsSlice"; 
import comment from "./modules/commentSlice";
import todo from "./modules/todoSlice";
import todos from "./modules/todosSlice";


export const store = configureStore({
  reducer: {
    post: postReducer,
    comments,
    comment,
    todo,
    todos
  },
});

export default store;
