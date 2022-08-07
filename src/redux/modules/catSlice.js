import { createSlice } from '@reduxjs/toolkit';

const catSlice = createSlice({
  name: 'cat',
  initialState: {
    name: '펄이 고양이',
    age: 5,
  },
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// 액션 생섬함수 , 리듀서를 export

export const { changeName } = catSlice.actions;
export default catSlice.reducer;
