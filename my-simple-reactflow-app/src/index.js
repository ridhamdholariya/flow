// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFlowProvider } from 'react-flow-renderer';
import App from './App';
import './styles.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
