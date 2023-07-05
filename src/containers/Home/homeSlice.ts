import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export interface initialStateType {
  privateKey: number;
  publicKey: {
    p: number;
    alpha: number;
    beta: number;
  };
  cipherArr: {
    y1: number;
    y2: number;
  }[];
  cipherText: string;
}

const initialState: initialStateType = {
  publicKey: {
    p: 0,
    alpha: 0,
    beta: 0,
  },
  privateKey: 0,
  cipherArr: [],
  cipherText: '',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    resetRedux: (state) => {
      state.publicKey = {
        p: 0,
        alpha: 0,
        beta: 0,
      };
      state.privateKey = 0;
      state.cipherArr = [];
      state.cipherText = '';
    },
    getPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },
    getPrivateKey: (state, action) => {
      state.privateKey = action.payload;
    },
    getCipherArr: (state, action) => {
      state.cipherArr = action.payload;
    },
    getCipherText: (state, action) => {
      state.cipherText = action.payload;
    },
  },
});

export const selectPublicKey = (state: RootState) =>
  state.homeReducer.publicKey;
export const selectPrivateKey = (state: RootState) =>
  state.homeReducer.privateKey;
export const selectCipherArr = (state: RootState) =>
  state.homeReducer.cipherArr;
export const selectCipherText = (state: RootState) =>
  state.homeReducer.cipherText;
export default homeSlice.reducer;
