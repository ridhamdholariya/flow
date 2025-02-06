import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFlowProvider } from 'react-flow-renderer';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';  // Ensure the path to your store is correct
import './styles.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </Provider>
);
