import {
  AppstoreOutlined,/*项目*/
  ProjectOutlined,/*所有项目*/
  FileDoneOutlined,/*已完成项目*/
  UserOutlined,    /* 用户管理 */
  SafetyCertificateOutlined,    /* 角色管理 */
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  HomeOutlined,
  RedditOutlined,
  RadarChartOutlined,
  BoxPlotOutlined,
  SmileOutlined
} from '@ant-design/icons';

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: <HomeOutlined />,
  },
  {
    title: '项目',
    key: '/projects',
    icon: <AppstoreOutlined />,
    children: [ // 子菜单列表
      {
      title: '所有项目',
      key: '/project',
      icon: <ProjectOutlined />,
      },
      {
      title: '已完成项目',
      key: '/donepro',
      icon: <FileDoneOutlined />
      }
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: <UserOutlined />
  },
  {
    title: '角色管理',
    key: '/role',
    icon: <SafetyCertificateOutlined />
  },
  {
    title: '图表',
    key: '/charts',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: <BarChartOutlined />
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: <LineChartOutlined />
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: <PieChartOutlined />
      },
      {
        title: '点图',
        key: '/charts/scatter',
        icon: <RadarChartOutlined />
      },
      {
        title: '画报图',
        key: '/charts/pictorialBar',
        icon: <BoxPlotOutlined />
      }
    ],
  },
  {
    title: '富文本功能',
    key: '/editor',
    icon: <RedditOutlined />
  },
  {
    title: '轮播图',
    key: '/banners',
    icon: <SmileOutlined />
  }
]
export default menuList