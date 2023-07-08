import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import Cartslice from './Redux/Cartslice';
import Userauthslice from './Redux/Userauthslice';

let rootReducer = combineReducers({
  Cartslice,Userauthslice
})

let cartstore = configureStore({
    reducer : rootReducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={cartstore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


