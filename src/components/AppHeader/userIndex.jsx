import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { 
  Button, 
  Layout,
  Modal,
  Breadcrumb,
  Affix
} from 'antd'
import {
  FullscreenOutlined,
} from '@ant-design/icons'
import fullToggle from '../../utils/screenfull'
import { reqUsersInfo } from '../../apis'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
const { Header } = Layout
class UserAppHeader extends Component {
  state = {
    user: {}
  }
  getUserInfo = async()=>{
    const result = await reqUsersInfo(memoryUtils.user.itcode)
    this.setState({
      user: result
    })
  }
  /*
  退出登陆
   */
  logout = () => {
    // 显示确认框
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        // 删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        // 跳转到login
        this.props.history.replace('/login')
      },
      okText: '确定',
      cancelText: '取消'
    })
  }

  UNSAFE_componentWillMount(){
    this.getUserInfo()
  }
  render() {
    const { user } = this.state
    return (
      <Affix>
        <Header className='user-header'>
          <div className='header-left'>
            <div className='mr15'>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to='/project'>所有项目</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to='/donePro'>已完成项目</Link>
                </Breadcrumb.Item>
              </Breadcrumb> 
            </div>
            
          </div>
          <div className='header-right'>
            <FullscreenOutlined onClick={fullToggle} className='fullscreen'/>
            <span>{user.cn}&nbsp;&nbsp;&nbsp;|</span>
            <Button type='link' onClick={this.logout} className="header-button">退出</Button>
          </div>
        </Header>
      </Affix>
        
    )
  }
}
export default withRouter(UserAppHeader)