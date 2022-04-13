/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { 
  Card,
  Input,
  Button,
  Table,
  Modal,
  message,
  Drawer,
  List,
  Comment,
  Popconfirm,
  Tooltip,
  Space,
  Badge,
  Form
} from 'antd'
import {
  PlusOutlined,
  SearchOutlined,
  LikeTwoTone,
  DislikeTwoTone,
} from '@ant-design/icons'
import moment from 'moment'
import Highlighter from 'react-highlight-words'
import getTitle from '../../components/title'
import memoryUtils from '../../utils/memoryUtils'
import { PAGE_SIZE } from '../../utils/constants'
import AddProjectForm from '../projectComponent/add-project-form'
import AddCommentForm from '../projectComponent/add-comment-form'
import ReplyCommentForm from '../projectComponent/reply-comment-form'
import UpdateCommentForm from '../projectComponent/update-comment-form'
import ProjectForm from '../projectComponent/project-form'
import {
  reqProjects,
  reqAddProject,
  reqUpdateProject,
  reqDeleteProject,
  reqDeleteComment,
  reqUpdateComment,
  reqAddComment,
  reqLikedProject
} from '../../apis'
import '../../assets/styles/project.less'

const {TextArea} = Input
export default class Project extends Component {
  state = {
    projects: [],
    isloading: false,
    searchText: '',
    searchColumn: '',
    showStatus: 0,   //添加项目：1，项目详情：2
    rowActiveIndex: null,
    replyComment: 'none',
    updateComment: false
  }
  renderColumns(){
    const {rowActiveIndex} = this.state
    return [
      {
        title: '项目名称',
        align: 'center',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        render:(text,record,index)=>{
          return (
            <div className='project-name'>
              <div className='project-name-left'>
                <Tooltip placement='top' title={record.name}>
                  <div className='project-name-left-title'>
                    {record.name}
                  </div>
                </Tooltip>
              </div>
              <div className='project-name-right'>
                <div style={{display:index!==rowActiveIndex?'none':'inline'}}>
                  <Badge 
                    size="small" 
                    count={record.likedCount} 
                    color="#f5222d" 
                    offset={[-10, 3]} 
                  >
                    <Button 
                      type='link'
                      icon={<LikeTwoTone twoToneColor='#f5222d'/>}
                      onClick={()=>this.likeOrDislikeProject(record.id,'up')}
                    />
                  </Badge>
                  <Badge 
                    size="small" 
                    count={record.dislikedCount} 
                    color="#2db7f5" 
                    offset={[-10, 3]} 
                  >
                    <Button 
                      type='link'
                      icon={<DislikeTwoTone twoToneColor='#13ADE2'/>}
                      onClick={()=>this.likeOrDislikeProject(record.id,'down')}
                    />
                  </Badge>
                </div>
              </div>
            </div>
          ) 
        },
      },
      {
        title: '详情',
        align: 'center',
        render: (text,record)=>(
          <div>
            <Button type='link' onClick={()=>this.projectDetails(record)}>详情</Button>
          </div>
        )
      }
    ]
  }
  /* 添加项目的Modal */
  showAdd = ()=>{
    this.setState({
      showStatus: 1
    })
  }
  /* 项目详情的Modal */
  projectDetails = (record)=>{
    this.project = record
    this.setState({
      showStatus: 2
    })
    this.CommentList = this.getCommentList(record.comments)
  }
  /* 关闭模态框 */
  handleCancel = ()=>{
    this.setState({
      showStatus: 0
    })
  }
  /* 获取项目 */
  getProjects = async ()=>{
    this.setState({
      isloading: true
    })
    const itcode = memoryUtils.user.itcode
    const result = await reqProjects(itcode)
    this.setState({
      projects: result,
      isloading: false
    })
  }
  /* 添加项目 */
  addProject = ()=>{
    this.form.current.validateFields()
      .then(async(values)=>{
        this.setState({
          showStatus: 0
        })
        const itcode = memoryUtils.user.itcode
        const result = await reqAddProject(itcode,values.name,values.desc)
        if(result.status==='success'){
          message.success('项目添加成功')
          this.getProjects()
        }
      }).catch(errorInfo => {
        console.log(errorInfo)
      })
  }
  /* 修改项目 */
  updateProject = (project)=>{
    this.form.current.validateFields()
      .then(async(values)=>{
        this.setState({
          showStatus: 0
        })
        const result = await reqUpdateProject(project.author,project.id,values.project_name,values.desc,values.status)
        if(result.status==='success'){
          message.success('项目更新成功')
          this.getProjects()
        }else{
          message.error('项目更新失败')
        }
      }).catch(errorInfo=>{
        console.log(errorInfo)
      })
  }
  /* 删除项目 */
  deleteProject =async (project)=>{
    const result = await reqDeleteProject(project.author,project.id)
    if(result.status==='success'){
      message.success('项目删除成功')
      this.setState({
        showStatus: 0
      })
      this.getProjects()
    }else{
      message.error('您无权删除该项目，或者该项目不存在')
    }
  }
  /* 项目点赞 */
  likeOrDislikeProject = async(projectId,direction)=>{
    const author = memoryUtils.user.itcode
    const result = await reqLikedProject(author,projectId,direction)
    if(result.status==='success'){
      this.setState({
        showStatus: 0
      })
      message.success('点赞成功')
      this.getProjects()
    }else {
      message.error('点赞失败')
    }
  }
  /* 添加评论 */
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
  /* 删除评论 */
  deleteComment = async(item)=>{
    if(item.content==='该评论已被删除'){
      message.info('您已经删除该条评论，无需重复删除')
    }else {
      if(memoryUtils.user.itcode===item.author){
        const author = memoryUtils.user.itcode
        const result = await reqDeleteComment(author,item.id)
        if(result.status==='success'){
          message.success('删除评论成功')
          this.setState({
            showStatus: 0
          })
          this.getProjects()
        }
      }else {
        message.error('您无权删除他人的评论，或者该评论不存在')
      }
    }
    
  }
  /* 修改评论 */
  updateComment = ()=>{
    this.form.current.validateFields()
      .then(async(values)=>{
        this.setState({
          showStatus: 0
        })
        const author = memoryUtils.user.itcode
        const updateComment = this.item
        const result = await reqUpdateComment(author,updateComment.id,values.content)
        if(result.status==='success'){
          message.success('更新评论成功')
          this.getProjects()
        }else{
          message.error('更新评论失败')
        }
      }).catch(errorInfo => {
        console.log(errorInfo)
      })
  }
  /* 回复评论 */
  showReplyComment = ()=>{
    
  }
  /* 遍历Comments */
  getCommentList = (comments)=>{
    return (
      <List 
        className="comment-list"
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
            <List.Item>
              <Comment 
                author={item.author}
                avatar={`https://api.multiavatar.com/www.${item.author}.com.svg`}
                content={
                  item.id === updateCommentId 
                    ? <>
                        <div style={{float:'left'}}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: '请输入修改评论'
                              }
                            ]}
                          >
                            <Input onChange={this.commentValue}/>
                          </Form.Item>
                          
