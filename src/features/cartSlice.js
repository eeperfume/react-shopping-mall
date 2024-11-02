import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
    addItem: (state, action) => {
      // 아이템이 이미 존재하는지 확인
      const existingItem = state.item.find(
        (item) => item.id == action.payload.id
      );
      if (existingItem) {
        // 존재하는 경우 수량 증가
        existingItem.count += 1;
      } else {
        // 존재하지 않는 경우 새 아이템 추가
        state.item.push({
          id: action.payload.id,
          name: action.payload.name,
          count: 1,
        });
      }
    },
    removeItem: (state, action) => {
      state.item = state.item.filter((item) => item.id !== action.payload);
    },
    incrementCount: (state, action) => {
      const existingItem = state.item.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.count += 1;
      }
    },
  },
});

export const { setItem, addItem, removeItem, incrementCount } =
  cartSlice.actions;

export default cartSlice.reducer;
