import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import {
  Layout,
  Menu,
  Affix
} from 'antd'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import talkingData from '../../assets/images/talkingData.jpg'
import t from '../../assets/images/T.jpg'

const { Sider } = Layout
const { SubMenu } = Menu

class AppLeftNav extends Component {

  hasAuth = (item)=>{
    const key = item.key
    if(memoryUtils.user.role.includes(key)){
      return true
    }else if(item.children){   
      if(item.children.find(child =>  memoryUtils.user.role.indexOf(child.key)!==-1)){
        return true
      }
    }
    return false
  }
  /* 生成左侧导航栏 */
  getMenuNodes = (menuList)=>{
    //得到当前的请求路径
    const path = this.props.location.pathname
    return menuList.reduce((pre,item)=>{
      if(this.hasAuth(item)){
        if(!item.children){
          pre.push((
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        }else {
          const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
          if(cItem){
            this.openKey = item.key
          }
          pre.push((
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {
                this.getMenuNodes(item.children)
              }
            </SubMenu>
          ))
        }
      }
      return pre
    },[])
  }

  UNSAFE_componentWillMount(){
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    let { menuToggle } = this.props
    let path = this.props.location.pathname
    console.log('render()',path)
    const openKey = this.openKey
    return (
      <Affix>
        <Sider className='aside' collapsed={menuToggle}>
          <div className='logo'>
            {
              menuToggle ? <img src={t} alt='t'/> : <img src={talkingData} alt='talkingData'/>
            }
          </div>
          <Menu
            mode='inline'
            theme='dark'
            selectedKeys={[path]}
            defaultOpenKeys={[openKey]}
          >
            {
              this.menuNodes
            }
          </Menu>
        </Sider>
      </Affix>
    )
  }
}
export default withRouter(AppLeftNav)