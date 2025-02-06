import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const edgesSlice = createSlice({
  name: 'edges',
  initialState,
  reducers: {
    addEdge: (state, action) => {
      state.push(action.payload);
    },
    setEdges: (state, action) => {
      return action.payload;
    },
    updateEdge: (state, action) => {
      const index = state.findIndex((edge) => edge.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeEdge: (state, action) => {
      return state.filter((edge) => edge.id !== action.payload);
    },
  },
});

export const { addEdge, setEdges, updateEdge, removeEdge } = edgesSlice.actions;
export default edgesSlice.reducer;
