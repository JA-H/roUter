import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import originReducer from './reducers/originReducer';
import destinationReducer from './reducers/destinationReducer'
import loginReducer from './reducers/loginReducer'
import journeyReducer from './reducers/journeyReducer'
import { composeWithDevTools } from 'redux-devtools-extension'


const reducer = combineReducers({
    origin: originReducer,
    destination: destinationReducer,
    user: loginReducer,
    journey: journeyReducer
})

const store = createStore(reducer,
  composeWithDevTools())



ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
    <App />
    </Provider>
    </Router>
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
