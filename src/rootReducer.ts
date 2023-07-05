import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '@/containers/App/appSlice';
import homeReducer from '@/containers/Home/homeSlice';

export const rootReducer = combineReducers({
  appReducer,
  homeReducer,
});
