import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import './assets/styles/App.less'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Admin}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
