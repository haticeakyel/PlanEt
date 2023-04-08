import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureStore from './reducers/store';
import RouterPage from './common/RouterPage';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
      <RouterPage/>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
