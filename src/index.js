import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils'
import App from './App';

const user = storageUtils.getUser()
if(user && user.itcode){
  memoryUtils.user = user
}
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
