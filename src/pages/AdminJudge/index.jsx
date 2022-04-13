import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import Admin from '../Admin'
import UserAdmin from '../UserAdmin'
import memoryUtils from '../../utils/memoryUtils'
export default class AdminJudge extends Component {
  render() {
    return (
      <Switch>
        {
          memoryUtils.user.role_id === '622324981b11626b97778b6c'
          ? <Route path='/' component={Admin}/>
          : <Route path='/' component={UserAdmin}/>
        }
      </Switch>
    )
  }
}
