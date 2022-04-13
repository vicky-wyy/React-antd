import React, { Component } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout
export default class AppFooter extends Component {
  render() {
    return (
      <Footer className='footer'>
        <p>© 2019 - 2022 宁畅信息产业（北京）有限公司  保留所有权利</p>
        <p>Powered by 测试开发组</p>
      </Footer>
    )
  }
}
