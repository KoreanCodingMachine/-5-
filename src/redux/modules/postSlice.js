import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 데이터 송신
// 액션 크리에이터(비동기 작업을 처리하는)

const URI = {
  BASE: process.env.REACT_APP_BASE_URI,
};

// 게시글 리스트 GET
const getAsyncData = createAsyncThunk('GET_DATA', async () => {
  try {
    // 'http://localhost:5001/post_data'
    const response = await axios.get(URI.BASE);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

const getAsyncDataSlice = createAsyncThunk('GET_DATA_SLICE', async () => {
  try {
    const response = await axios.get(URI.BASE);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

// 게시글 수정 PUT
const putAsyncData = createAsyncThunk(
  'PUT_DATA',
  async ({ id, title, content, writer }) => {
    try {
      const response = await axios.put(`${URI.BASE}/${id}`, {
        id: id,
        title: title,
        content: content,
        writer: writer,
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

// 게시글 삭제 DELETE
const deleteAsyncData = createAsyncThunk('DELETE_DATA', async (id) => {
  try {
    const response = await axios.delete(`${URI.BASE}/${id}`);
    console.log(response);
    return id;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

// 게시글 요청 POST
const postAsyncData = createAsyncThunk(
  'ADD_POST',
  async ({ title, content, writer }) => {
    const response = await axios.post(URI.BASE, {
      title: title,
      content: content,
      writer: writer,
    });
    // 전체 포스트 리스트
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  post: [],
  postSlice: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    // inputData: (state, action) => {
    //   state.post = action.payload;
    // },
    // addData: (state, action) => {
    //   state.post = state.post.push(action.payload);
    // },
    // changeData: (state, action) => {
    //   // map함수를 이용해서 id가 같으면 payload의 데이터로 수정
    //   state.post = state.post.map((item) =>
    //     item.id === action.id ? (item = action.payload) : item
    //   );
    // },
    // deleteData: (state, action) => {
    //   // 액션 페이로드에 아이디 값을 담아서 해당 아이디가 아닌 것들만 필터
    //   state.post = state.post.filter((item) => item.id !== action.payload);
    // },
  },
  extraReducers: (builder) => {
    // pending , fulfilled , rejected일때 실행될 리듀서를 각각 정의해준다.
    builder
      .addCase(getAsyncData.pending, (state) => {
        state.loading = true;
      })
      //조회(READ)
      .addCase(getAsyncData.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getAsyncData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      //수정(PUT)
      .addCase(putAsyncData.pending, (state) => {
        state.loading = true;
      })
      .addCase(putAsyncData.fulfilled, (state, action) => {
        state.post = state.post.map((item) =>
          item.id === action.payload.id
            ? {
                ...state,
                content: action.payload.content,
                title: action.payload.title,
                writer: action.payload.writer,
              }
            : item
        );
      })
      .addCase(putAsyncData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      //업로드 (post)
      .addCase(postAsyncData.pending, (state) => {
        state.loading = true;
        state.error = true;
      })
      .addCase(postAsyncData.fulfilled, (state, action) => {
        state.loading = false;
        // state.post = state.post.push(action.payload);
        state.post = [...state.post, action.payload];
      })
      .addCase(postAsyncData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      //삭제(DELETE)
      .addCase(deleteAsyncData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAsyncData.fulfilled, (state, action) => {
        state.loading = false;
        state.post = state.post.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteAsyncData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getAsyncDataSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAsyncDataSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.post = [...state.post, action.payload];
      });
  },
});

export const { inputData, addData, changeData, deleteData } = postSlice.actions;
export default postSlice.reducer;
export { getAsyncData, deleteAsyncData, postAsyncData, putAsyncData };
