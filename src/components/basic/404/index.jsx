import React from 'react'
import './style/index.less'

const NotFound = () => (
  <div className="comp-404 bg-fff">
    <div className="content-wrap">
      <div className="bg-line">
        <h2 className="text-404">抱歉！您访问的页面不存在......</h2>
        <div className="bg-404"></div>
      </div>
      <h6>你还可以进行如下操作：</h6>
      <div className="text-center">
        <div className="btns-wrap clearfix">
          <a className="fl back-link" href="/">返回首页</a>
          <a className="fr back-link" href="javascript:history.go(-1)">返回上一级</a>
        </div>
      </div>
    </div>
  </div>
)

export default NotFound
