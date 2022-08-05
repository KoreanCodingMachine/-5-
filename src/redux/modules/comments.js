import {createSlice, configureStore, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";


export const __getCommnetsByTodoId = createAsyncThunk(
  "GET_COMMENT_BY_TODO_ID",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://localhost:5001/comment_list?todo_Id=${arg}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(`http://localhost:5001/comment_list`, arg);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  comments: {
    data: [],
    isLoading: false,
    error: null,
  },
  commentsByTodoId: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearTodo: (state) => {
      state.comments = null;
    },
  },
  extraReducers: {
    // 전체 댓글 조회
    // [__getCommentsThunk.pending]: (state) => {
    //   state.comments.isLoading = true;
    // },
    // [__getCommentsThunk.fulfilled]: (state, action) => {
    //   state.comments.isLoading = false;
    //   state.comments.data = action.payload;
    // },
    // [__getCommentsThunk.rejected]: (state, action) => {
    //   state.comments.isLoading = false;
    //   state.comments.error = action.payload;
    // },

    // 댓글 조회 (todoId)
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

  //   // 댓글 삭제
  //   [__deleteComment.pending]: (state) => {
  //     state.commentsByTodoId.isLoading = true;
  //   },
  //   [__deleteComment.fulfilled]: (state, action) => {
  //     state.commentsByTodoId.isLoading = false;
  //     const target = state.commentsByTodoId.data.findIndex(
  //       (comment) => comment.id === action.payload
  //     );
  //     state.commentsByTodoId.data.splice(target, 1);
  //   },
  //   [__deleteComment.rejected]: (state, action) => {
  //     state.commentsByTodoId.isLoading = false;
  //     state.commentsByTodoId.error = action.payload;
  //   },

  //   // 댓글 수정
  //   [__updateComment.pending]: (state) => {},
  //   [__updateComment.fulfilled]: (state, action) => {
  //     const target = state.commentsByTodoId.data.findIndex(
  //       (comment) => comment.id === action.payload.id
  //     );
  //     state.commentsByTodoId.data.splice(target, 1, action.payload);
  //   },
  //   [__updateComment.rejected]: () => {},
    // 댓글 추가
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






// const comments = createSlice({
//   name: 'comments',
//   initialState: {
//         list: []
//       },
//   reducers: {
//     createComment: (state, action) => {
//           state.list.push(action.payload);
//       },
//       updateComment: (state, action) => {
//         state.list.map(cur => {
//                      if(cur.id === parseInt(action.payload.id)) {                      
//                         cur.isUpdate = !action.payload.isUpdate
//                         cur.content = action.payload.content ;
//                      }
//                      }
//         )}
//       ,
//       deleteComment: (state, action) => {
//      state.list= state.list.filter(cur=>action.payload !== cur.id)
//       },
//       setCommentList: (state, action) => {
//         console.log(action.payload);
//         state.list = action.payload;
//       },
//   }   
// });

// const store = configureStore({reducer: comments.reducer});

// export const{createComment, updateComment, deleteComment, setCommentList} = comments.actions;

// export default store;
