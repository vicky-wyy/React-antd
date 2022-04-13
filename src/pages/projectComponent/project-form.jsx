import React, { Component } from 'react'
import { 
  Button,
  Form, 
  Input,
  message
} from 'antd'
import PropTypes from 'prop-types'
import memoryUtils from '../../utils/memoryUtils'
import {
  EditTwoTone,
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from '@ant-design/icons'
import {
  reqUpdateProject
} from '../../apis'
import '../../assets/styles/project.less'

export default class ProjectForm extends Component {
  state = {
    nameflag: false,
    descflag: false,
  }
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    project: PropTypes.object
  }
  formRef = React.createRef()
  // UNSAFE_componentWillMount(){
  //   this.props.setForm(this.formRef)
  // }
  updateProjectName = (project)=>{
    this.formRef.current.validateFields()
      .then(async(values)=>{
        const result = await reqUpdateProject(project.author,project.id,values.name,project.desc,project.status)
        if(result.status==='success'){
          message.success('项目更新成功')
          this.setState({
            nameflag: false,
          })
          this.props.getProjects()
          this.props.updateProjects(project)
        }else{
          message.error('项目更新失败')
        }
      }).catch(errorInfo=>{
        console.log(errorInfo)
      })
  }
  updateProjectDesc = (project)=>{
    this.formRef.current.validateFields()
      .then(async(values)=>{
        const result = await reqUpdateProject(project.author,project.id,project.name,values.desc,project.status)
        if(result.status==='success'){
          message.success('项目更新成功')
          this.setState({
            descflag: false,
          })
          this.props.getProjects()
          this.props.updateProjects(project)
        }else{
          message.error('项目更新失败')
        }
      }).catch(errorInfo=>{
        console.log(errorInfo)
      })
  }
  render() {
    const { project } = this.props
    const { nameflag,descflag } = this.state
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 3 },  // 左侧label的宽度
      wrapperCol: { span: 17 }, // 右侧包裹的宽度
    }
    return (
      <div className='project-form'>
        <Form ref={this.formRef} {...formItemLayout}>
          <Form.Item
            name='name'
            label='名称'
            initialValue={project.name}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入项目名称'
              }
            ]}
          >
            {
              memoryUtils.user.role_id==='622324981b11626b97778b6c' || project.is_author===true 
                ? <div style={{display: 'flex',alignItems:'center'}}>
                    {
                      nameflag===true 
                      ? <Input defaultValue={project.name}/>
                      : project.name
                    }
                    {
                      nameflag===true
                      ? <>
                          <Button 
                            type='link' 
                            icon={<CheckCircleTwoTone twoToneColor='#21BA45'/>} 
                            onClick={()=>this.updateProjectName(project)}
                          />
                          <Button 
                            type='link' 
                            danger
                            icon={<CloseCircleTwoTone twoToneColor='#FF3737'/>}
                            onClick={()=>this.setState({nameflag:false})}
                          />
                        </>
                      : <Button type='link' icon={<EditTwoTone />} onClick={()=>this.setState({nameflag:true})}/>
                    }
                  </div>
                : project.name
            }
          </Form.Item>
          <Form.Item
            name='desc'
            label='描述'
            initialValue={project.desc}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入项目描述'
              }
            ]}
          >
            {
              memoryUtils.user.role_id==='622324981b11626b97778b6c' || project.is_author===true 
                ? <div style={{display: 'flex',alignItems:'center'}}>
                    {
                      descflag===true 
                      ? <Input defaultValue={project.desc}/>
                      : project.desc
                    }
                    {
                      descflag===true
                      ? <>
                          <Button 
                            type='link' 
                            icon={<CheckCircleTwoTone twoToneColor='#21BA45'/>} 
                            onClick={()=>this.updateProjectDesc(project)}
                          />
                          <Button 
                            type='link' 
                            danger
                            icon={<CloseCircleTwoTone twoToneColor='#FF3737'/>}
                            onClick={()=>this.setState({descflag:false})}
                          />
                        </>
                      : <Button type='link' icon={<EditTwoTone />} onClick={()=>this.setState({descflag:true})}/>
                    }
                  </div>
                : project.desc
            }
          </Form.Item>
        </Form>
      </div>
    )
  }
}
