/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from 'react'
import Loadable from 'react-loadable'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
class loadable extends Component {
  constructor(props){
    super(props)
    nProgress.start()
  }
  componentDidMount(){
    nProgress.done()
  }
  render() {
    return (
      <div/>
    )
  }
}
export default (loader,loading = loadable) => {
  return Loadable({
    loader,
    loading
  })
}