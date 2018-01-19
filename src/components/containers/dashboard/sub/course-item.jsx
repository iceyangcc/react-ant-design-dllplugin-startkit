import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style/index.less'

export default function CourseItem({ src, tags, title, id }) {
  return (
    <Link to={`/product-detail/${id}`} className="comp-course-item">
      <div className="img-wrap">
        <img className="course-img" src={src} alt=""/>
        <div className="course-tag-wrap">
          {!Array.isArray(tags) ? null: (
              tags.map((tagName) => <span className="course-tag" key={tagName}>{tagName}</span>)
            )}
        </div>
        <h3 className="course-title">{title}</h3>
      </div>
    </Link>
  )
}

