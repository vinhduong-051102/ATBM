import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';

export const getPrivateKey = createAction<number>(constants.GET_PRIVATE_KEY);

export const getPublicKey = createAction<{
  p: number;
  alpha: number;
  beta: number;
}>(constants.GET_PUBLIC_KEY);

export const getCipherArr = createAction<
  {
    y1: number;
    y2: number;
  }[]
>(constants.GET_CIPHER_ARRAY);

export const getCipherText = createAction<string>(constants.GET_CIPHER_TEXT);

export const resetRedux = createAction(constants.RESET_REDUX_ACTION);
