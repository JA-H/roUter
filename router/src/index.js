import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import originReducer from './reducers/originReducer';
import destinationReducer from './reducers/destinationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'


const reducer = combineReducers({
    origin: originReducer,
    destination: destinationReducer
})

const store = createStore(reducer,
  composeWithDevTools())



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// wrapping the app in the Provider makes the redux store accessible to all components
// the store's passed as a prop
// combineReducers - creates a single root reducer out of many 


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
