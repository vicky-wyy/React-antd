/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { 
  Card,
  Input,
  Button,
  Table,
  message,
  Drawer,
  List,
  Comment,
  Popconfirm,
  Tooltip,
  Space,
  Form,
  Select,
  Divider
} from 'antd'
import {
  SearchOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from '@ant-design/icons'
import moment from 'moment'
import Highlighter from 'react-highlight-words'
import getTitle from '../../components/title'
import memoryUtils from '../../utils/memoryUtils'
import { PAGE_SIZE } from '../../utils/constants'
import ProjectForm from '../projectComponent/project-form'
import Likes from '../../components/project-liked'
import {
  reqProjects,
  reqUpdateProject,
  reqDeleteProject,
  reqDeleteComment,
  reqUpdateComment,
  reqReplyComment,
  reqAddComment,
  reqLikedProject
} from '../../apis'
import '../../assets/styles/project.less'


const {TextArea} = Input
const {Option} = Select
export default class Project extends Component {
  state = {
    projects: [],                  //所有项目
    project: {},                   //将当前的project放到state中
    isloading: false,
    searchText: '',                //搜索
    searchColumn: '',              //搜索
    showStatus: 0,                //项目详情：1
    rowActiveIndex: null,
    inputValue: '',              //回复评论的内容
    commentinputValue: '',       //修改评论的内容
    updateCommentId: '',          //为了更新项目出现input框
    flag: true
  }
  /* 初始化Table列表 */
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
                  <Likes
                    likedCount={record.likedCount}
                    dislikedCount={record.dislikedCount}
                    likedButton={()=>this.likeOrDislikeProject(record.id,'up')}
                    dislikedButton={()=>this.likeOrDislikeProject(record.id,'down')}
                  />
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
  /* 项目详情的Modal */
  projectDetails = (record)=>{
    this.setState({
      showStatus: 1,
      project: record
    })
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
  /* 修改项目 */
  updateProject = async (project)=>{
    const allProject = await reqProjects(memoryUtils.user.itcode)
    for(let i=0;i<allProject.length;i++){
      if(allProject[i].id===project.id){
        console.log(allProject[i])
        this.setState({
          project: allProject[i]
        })
      }
    }
  }
  /* 修改项目状态 */
  updateProjectStatus = async (value)=>{
    const {project} = this.state
    const result = await reqUpdateProject(project.author,project.id,project.name,project.desc,value)
    const allProject = await reqProjects(memoryUtils.user.itcode)
    for(let i=0;i<allProject.length;i++){
      if(allProject[i].id===project.id){
        this.setState({
          project: allProject[i]
        })
      }
    }
    if(result.status==='success'){
      message.success('项目状态更新成功')
      this.getProjects()
    }else{
      message.error('项目状态更新失败')
    }
  }
  /* 删除项目 */
  deleteProject =async (project)=>{
    this.setState({
      showStatus: 0
    })
    const result = await reqDeleteProject(project.author,project.id)
    if(result.status==='success'){
      message.success('项目删除成功')
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
        const author = memoryUtils.user.itcode
        const result = await reqAddComment(author,project.id,values.comments)
        const allProject = await reqProjects(memoryUtils.user.itcode)
        for(let i=0;i<allProject.length;i++){
          if(allProject[i].id===project.id){
            this.setState({
              project: allProject[i]
            })
          }
        }
        if(result.status==='success'){
          message.success('成功添加评论')
          this.formRef.current.resetFields()
        }
      }).catch(errorInfo => {
        console.log(errorInfo)
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
        const allProject = await reqProjects(memoryUtils.user.itcode)
        for(let i=0;i<allProject.length;i++){
          if(allProject[i].id===item.feedback_id){
            this.setState({
              project: allProject[i]
            })
          }
        }
        if(result.status==='success'){
          message.success('删除评论成功')
        }
      }else {
        message.error('您无权删除他人的评论，或者该评论不存在')
      }
    }
  }
  /* 修改评论 */
  updateComment = async (item)=>{
    const author = memoryUtils.user.itcode
    const updateComment = item
    const result = await reqUpdateComment(author,updateComment.id,this.state.commentinputValue)
    const allProject = await reqProjects(memoryUtils.user.itcode)
    for(let i=0;i<allProject.length;i++){
      if(allProject[i].id===item.feedback_id){
        this.setState({
          project: allProject[i]
        })
      }
    }
    if(result.status==='success'){
      message.success('更新评论成功')
      this.setState({
        updateCommentId: ''
      })
    }else{
      message.error('更新评论失败')
    }
  }
  updateCommentId = (item)=>{
    if(item.content==='该评论已被删除'){
      message.info('评论已被删除，无法修改')
    }else{
      this.setState({
        updateCommentId: item.id
      })
    }
  }
  /* 回复评论 */
  replyComment = async(item)=>{
    const {inputValue} = this.state
    const author = memoryUtils.user.itcode
    const result = await reqReplyComment(author,item.feedback_id,inputValue,item.id)
    const allProject = await reqProjects(memoryUtils.user.itcode)
    for(let i=0;i<allProject.length;i++){
      if(allProject[i].id===item.feedback_id){
        this.setState({
          project: allProject[i]
        })
      }
    }
    if(result.status==='success'){
      message.success('成功回复评论')
    }else {
      message.error('回复评论失败')
    }
  }
  /* 遍历Comments */
  getCommentList = (comments)=>{
    const { updateCommentId } = this.state
    return (
      <List 
        className="comment-list"
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
          <List.Item key={comments.id}>
            <Comment 
              author={item.author}
              avatar={`https://api.multiavatar.com/www.${item.author}.com.svg`}
              content={
                item.id===updateCommentId ? (
                  <Form layout='inline'>
                    <Form.Item
                      name='replyComment'
                      initialValue={item.content}
                      rules={[
                        {
                          required: true,
                          message: '请输入修改内容'
                        }
                      ]}
                    >
                      <Input 
                        allowClear
                        onChange={(event)=>{
                          this.setState({
                            commentinputValue: event.target.value
                          })
                        }}
                        autoComplete='off'
                        style={{borderRadius:5}}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button 
                        type='link' 
                        icon={<CheckCircleTwoTone twoToneColor='#21BA45'/>} 
                        onClick={()=>{this.updateComment(item)}}
                      />
                      <Button 
                        type='link' 
                        danger
                        icon={<CloseCircleTwoTone twoToneColor='#FF3737'/>}
                        onClick={()=>{
                          this.setState({
                            updateCommentId: ''
                          })
                        }} 
                      />
                    </Form.Item>
                  </Form>
                ) : item.content
              }
              datetime={moment().fromNow()}
            >
              <Form>
                <Form.List name='comments'>
                  {(fields, { add,remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div style={{display: 'flex'}} key={key}>
                          <Form.Item
                            {...restField}
                            rules={[
                              { 
                                required: true, 
                                message: '请输入回复内容' 
                              }
                            ]}
                          >
                            <Input 
                              placeholder={`回复@${item.author}：`} 
                              allowClear
                              onChange={(event)=>{
                                this.setState({
                                  inputValue: event.target.value
                                })
                              }}
                              style={{borderRadius:5}}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button 
                              type='link' 
                              icon={<CheckCircleTwoTone twoToneColor='#21BA45'/>} 
                              onClick={()=>{this.replyComment(item);remove(name);this.setState({flag:true})}}
                            />
                            <Button 
                              type='link' 
                              danger
                              icon={<CloseCircleTwoTone twoToneColor='#FF3737'/>}
                              onClick={()=> {remove(name);this.setState({flag:true})}} 
                            />
                          </Form.Item>
                        </div>
                      ))}
                      <Form.Item>
                        {
                          item.is_author===true
                            ? <>
                                {
                                  this.state.flag===true
                                  ? <Button type='link' size='small' onClick={() => {add();this.setState({flag:false})}}>回复</Button>
                                  : <Button type='link' size='small' disabled>回复</Button>
                                }
                                <Button 
                                  style={{color:'#52c41a'}} 
                                  size='small' 
                                  type='link'
                                  onClick={()=>{this.updateCommentId(item)}}
                                >
                                  修改
                                </Button>
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
                                {
                                  this.state.flag===true
                                  ? <Button type='link' size='small' onClick={() => {add();this.setState({flag:false})}}>回复</Button>
                                  : <Button type='link' size='small' disabled>回复</Button>
                                }
                                <Button size='small' type='link' disabled>修改</Button>
                                <Button size='small' type='link' disabled>删除</Button>
                              </>
                        }
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form>
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
  /* 搜索功能 */
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
  /* 数据挂载的时候 */
  componentDidMount(){
    this.getProjects()
  }

  render() {
    const path = this.props.location.pathname
    const title = getTitle(path)
    const { projects, isloading, showStatus, project } = this.state
    var undoneProjects = projects.filter((projectObj)=>{
      return projectObj.status === '项目已完成'
    })
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
          {/* <Button type='primary' onClick={()=>this.updateProject(project)}>修改项目</Button> */}
        </div>
      </span>
    )
    return (
      <div className='base-style-card'>
        <Card
          title={title}
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
          <Drawer
            title='项目详情'
            visible={showStatus===1}
            width={480}
            onClose={this.handleCancel}
            closable={false}
            footer={footer} 
            className='project-detail-modal'
            destroyOnClose
            extra={
              memoryUtils.user.role_id==='622324981b11626b97778b6c'
              ? <Select value={project.status} onChange={this.updateProjectStatus}>
                  <Option value="等待审核中">等待审核中</Option>
                  <Option value="项目开发中">项目开发中</Option>
                  <Option value="项目已完成">项目已完成</Option>
                  <Option value="项目已拒绝">项目已拒绝</Option>
                </Select>
              : <Select value={project.status} disabled></Select>
            }
          >
            <ProjectForm
              setForm={form => this.form = form}
              project={project}
              getProjects={this.getProjects}
              updateProjects={()=>this.updateProject(project)}
            />
            <Divider/>
              {
                this.getCommentList(project.comments)
              }
            <Divider/>
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
