import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "kim",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      /**
       * action 구조
       * {
       *   type: 'ACTION_TYPE',  // 액션의 타입 (리듀서가 어떤 상태 변화를 처리할지를 결정)
       *   payload: 'some data'  // 추가 데이터 (필요한 경우)
       * }
       */
      state.name = action.payload; // action.payload에서 이름을 가져와 상태 업데이트
    },
  },
});

// 액션 생성자 내보내기
export const { setName } = userSlice.actions;

// 리듀서 내보내기
export default userSlice.reducer;