                        </div>
                        <div style={{float:'right'}}>
                          <Button 
                            type='link' 
                            icon={<CheckCircleTwoTone twoToneColor='#21BA45'/>} 
                            onClick={()=>{this.updateComment(item)}}
                          />
                        </div>
                      </>
                     : item.content
                }
                datetime={moment().fromNow()}
                actions={[
                  <>
                    <span>
                      <Input placeholder='请输入回复评论'/>
                    </span>
                    <span>
                      {
                        item.is_author===true
                          ? <>
                              <Button type='link' size='small' disabled>回复</Button>
                              <Popconfirm
                                title='确定修改该条评论？'
                                onConfirm={()=>this.updateComment(item)}
                                okText='确定'
                                cancelText='取消'
                              >
                                <Button 
                                  style={{color:'#52c41a'}} 
                                  size='small' 
                                  type='link'
                                >
                                  修改
                                </Button>
                              </Popconfirm>
                              
                              <Popconfirm 
                                title='确定删除该条评论？'
                                onConfirm={()=>this.deleteComment(item)}
                                okText='确定'
                                cancelText='取消'
                              >
                                <Button style={{color:'red'}} size='small' type='link'>删除</Button>
                              </Popconfirm>
                            </> 
                          : <>
                              <Button type='link' size='small' onClick={()=>this.replyComment(item)}>回复</Button>
                              <Button 
                                onClick={()=>this.showUpdateComment(item)} 
                                size='small' 
                                type='link' 
                                disabled
                              >
                                修改
                              </Button>
                              <Popconfirm 
                                title='确定删除该条评论？'
                                onConfirm={()=>this.deleteComment(item)}
                                okText='确定'
                                cancelText='取消'
                              >
                                <Button size='small' type='link' disabled>删除</Button>
                              </Popconfirm>
                            </>
                      }
                    </span>
                  </>
                  
                ]}
              >
                {
                  item.children.length!==0 ? this.getCommentList(item.children) : null
                }
              </Comment>
            </List.Item>
          )
        }
      />
    )
  }
  /* 
    搜索功能
  */
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  // 搜索功能
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  // 搜索功能
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  /* 修改table样式 */
  getRowClassName = (record,index)=>{
    let className = index % 2 === 0 ? 'evenRow' : 'oddRow'
    return className
  }
  onRow = (row,index)=>{
    return {
      onMouseEnter: () => {
        this.setState({
          rowActiveIndex: index
        })
      },
      onMouseLeave: () => {
        this.setState({
          rowActiveIndex: null
        })
      }
    }
  }
  componentDidMount(){
    this.getProjects()
  }
  render() {
    const path = this.props.location.pathname
    const title = getTitle(path)
    const { projects, isloading, showStatus } = this.state
    const project = this.project || {}
    const updateComment = this.item || {}
    var undoneProjects = projects.filter((projectObj)=>{
      return projectObj.status !== '项目已完成'
    })
    const extra = (
      <span className='button-style'>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={this.showAdd}
        >
          添加
        </Button>
      </span>
    )
    const footer = (
      <span className='footer-button'>
        <div className='footer-button-left'>
          {
            memoryUtils.user.role_id === '622324981b11626b97778b6c' || project.is_author===true 
              ? <Popconfirm
                  title='删除该项目吗？'
                  onConfirm={()=>this.deleteProject(project)}
                  okText='确定'
                  cancelText='取消'
                >
                  <Button type='primary' danger>
                    删除项目
                  </Button>
                </Popconfirm>
              : null
          }
        </div>
        <div className='footer-button-right'>
          <Button onClick={this.handleCancel}>取消</Button>
          <Button type='primary' onClick={()=>this.updateProject(project)} loading={isloading}>确定</Button>
        </div>
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
            dataSource={undoneProjects}
            columns={this.renderColumns()}
            rowKey='id'
            loading={isloading}
            pagination={{
              size:'large',
              defaultPageSize: PAGE_SIZE
            }}
            rowClassName={this.getRowClassName}
            onRow={this.onRow}
          />
          <Modal
            title='添加项目'
            visible={showStatus===1}
            destroyOnClose
            onOk={this.addProject}
            onCancel={this.handleCancel}
            okText='确认'
            cancelText='取消'
            wrapClassName='add-modal'
          >
            <AddProjectForm 
              setForm = {form => this.form = form}
            />
          </Modal>
          <Modal
            title='添加评论'
            visible={showStatus===4}
            destroyOnClose
            onOk={this.addComment}
            onCancel={this.handleCancel}
            okText='确认'
            cancelText='取消'
          >
            <AddCommentForm 
              setForm={form => this.form = form}
            />
          </Modal>
          <Modal
            title="回复评论"
            destroyOnClose
            visible={showStatus===5}
            onOk={this.handleReplyComment}
            onCancel={this.handleCancel}
            okText='确认'
            cancelText='取消'
          >
            <ReplyCommentForm 
              setForm={form => this.form = form}
            />
          </Modal>
          <Modal
            title="更新评论"
            destroyOnClose
            visible={showStatus===6}
            onOk={this.handleUpdateComment}
            onCancel={this.handleCancel}
            okText='确认'
            cancelText='取消'
          >
            <UpdateCommentForm 
              setForm={form => this.form = form}
              updateComment={updateComment}
            />
          </Modal>
          <Drawer
            title='项目详情'
            visible={showStatus===2}
            width={480}
            onClose={this.handleCancel}
            closable={false}
            footer={footer}
            destroyOnClose
            className='project-detail-modal'
          >
            <ProjectForm
              setForm={form => this.form = form}
              project={project}
            />
            <div>
              {
                this.CommentList
              }
            </div>
            <Form ref={this.formRef}>
              <Form.Item
                name='comments'
                rules={[
                  {
                    required: true,
                    message:'请输入项目评论'
                  }
                ]}
              >
                <TextArea rows={4} placeholder='请输入项目评论' autoComplete='off' style={{borderRadius:5}}/>
              </Form.Item>
              <Form.Item>
                <Button type='primary' onClick={()=>this.addComment(project)} className='comment-button'>添加评论</Button>
              </Form.Item>
            </Form>
            
          </Drawer>
        </Card>
      </div>
    )
  }
}
