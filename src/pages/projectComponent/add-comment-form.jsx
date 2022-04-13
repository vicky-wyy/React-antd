import React, { Component } from 'react'
import { 
  Form,
  Input,
  Button,
  message
} from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import {
  reqAddComment
} from '../../apis'

const { TextArea } = Input
export default class AddCommentForm extends Component {
  formRef = React.createRef()
  addComment = (project)=>{
    this.formRef.current.validateFields()
      .then(async(values)=>{
        this.setState({
          showStatus: 0
        })
        const author = memoryUtils.user.itcode
        const result = await reqAddComment(author,project.id,values.comments)
        if(result.status==='success'){
          message.success('成功添加评论')
          this.getProjects()
        }
      }).catch(errorInfo => {
        message.error(errorInfo)
      })
  }
  render() {
    const { project } = this.props
    return (
      <Form ref={this.formRef}>
        <Form.Item
          lable=''
          name='comments'
          rules={[
            {
              required: true,
              message: '请输入项目评论'
            }
          ]}
        >
          <TextArea
            rows={4}
            placeholder='请输入您的评论'
            showCount
            maxLength={400}
            autoComplete='off'
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={()=>this.addComment(project)} className='comment-button'>添加评论</Button>
        </Form.Item>
      </Form>
    )
  }
}
