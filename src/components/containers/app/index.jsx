import React, { Component } from 'react'

import 'antd/lib/button/style/css'
import 'antd/lib/date-picker/style/css'
import 'antd/lib/pagination/style/css'
import '../../../assets/styles/less/index.less'
import './style/app.less'
import '../../basic/layer/skin/layer.css'

import { Button, DatePicker, Pagination } from 'antd'
import { Switch, Route, BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import PublicHeader from '../../basic/public-header'
import SideNav from '../../basic/side-nav/'
import Routes from '../../../router/'

const RightContent = ({ actions }) => {
  return (
    <div className="content" actions={actions}>
      <div className="right-content">
        <div className="inner-content">
          <Routes />
        </div>
      </div>
    </div>
  )
}

class App extends Component {
  render() {
    const { menuIndex, actions, history, location } = this.props
    return (
      <Router>
        <div className="ums-comp-app" style={{ marginTop: 0 }}>
          <PublicHeader />
          <SideNav actions={actions} menuIndex={menuIndex} history={history} location={location} />
          <RightContent actions={actions} />
        </div>
      </Router>
    )
  }
}

export default App


