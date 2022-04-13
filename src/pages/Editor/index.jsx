import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import { Layout } from 'antd'
import 'braft-editor/dist/index.css'
import '../../assets/styles/editor.less'
export default class Editor extends Component {
  state = {
    editorState: BraftEditor.createEditorState(''),
    outputHTML: ''
  }
  componentDidMount() {
    this.isLiving = true
    setTimeout(this.setEditorContentAsync,3000)
  }
  componentWillUnmount() {
    this.isLiving = false
  }
  handleEditorChange = (editorState)=>{
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }
  setEditorContentAsync = ()=>{
    this.isLiving && this.setState({
      editorState: BraftEditor.createEditorState('你好，<b>你一定会瘦到95斤的！！！</b>')
    })
  }
  render() {
    const { editorState, outputHTML } = this.state
    return (
      <Layout>
        <div className='base-style'>
          <div className='editor'>
            <BraftEditor value={editorState} onChange={this.handleEditorChange} />
          </div>
        </div>
        <div className='base-style'>
          <h5>输出内容</h5>
          <div className='output-content'>
            {outputHTML}
          </div>
        </div>
      </Layout>
    )
  }
}
