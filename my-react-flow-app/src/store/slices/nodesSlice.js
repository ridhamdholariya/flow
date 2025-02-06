import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
};

export const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action) => {
      const index = state.nodes.findIndex((node) => node.id === action.payload.id);
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
  },
});

export const { addNode, updateNode, setNodes } = nodesSlice.actions;
export default nodesSlice.reducer;
