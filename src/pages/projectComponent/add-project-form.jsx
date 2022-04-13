import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const { TextArea } = Input
export default class AddProjectForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired
  }
  formRef = React.createRef()
  
  UNSAFE_componentWillMount(){
    this.props.setForm(this.formRef)
  }
  render() {
    return (
      <div className='add-form'>
        <Form ref={this.formRef}>
          <Form.Item
            name='name'
            label='项目名称'
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入项目名称'
              }
            ]}
          >
            <TextArea placeholder='请输入项目名称' autoComplete='off' className='add-input'/>
          </Form.Item>
          <Form.Item
            name='desc'
            label='项目描述'
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入项目描述'
              }
            ]}
          >
            <TextArea placeholder='请输入项目描述' autoComplete='off' className='add-input'/>
          </Form.Item>
        </Form>
      </div>
      
    )
  }
}
