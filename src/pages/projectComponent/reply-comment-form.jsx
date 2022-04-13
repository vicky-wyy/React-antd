import React, { Component } from 'react'
import { 
  Form,
  Input
} from 'antd'

const { TextArea } = Input
export default class ReplyCommentForm extends Component {
  formRef = React.createRef()
  UNSAFE_componentWillMount(){
    this.props.setForm(this.formRef)
  }
  render() {
    return (
      <Form ref={this.formRef}>
        <Form.Item
          name='content'
          rules={[
            {
              required: true,
              message: '请输入回复评论'
            }
          ]}
        >
          <Input 
            placeholder='请输入回复评论' 
            autoComplete='off' 
            allowClear
          />
        </Form.Item>
      </Form>
    )
  }
}
