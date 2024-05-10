export const routers = [
  {
    id: '0',
    name: '演示',
    icon: 'icon-edit',
    children: [
      {
        id: '0-1',
        name: '配置路由',
        path: '/demo/rename',
        // icon: 'icon-settings',
      },
      {
        id: '0-2',
        name: '自动引入图片',
        path: '/demo/image',
        // icon: 'icon-settings',
      },
      {
        id: '0-3',
        name: '自动转换svgIcon',
        path: '/demo/svgIcon',
        // icon: 'icon-settings',
      },
    ],
  },
  {
    id: '1',
    name: '表单',
    icon: 'icon-edit',
    children: [
      {
        id: '1-1',
        name: '基础表单',
        path: '/form/baseForm',
        // icon: 'icon-settings',
      },
      {
        id: '1-2',
        name: '高级表单',
        path: '/form/highForm',
        // icon: 'icon-settings',
      },
      {
        id: '1-3',
        name: '分步表单',
        path: '/form/stepForm',
        // icon: 'icon-settings',
      },
    ],
  },
  {
    id: '2',
    name: '列表',
    icon: 'icon-table',
    children: [
      {
        id: '2-1',
        name: '查询列表',
        path: '/list/filterlist',
        // icon: 'icon-settings',
      },
      {
        id: '2-2',
        name: '卡片列表',
        path: '/list/cardlist',
        // icon: 'icon-settings',
      },
    ],
  },
  {
    id: '3',
    name: '详情',
    icon: 'icon-xiangqingye',
    children: [
      {
        id: '3-1',
        name: '可编辑的详情页',
        path: '/detail/editDetail',
        // icon: 'icon-settings',
      },
      {
        id: '3-2',
        name: '多组单层详情页',
        path: '/detail/basicDetail',
        // icon: 'icon-settings',
      },
      {
        id: '3-3',
        name: '多组多层详情页',
        path: '/detail/highDetail',
        // icon: 'icon-settings',
      },
    ],
  },
  {
    id: 'proDetail',
    name: '高级详情',
    icon: 'icon-xiangqingye',
    children: [
      {
        id: 'proDetail-1',
        name: '经典用法',
        path: '/proDetail/basic',
      },
    ],
  },
  {
    id: '4',
    name: '结果',
    icon: 'icon-check-circle',
    children: [
      {
        id: '4-1',
        name: '成功',
        path: '/result/success',
        // icon: 'icon-settings',
      },
      {
        id: '4-2',
        name: '失败',
        path: '/result/fail',
        // icon: 'icon-settings',
      },
    ],
  },
  {
    id: '5',
    name: '异常',
    icon: 'icon-yichangye',
    children: [
      {
        id: '5-1',
        name: '访问页面不存在',
        path: '/exception/notFound',
        // icon: 'icon-settings',
      },
      {
        id: '5-2',
        name: '服务器出错页',
        path: '/exception/serverError',
        // icon: 'icon-settings',
      },
      {
        id: '5-3',
        name: '系统维护页',
        path: '/exception/system',
        // icon: 'icon-settings',
      },
      {
        id: '5-4',
        name: '网络出错',
        path: '/exception/website',
        // icon: 'icon-settings',
      },
      {
        id: '5-5',
        name: '无权限页面',
        path: '/exception/expire',
        // icon: 'icon-settings',
      },
    ],
  },
];
