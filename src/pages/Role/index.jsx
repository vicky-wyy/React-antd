import React, { Component } from 'react'
import { 
  Card,
  Table,
  Button,
  Modal,
  message,
  Tooltip
} from 'antd'

import getTitle from '../../components/title'
import formateDate from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { PAGE_SIZE } from '../../utils/constants'
import AddForm from './add-form'
import AuthForm from './auth-form'
import '../../assets/styles/role.less'

import {
  reqRoles,
  reqAddRoles,
  reqUpdateRoles,
  reqDeleteRoles,
  reqUsers
} from '../../apis'

export default class Role extends Component {
  state = {
    roles:[],   //所有角色的列表
    role:{},    //选中的角色
    isShowAdd: false,    //是否显示添加角色Modal
    isShowAuth: false,   //是否显示设置角色权限Modal
    loading: false
  }
  formRef = React.createRef()
  /* 初始化列表 */
  initColumns = ()=>{
    this.columns = [
      {
        title: '角色名称',
        align: 'center',
        dataIndex: 'roleName'
      },
      {
        title: '创建时间',
        align: 'center',
        dataIndex: 'created_ts',
        render: (text,record)=>{
          return (
            <Tooltip placement='top' title={formateDate(record.created_ts)}>
              <div className='role_created_ts'>
                {formateDate(record.created_ts)}
              </div>
            </Tooltip>
          )
        }
      },
      {
        title: '操作',
        align: 'center',
        render: (role) => (
          <span>
            <Button type='link' onClick={()=>this.deleteRole(role)}>删除</Button>
          </span>
        )
      }
    ]
  }

  /* 获取所有角色 */
  getRoles = async ()=>{
    this.setState({
      loading: true
    })
    const result = await reqRoles()
    this.setState({
      roles: result,
      loading: false
    })
  }
  /* 添加角色 */
  addRole = ()=>{
    const itcode = memoryUtils.user.itcode
    this.form.current.validateFields()
      .then(async(values)=>{
        this.setState({
          isShowAdd: false
        })
        const result = await reqAddRoles(itcode,values.name)
        if(result.status==='success'){
          message.success('角色添加成功')
          this.getRoles()
        }else{
          message.error('角色添加失败')
        }
      })
  }
  /* 更新角色 */
  updateRole = async()=>{
    const itcode = memoryUtils.user.itcode
    this.setState({
      isShowAuth: false
    })
    const role = this.state.role
    const menus = this.formRef.current.getMenus()
    role.menus = menus
    const result = await reqUpdateRoles(itcode,role.id,menus)
    if(result.status==='success'){
      message.success('角色权限更新成功')
      this.setState({
        roles:[...this.state.roles]
      })
    }
  }
  /* 删除角色 */
  deleteRole = async (role)=>{
    const itcode = memoryUtils.user.itcode
    // 获取当前所有用户的角色
    const allUser = await reqUsers(itcode)
    console.log(allUser)
    let result = allUser.filter((userObj)=>{
      return userObj.roles[0] === role.id
    })
    if(result.length!==0){
      Modal.warning({
        title: '警告',
        content: '该角色不可删除，有用户设置了该角色',
        okText: '确认'
      })
    }else{
      Modal.confirm({
        title: `确认删除：${role.roleName}吗？`,
        onOk: async () => {
          const result = await reqDeleteRoles(itcode,role.id)
          if(result.status==='success'){
            message.success('角色删除成功')
            this.getRoles()
          }else {
            message.error('角色删除失败')
          }
        },
        okText: '确定',
        cancelText: '取消'
      })
    }
  }
  onRow = (role)=>{
    return {
      onClick: event => {
        this.setState({
          role
        })
      }
    }
  }
  /* 修改table样式 */
  getRowClassName = (record,index)=>{
    let className = index % 2 === 0 ? 'evenRow' : 'oddRow'
    return className
  }
  /* 为第一次render渲染数据 */
  UNSAFE_componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getRoles()
  }
  render() {
    const path = this.props.location.pathname
    const title = getTitle(path)
    const {roles, role, isShowAdd, isShowAuth, loading} = this.state
    const extra = (
      <span className='button-style'>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={!role.id} onClick={() => this.setState({isShowAuth: true})}>设置角色权限</Button>
      </span>
    )
    return (
      <div className='base-style-card'>
        <Card
          title={title}
          extra={extra}
          bordered={false}
        >
          <Table
            size='middle'
            bordered
            rowKey='id'
            dataSource={roles}
            columns={this.columns}
            loading={loading}
            pagination={{
              size:'large',
              defaultPageSize: PAGE_SIZE
            }}
            rowSelection={{
              type: 'radio',
              selectedRowKeys: [role.id],
              onSelect: (role)=>{
                this.setState({
                  role
                })
              }
            }}
            onRow={this.onRow}
            rowClassName={this.getRowClassName}
          />
          <Modal
            title='创建角色'
            destroyOnClose
            visible={isShowAdd}
            onOk={this.addRole}
            onCancel={()=>{
              this.setState({
                isShowAdd: false
              })
            }}
            okText='确认'
            cancelText='取消'
          >
            <AddForm
              setForm = {form => this.form = form}
            />
          </Modal>
          <Modal
            title='设置角色权限'
            visible={isShowAuth}
            onOk={this.updateRole}
            onCancel={()=>{
              this.setState({
                isShowAuth: false
              })
            }}
            okText='确定'
            cancelText='取消'
          >
            <AuthForm
              ref={this.formRef}
              role={role}
            />
          </Modal>
        </Card>
      </div>
    )
  }
}
