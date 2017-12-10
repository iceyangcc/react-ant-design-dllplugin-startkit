import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
ReactDOM.render(
  <App />, document.getElementById('root'));
registerServiceWorker();
