import React, { Component } from 'react';
import { List, Comment, Button,Form,Space,Input,} from 'antd'
import moment from 'moment'
class CommentForm extends Component {
  replyComment = (item)=>{
    console.log(item)
  }
  render() {
    const { project } = this.props
    return (
      <List 
        className="comment-list"
        itemLayout="horizontal"
        dataSource={project.comments}
        renderItem={item => (
            <List.Item>
              <Comment 
                author={item.author}
                avatar={`https://api.multiavatar.com/www.${item.author}.com.svg`}
                content={item.content}
                datetime={moment().fromNow()}
              >
                <Form>
                  <Form.List name='comments'>
                    {(fields, { add }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Form.Item
                            key={key}
                            {...restField}
                            rules={[{ required: true, message: '必须输入回复评论内容' }]}
                          >
                            <Input placeholder="请输入回复评论" />
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button type="link" onClick={() => add()}>
                            回复
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </Comment>
            </List.Item>
          )
        }
      />
    );
  }
}

export default CommentForm;