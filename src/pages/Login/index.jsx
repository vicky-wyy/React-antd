import React, { Component,Fragment } from 'react'
import {
  Form,
  Input,
  Button,
  message
} from 'antd'
import { UserOutlined } from '@ant-design/icons'

import {
  reqLogin,
  reqUsersInfo,
  reqAddUsers,
  reqGetUserRole,
  reqRoles
} from '../../apis'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import background from '../../assets/images/background.jpg'
import logo from '../../assets/images/login-left.png'
import '../../assets/styles/login.less'
export default class Login extends Component {
  getUserInfo = async(itcode)=>{
    const userInfo = await reqUsersInfo(itcode)
    // 添加用户
    const result = await reqAddUsers(itcode,userInfo.mail.toLowerCase())
    if(result.status==='success'){
      message.success('用户添加成功')
    }else{
      message.error('用户添加失败')
    }
  }
  render() {
    const onFinish = async (values)=>{
      const {itcode} = values
      const result = await reqLogin(itcode)
      if(result==='yes'){
        message.success('登录成功')
        const loginUserRole = await reqGetUserRole(itcode)
        const allRoles = await reqRoles()
        for(let i=0;i<allRoles.length;i++){
          if(loginUserRole[0]===allRoles[i].id){
            const role = allRoles[i].menus
            const user = {itcode:itcode,role:role,role_id:loginUserRole[0]}
            // 保存用户的登录信息
            memoryUtils.user = user
            if(!storageUtils.getUser()){
              this.getUserInfo(itcode)
            }
            storageUtils.saveUser(user)
          }
        }
        this.props.history.replace('/')
      }else{
        message.error('您没有权限登录该系统')
      }
    }
    return (
      <Fragment>
        <img className='background' src={background} alt='background' />
        <img className='bgone' src={logo} alt='logo'/>
        <div className='login'>
          <div className='title'>React后台管理系统</div>
          <div className='title1'>REACT HOU TAI GUAN LI XI TONG</div>
          <div className='login-content'>
            <h2>用户登录</h2>
            <Form
              name='normal_login'
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="itcode"
                rules={
                  // 声明式验证
                  [
                    { required: true,whitespace: true, message: '请输入您的itcode!' }
                  ]
                }
              >
                <Input 
                  className='login-input'
                  prefix={<UserOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.25'}}/>} 
                  placeholder="请输入您的itcode" 
                  autoComplete='off'
                />
              </Form.Item>
              <br/>
              <Form.Item>
                <Button type="primary" htmlType="submit" className='login-form-button'>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>  
        </div>
      </Fragment>
    )
  }
}
