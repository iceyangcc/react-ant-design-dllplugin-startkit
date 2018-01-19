import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Utils from '../../../utils/'
import { Modal } from 'antd'
import './style/index.less'

class PublicHeader extends Component {
  constructor(props) {
    super(props)
    this.shouldBeRender = true
  }

  shouldComponentUpdate() {
    return this.shouldBeRender
  }

  render() {
    return (
      <div className="comp-public-header">
        <div className="container clearfix">
          <a className="logo-link fl" href="/"></a>
          <span className="logo-text fl">React</span>
          <a className="exit-system fr" href="/passport">退出
            
          </a>
        </div>
      </div>
    )
  }
}

export default PublicHeader
