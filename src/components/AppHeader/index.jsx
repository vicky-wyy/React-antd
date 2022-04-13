import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom'
import { 
  Button, 
  Layout,
  Modal,
  Breadcrumb,
  Affix
} from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
} from '@ant-design/icons'
import fullToggle from '../../utils/screenfull'
import DynamicAntdTheme from 'dynamic-antd-theme';
import { reqUsersInfo } from '../../apis'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import getTitle from '../title'
const { Header } = Layout
class AppHeader extends Component {
  state = {
    user: {}
  }
  getUserInfo = async()=>{
    const result = await reqUsersInfo(memoryUtils.user.itcode)
    this.setState({
      user: result
    })
    console.log(result)
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
    let { menuClick, menuToggle } = this.props
    const { user } = this.state
    const path = this.props.location.pathname
    const title = getTitle(path)
    return (
      <Affix>
        <Header className='header'>
          <div className='header-left'>
            <div className='mr15'>
              <Button
                type='primary'
                className='header-left-button'
                onClick={menuClick}
                icon={menuToggle ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
              >
              </Button>
            </div>
            <div className='mr15 header-title'>
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <Link to='/project'>DML</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
              </Breadcrumb> 
            </div>
            
          </div>
          <div className='header-right'>
            <Button type='link'>
              <DynamicAntdTheme primaryColor='#1678ff'></DynamicAntdTheme>
            </Button>
            <FullscreenOutlined onClick={fullToggle} className='fullscreen'/>
            <span>{user.cn}&nbsp;&nbsp;&nbsp;|</span>
            <Button type='link' onClick={this.logout} className="header-button">退出</Button>
            {/* <Dropdown overlay={this.menu} overlayStyle={{ width: '20rem' }}>
              <div className='ant-dropdown-link'>
                <Avatar src={user} alt='avatar' style={{ cursor: 'pointer' }} />
              </div>
            </Dropdown> */}
          </div>
        </Header>
      </Affix>
        
    )
  }
}
export default withRouter(AppHeader)