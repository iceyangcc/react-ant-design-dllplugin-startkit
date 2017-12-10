import React, { Component } from 'react';
import './App.css';
import './app.scss'
import './app.less'
import './app.styl'
// import Button from 'antd/lib/button/';
import 'antd/lib/button/style/css'
// import DatePicker from 'antd/lib/date-picker/';
import 'antd/lib/date-picker/style/css'
// import Pagination from 'antd/lib/pagination/';
import 'antd/lib/pagination/style/css'
// import 'antd/dist/antd.css';
import { Button, DatePicker, Pagination } from 'antd'
import { Object } from 'core-js/library/web/timers';
// import moment from 'moment';
const { MonthPicker } = DatePicker;




class App extends Component {

  constructor() {
    super()
    this.pageChange = this.pageChange.bind(this)
  }
  state = {
    text: '',
    currentPage: 3,
    total: 122
  }
  onChange = (date, dateString) => {
    this.setState({
      text: dateString
    })
  }
  pageChange(page, pageSize) {
    console.log(page)
    this.setState({
      currentPage: page
    })
  }

  render() {
    return (
      <div className="App" style={{marginTop: 100}}>
        <span>哈哈哈</span>
        <Pagination  
          defaultCurrent={1}
          total={this.state.total}
          size="small"
          onChange={this.pageChange}
          current={this.state.currentPage}
        />
        <MonthPicker 
          onChange={this.onChange} 
          placeholder="选择月份" 
          disabledDate={(currentMoment) => {
            const currentDate = currentMoment.toDate()
            const nowDate = new Date()
            return currentDate.getFullYear() > nowDate.getFullYear() || (
                    currentDate.getFullYear() === nowDate.getFullYear() && 
                      currentDate.getMonth() > nowDate.getMonth()
            )
          }}  
        />
        <Button type="primary">Button</Button>
        <p>你选择的日期是: </p>
        <h1>{this.state.text}</h1>
        <Button 
          onClick={() => {
            this.setState({
              total: 33,
              currentPage: 1
            })
          }}

        >33条数据</Button>
        <Button
          onClick={() => {
            this.setState({
              total: 333,
              currentPage: 2
            })
          }}
        >333条数据</Button>
        <Button
          onClick={() => {
            this.setState({
              currentPage: 3
            })
          }}
        >切换到第3页</Button>
      </div>
    );
  }
}

export default App;
