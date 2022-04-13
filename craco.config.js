const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1678ff' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  /*babel 这里是新增的 */
  babel: {
    plugins: [
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true  }],
        ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
  }
  /*新增结束*/
};