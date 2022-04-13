import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd'
import { 
  WechatOutlined,
  QqOutlined,
  SkypeOutlined,
  WeiboCircleOutlined,
  FullscreenOutlined
} from '@ant-design/icons'
import Bar from '../Charts/bar'
import Pie from '../Charts/pie'
import Line from '../Charts/line'
import Scatter from '../Charts/scatter'
import PictorialBar from '../Charts/pictorialBar'
import '../../assets/styles/home.less'
export default class Home extends Component {
  render() {
    return (
      <Layout className='index animated fadeIn'>
        <Row gutter={24} className='index-header'>
          <Col span={6}>
            <div className='base-style wechat'>
              <WechatOutlined className='icon-style'/>
              <div>
                <span>999</span>
                <div>微信</div>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className='base-style qq'>
              <QqOutlined className='icon-style'/>
              <div>
                <span>366</span>
                <div>QQ</div>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className='base-style skype'>
              <SkypeOutlined className='icon-style'/>
              <div>
                <span>888</span>
                <div>Skype</div>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className='base-style weibo'>
              <WeiboCircleOutlined className='icon-style'/>
              <div>
                <span>666</span>
                <div>微博</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className='base-style'>
              <Bar/>
            </div>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <div className='base-style'>
              <Line/>
            </div>
          </Col>
          <Col span={12}>
            <div className='base-style'>
              <Pie/>
            </div>
          </Col>
          <Col span={12}>
            <div className='base-style'>
              <Scatter/>
            </div>
          </Col>
          <Col span={12}>
            <div className='base-style'>
              <PictorialBar/>
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}
