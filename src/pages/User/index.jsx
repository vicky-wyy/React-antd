import React, { Component } from 'react'
import { 
  Card,
  Button,
  Table,
  Drawer,
  message,
} from 'antd'

import getTitle from '../../components/title'
import memoryUtils from '../../utils/memoryUtils'
import { PAGE_SIZE } from '../../utils/constants'
import UserForm from './user-form'
import {
  reqUsers,
  reqRoles,
  reqUpdateUserRole
} from '../../apis'
import '../../assets/styles/user.less'
export default class User extends Component {
  state = {
    users: [],    //所有用户列表
    roles: [],    //所有角色列表
    isShow: false,
    isloading: false
  }
  /* 初始化列表 */
  initColumns = ()=>{
    this.columns = [
      {
        title: '用户名',
        align: 'center',
        dataIndex: 'itcode'
      },
      {
        title: '操作',
        align: 'center',
        render: (user)=>(
          <Button type='link' onClick={() => this.showDetail(user)}>详情</Button>
        )
      }
    ]
  }
  /* 初始化用户角色 */
  initRoleNames = (roles)=>{
    const roleNames = roles.reduce((pre,role)=>{
      pre[role.id] = role.roleName
      return pre
    },{})
    //this指向的是User的实例对象
    this.roleNames = roleNames
  }
  /* 获取用户列表 */
  getUsers = async()=>{
    this.setState({
      isloading: true
    })
    const itcode = memoryUtils.user.itcode
    const result = await reqUsers(itcode)
    const rolesResult = await reqRoles()
    this.initRoleNames(rolesResult)
    this.setState({
      users: result,
      roles: rolesResult,
      isloading: false
    })
  }

  /* 关闭模态框 */
  onCancel = ()=>{
    this.setState({
      isShow: false
    })
  }
  /* 更新用户模态框 */
  showDetail = (user)=>{
    this.user = user
    this.setState({
      isShow: true
    })
  }
  /* 更新用户 */
  updateUser = ()=>{
    this.form.current.validateFields()
      .then(async (values)=>{
        this.setState({
          isShow: false
        })
        const itcode = memoryUtils.user.itcode
        const target_itcode = this.user.itcode
        const roleResult = await reqUpdateUserRole(itcode,target_itcode,this.user.roles[0],'delete')
        const result = await reqUpdateUserRole(itcode,target_itcode,values.roles,'add')
        if(result.status==='success'){
          message.success('用户角色更新成功')
          this.getUsers()
        }else {
          message.error('用户角色更新失败')
        }
      })
  }

  getRowClassName = (record,index)=>{
    let className = index % 2 === 0 ? 'evenRow' : 'oddRow'
    return className
  }

  /* 为第一次render准备数据 */
  UNSAFE_componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getUsers()
  }
  render() {
    const path = this.props.location.pathname
    const title = getTitle(path)
    const { users, roles, isloading, isShow } = this.state
    const user = this.user || {}
    const footer = (
      <span className='footer-button'>
        <Button onClick={this.onCancel}>取消</Button>
        <Button type='primary' onClick={this.updateUser} loading={isloading}>确定</Button>
      </span>
    )
    return (
      <div className='base-style-card'>
        <Card
          title={title}
          bordered={false}
        >
          <Table
            size='middle'
            bordered
            rowKey='itcode'
            loading={isloading}
            columns={this.columns}
            dataSource={users}
            pagination={{
              size:'large',
              defaultPageSize: PAGE_SIZE
            }}
            rowClassName={this.getRowClassName}
          />
          <Drawer
            title='用户详情'
            visible={isShow}
            width={448}
            onClose={this.onCancel}
            closable={false}
            footer={footer}
            destroyOnClose
            className='user-detail-modal'
          >
            <UserForm 
              setForm={form => this.form = form}
              roles={roles}
              user={user}
            />
          </Drawer>
        </Card>
      </div>
    )
  }
}
