import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'
import formateDate from '../../utils/dateUtils'
const { Option } = Select
export default class UserForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  formRef = React.createRef()

  UNSAFE_componentWillMount(){
    this.props.setForm(this.formRef)
  }
  render() {
    const { roles, user} = this.props
    const formItemLayout = {
      labelCol: { span:5 },
      wrapperCol: { span:18 }
    }
    return (
      <div className='user-form'>
        <Form {...formItemLayout} ref={this.formRef}>
          <Form.Item
            name='itcode'
            label='姓名'
            initialValue={user.itcode}
            validateStatus='success'
            hasFeedback
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input disabled className='user-form-input'/>
          </Form.Item>
          <Form.Item
            name='email'
            label='邮箱'
            initialValue={user.email}
            validateStatus='success'
            hasFeedback
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input disabled className='user-form-input'/>
          </Form.Item>
          <Form.Item
            name='created_ts'
            label='注册时间'
            initialValue={formateDate(user.created_ts)}
            validateStatus='success'
            hasFeedback
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input disabled className='user-form-input'/>
          </Form.Item>
          <Form.Item
            name='roles'
            label='角色'
            initialValue={user.roles}
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select className='role-selected'>
              {
                roles.map(role=>
                  <Option key={role.id} value={role.id}>{role.roleName}</Option>  
                )
              }
            </Select>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
