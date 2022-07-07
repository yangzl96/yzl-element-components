module.exports = {
  title: '基于element-plus二次封装组件',
  // 部署的基础路径
  base: '/',
  // 类似 html head
  head: [],
  // 主题配置
  themeConfig: {
    // 头部导航
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: 'github站点',
        link: 'https://github.com/yangzongliu/yzl-element-components',
        target: '_blank'
      }
    ],
    // 侧边导航
    sidebar: [
      {
        text: '介绍',
        link: '/intro/'
      },
      {
        text: '快速上手',
        link: '/quickStart/'
      },
      {
        text: '图标选择',
        link: '/chooseIcon/'
      },
      {
        text: '省市区选择',
        link: '/chooseArea/'
      },
      {
        text: '趋势标记',
        link: '/trend/'
      },
      {
        text: '时间选择',
        link: '/chooseTime/'
      },
      {
        text: '通知菜单',
        link: '/notification/'
      },
      {
        text: '导航菜单',
        link: '/menu/'
      },
      {
        text: '城市选择',
        link: '/chooseCity/'
      },
      {
        text: '进度条',
        link: '/progress/'
      },
      {
        text: '日历',
        link: '/calendar/'
      },
      {
        text: '表单',
        link: '/form/'
      },
      {
        text: '弹出框表单',
        link: '/modalForm/'
      },
      {
        text: '表格',
        link: '/table/'
      }
    ]
  },
}