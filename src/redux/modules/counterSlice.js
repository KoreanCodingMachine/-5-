import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 액션 생성함수
// 컴포넌트에서 dispatch(asyncUpFetch)
const asyncUpFetch = createAsyncThunk('counterSlice/asyncUpFetch', async () => {
  const response = await axios.get('~');
  console.log(response);
  const data = response.data;
  console.log(data);
  return data;
});

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: {
    value: 0,
    status: 'welcome',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state, action) => {
      state.status = 'LOADING';
    });
    builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = 'SUCCESS';
    });
    builder.addCase(asyncUpFetch.rejected, (state, action) => {
      state.status = 'fail';
    });
  },
});
