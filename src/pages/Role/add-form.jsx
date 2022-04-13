import React, { Component } from 'react'
import { 
  Form,
  Input
} from 'antd'
import PropTypes from 'prop-types'
export default class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired
  }
  formRef = React.createRef()
  UNSAFE_componentWillMount(){
    this.props.setForm(this.formRef)
  }
  render() {
    return (
      <Form ref={this.formRef}>
        <Form.Item
          name='name'
          label='角色名称'
          rules={[
            {
              required: true,
              message: '请输入用户角色'
            }
          ]}
        >
          <Input placeholder='请输入角色名称' autoComplete='off'/>
        </Form.Item>
      </Form>
    )
  }
}
