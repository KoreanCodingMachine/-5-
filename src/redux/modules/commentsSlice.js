import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URI = {
  BASE: process.env.REACT_APP_BASE_URI2,
};

export const __getCommnetsByTodoId = createAsyncThunk(
  'GET_COMMENT_BY_TODO_ID',
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(`${URI.BASE}?todoId=${arg}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __deleteCommentByTodoId = createAsyncThunk(
  'DELETE_COMMNET_BY_TODO_ID',
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${URI.BASE}?todoId=${arg}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __addComment = createAsyncThunk(
  'ADD_COMMENT',
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(`${URI.BASE}`, arg);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  'DELETE_COMMENT',
  async (arg, thunkAPI) => {
    try {
      console.log(arg);
      await axios.delete(`${URI.BASE}/${arg}`);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateComment = createAsyncThunk(
  'UPDATE_COMMENT',
  async (arg, thunkAPI) => {
    try {
      axios.patch(`${URI.BASE}/${arg.id}`, arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  commentsByTodoId: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    // ๋๊ธ ์กฐํ (todoId)
    [__getCommnetsByTodoId.pending]: (state) => {
      state.commentsByTodoId.isLoading = true;
    },
    [__getCommnetsByTodoId.fulfilled]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.data = action.payload;
    },
    [__getCommnetsByTodoId.rejected]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },
    //  ๋ฉ์ธ์์ ์ญ์?ํ์๋ ๋๊ธ๋ ์ญ์?
    [__deleteCommentByTodoId.pending]: (state) => {
      state.commentsByTodo.isLoading = true;
    },
    [__deleteCommentByTodoId.fulfilled]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodo.data = state.commentsByTodo.data.filter(
        (item) => parseInt(item.id) !== action.payload
      );
    },
    [__deleteCommentByTodoId.rejected]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },
    // ๋๊ธ ์ญ์?
    [__deleteComment.pending]: (state) => {
      state.commentsByTodoId.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      const target = state.commentsByTodoId.data.findIndex(
        (comment) => comment.id === action.payload
      );
      state.commentsByTodoId.data.splice(target, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },

    //   // ๋๊ธ ์์?
    [__updateComment.pending]: (state) => {},
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.commentsByTodoId.data.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.commentsByTodoId.data.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: () => {},
    // ๋๊ธ ์ถ๊ฐ
    [__addComment.fulfilled]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.data.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },
    [__addComment.pending]: (state) => {
      state.commentsByTodoId.isLoading = true;
    },
  },
});

export default commentsSlice.reducer;
