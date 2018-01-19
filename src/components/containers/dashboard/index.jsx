import React, { Component } from 'react'
import './style/index.less'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import CourseItem from './sub/course-item'

export default class Product extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    'name': 'blog.nodejs.tech', 
    'courseList': [
      {
        src: 'https://raw.githubusercontent.com/iceyangcc/cdn/master/static/images/product-1.jpg',
        tags: ['Python'],
        title: '高效的Python3',
        id: 110
      },
      {
        src: 'https://raw.githubusercontent.com/iceyangcc/cdn/master/static/images/product-2.jpg',
        tags: ['PHP'],
        title: 'PHP从小白到大叔儿',
        id: 111
      },
      {
        src: 'https://raw.githubusercontent.com/iceyangcc/cdn/master/static/images/product-3.jpg',
        tags: ['Java'],
        title: 'Java老大哥你服不服',
        id: 112
      },
      {
        src: 'https://raw.githubusercontent.com/iceyangcc/cdn/master/static/images/product-4.jpg',
        tags: ['Android'],
        title: '百花争艳小安卓儿',
        id: 113
      }
    ]
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="comp-product text-left box-shadow-container">
        <div className="product-header container-fff color-blue mb-10">
          <ul className="max-width-960 clearfix" style={{ marginBottom: 0 }}>
            <li className="item-info fl mr-70">
              <i className="icon-info"></i>
              <span className="company-name-label">登录账号：</span>
              <span className="company-name" style={{ minWidth: 160 }}>{this.state.name}</span>
            </li>
          </ul>
        </div>
        <div className="product-preview container-fff pb-80">
          <p className="border-left-label">我收藏的</p>
          <div className="courses-wrap clearfix">
            {this.state.courseList.map((item) => <CourseItem {...item} key={item.id}/>)}
          </div>
        </div>
      </div>
    )
  }
}
