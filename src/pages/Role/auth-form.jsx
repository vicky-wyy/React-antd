import React, { Component } from 'react'
import { 
  Form,
  Input,
  Tree 
} from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'

export default class AuthForm extends Component {
  static propTypes = {
    role: PropTypes.object
  }

  constructor(props){
    super(props)
    const { menus } = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }
  getMenus = () => this.state.checkedKeys

  onCheck = (checkedKeys)=>{
    this.setState({
      checkedKeys
    })
  }

  
  //当组件接收到新的属性时自动调用
  //通过this.props来获取旧的外部状态,初始 props 不会被调用
  //通过对比新旧状态，来判断是否执行如this.setState及其他方法
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
  }
  render() {
    const { role } = this.props
    const { checkedKeys } = this.state
    return (
      <div>
        <Form.Item label='角色名称'>
          <Input value={role.roleName} disabled />
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
          treeData={menuList}
        >
        </Tree>
      </div>
    )
  }
}
