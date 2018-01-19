import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router} from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import _ from 'lodash'
import __$ from 'jquery'
import __layer from './components/basic/layer/layer'
import axios from 'axios'
import __commonRequestHeaders from './services/common-request-headers'
import App from './components/containers/app'
import reducer from './redux/reducers'
import moment from 'moment'
import 'moment/locale/zh-cn'


const store = createStore(reducer)
moment.locale('zh-cn')

window.__layer = window.LayerUI = __layer
window.__$ = window.jQuery = window.$ = __$
window.Axios = axios
window.__commonRequestHeaders = __commonRequestHeaders

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)

