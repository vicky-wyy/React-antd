import React, { Component } from 'react'
import { 
  Form,
  Input 
} from 'antd'

const { TextArea } = Input
export default class UpdateCommentForm extends Component {

  formRef = React.createRef()
  UNSAFE_componentWillMount(){
    this.props.setForm(this.formRef)
  }
  render() {
    const { updateComment } = this.props
    return (
      <Form ref={this.formRef}>
        <Form.Item
          name='content'
          label='更新评论'
          initialValue={updateComment.content}
          rules={[
            {
              required: true,
              message: '请输入评论'
            }
          ]}
        >
          <TextArea placeholder='请输入更新评论' autoComplete='off' allowClear/>
        </Form.Item>
      </Form>
    )
  }
}
