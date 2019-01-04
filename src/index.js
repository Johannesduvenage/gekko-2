import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


import stockApp from './reducers/reducers'
import App from './App'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import api from './middleware/profilesApi'
//import api from './middleware/api'
// start development server:
// > npm start

// execute tests:
// > npm test

// create production build:
// > npm run build

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(stockApp)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('portfolio')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
