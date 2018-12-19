import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import TSChart from './TSChart';
import HistogramChart from './HistogramChart';
import News from './News';
import Stats from './Stats';

import stockApp from './reducers'
import App from './App'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
//import api from './middleware/api'
// start development server:
// > npm start

// execute tests:
// > npm test

// create production build:
// > npm run build

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

let store = createStoreWithMiddleware(stockApp)

ReactDOM.render(<TSChart />, document.getElementById('root'));
ReactDOM.render(<HistogramChart />, document.getElementById('hist'));
ReactDOM.render(<Stats />, document.getElementById('stats'));
ReactDOM.render(<News />, document.getElementById('news'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('login')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
