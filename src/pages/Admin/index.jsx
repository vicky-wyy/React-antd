import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {
  BackTop,
  Layout,
} from 'antd'
import { UpOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import AppLeftNav from '../../components/AppLeftNav'
import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'
import Home from '../Home'
import Project from '../Project'
import DoneProject from '../DoneProject'
import User from '../User'
import Role from '../Role'
import Bar from '../Charts/bar'
import Line from '../Charts/line'
import Pie from '../Charts/pie'
import Scatter from '../Charts/scatter'
import PictorialBar from '../Charts/pictorialBar'
import Editor from '../Editor'
import Banners from '../Banners'
import View404 from '../NotFound/404'
import { menuToggleAction } from '../../redux/actionCreators'
import '../../assets/styles/admin.less'
const {Content} = Layout
class Admin extends Component {
  render() {
    let { menuToggle,menuClick } = this.props
    return (
      <Layout className='app'>
        <BackTop>
          <div className='backTop'>
            <UpOutlined className='back-up'/>
          </div>
        </BackTop>
        <AppLeftNav menuToggle={menuToggle}/>
        <Layout>
          <AppHeader menuToggle={menuToggle} menuClick={menuClick}/>
          <Content className='content'>
            <Switch>
              <Redirect from='/' exact to='/home'/>
              <Route path='/home' component={Home}/>
              <Route path='/project' component={Project}/>
              <Route path='/donepro' component={DoneProject}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path='/editor' component={Editor}/>
              <Route path='/banners' component={Banners}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Route path='/charts/scatter' component={Scatter}/>
              <Route path='/charts/pictorialBar' component={PictorialBar}/>
              <Route component={View404}/>
            </Switch>
          </Content>
          <AppFooter/>
        </Layout>
      </Layout>
    )
  }
}
const stateToProp = state => ({
  menuToggle: state.menuToggle
})
const dispatchToProp = dispatch => ({
  menuClick(){
    dispatch(menuToggleAction())
  }
})
export default connect(
  stateToProp,
  dispatchToProp
)(Admin)