import autoRoutes from '~pages';

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/',
    children: [...autoRoutes],
  },
];
// const routes = [
//   {
//     path: '/',
//     component: AppLayout,
//     // 自定义添加AppLayout、MainContent等公共页面
//     children: [
//       {
//         path: '/',
//         name: 'index',
//         redirect: '/demo/warehouse',
//         component: MainContent,
//         // 最终嵌套自动生成的路由
//         children: antoRoutes,
//       },
//     ],
//   },
// ];

export default routes;
