import React, { Component } from 'react'
import { Switch,Redirect,Route } from 'react-router-dom'
import { Layout,BackTop } from 'antd'
import { UpOutlined } from '@ant-design/icons'
import Project from '../Project'
import DoneProject from '../DoneProject'
import UserAppHeader from '../../components/AppHeader/userIndex'
import View404 from '../NotFound/404'
import '../../assets/styles/userAdmin.less'
const { Content } = Layout
export default class UserAdmin extends Component {
  render() {
    return (
      <Layout className='user-app'>
        <BackTop>
          <div className='backTop'>
            <UpOutlined className='back-up'/>
          </div>
        </BackTop>
        <Layout>
          <UserAppHeader/>
          <Content className='content'>
            <Switch>
              <Redirect from='/' exact to='/project'/>
              <Route path='/project' component={Project}></Route>
              <Route path='/donepro' component={DoneProject}></Route>
              <Route component={View404} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
