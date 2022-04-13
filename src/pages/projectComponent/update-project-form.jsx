import React, { Component } from 'react'
import { 
  Form,
  Input,
  Select 
} from 'antd'
import PropTypes from 'prop-types'
import memoryUtils from '../../utils/memoryUtils'

const {Option} = Select
export default class UpdateProjectForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    project: PropTypes.object
  }
  formRef = React.createRef()
  UNSAFE_componentWillMount() {
    this.props.setForm(this.formRef)
  }
  render() {
    const { project } = this.props
    return (
      <Form ref={this.formRef}>
        <Form.Item
          name='name'
          label='项目名称'
          initialValue={project.name}
          rules={[
            {
              required: true,
              message: '请输入项目名称'
            }
          ]}
          hasFeedback
        >
          <Input placeholder='请输入项目名称' autoComplete='off' allowClear/>
        </Form.Item>
        <Form.Item
          name='desc'
          label='项目描述'
          initialValue={project.desc}
          rules={[
            {
              required: true,
              message: '请输入项目描述'
            }
          ]}
          hasFeedback
        >
          <Input.TextArea 
            placeholder='请输入项目描述' 
            autoComplete='off' 
            allowClear 
            showCount 
            rows={4} 
            maxLength={400}
          />
        </Form.Item>
        <Form.Item
          name='status'
          label='项目状态'
          initialValue={project.status}
          rules={[
            {
              required: true
            }
          ]}
        >
          {
            memoryUtils.user.role_id==='622324981b11626b97778b6c'
              ? <Select>
                  <Option value="等待审核中">等待审核中</Option>
                  <Option value="项目开发中">项目开发中</Option>
                  <Option value="项目已完成">项目已完成</Option>
                  <Option value="项目已拒绝">项目已拒绝</Option>
                </Select>
              : <Select disabled></Select>
          }
        </Form.Item>
      </Form>
    )
  }
}
