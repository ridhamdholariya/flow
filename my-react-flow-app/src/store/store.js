// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from './slices/nodesSlice';
import edgesReducer from './slices/edgesSlice';

const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    edges: edgesReducer,
  },
});

export default store;
