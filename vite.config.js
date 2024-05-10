import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import ViteImages from 'vite-plugin-vue-images';
import Pages from 'vite-plugin-pages';
import ViteRestart from 'vite-plugin-restart';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import postcssPxtoRem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: 'src/auto-import.d.ts',
    }),
    // 组件自动引入
    Components({
      // resolvers: [
      //   ElementPlusResolver(),
      // ],
      dirs: ['src/components'], // 目标文件夹
      extensions: ['vue', 'jsx', 'tsx'], // 文件类型
      dts: 'src/components.d.ts', // 输出文件，里面都是一些import的组件键值对
      // ui库解析器，也可以自定义，需要安装相关UI库
    }),
    vue(),
    vueJsx({}),
    // 可在setup上加入name值
    vueSetupExtend(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    // 自动重启
    ViteRestart({
      restart: [
        'my.config.[jt]s',
      ],
    }),
    // 自动引入图片
    ViteImages({
      dirs: ['src/assets'], // 图像目录的相对路径
      extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'], // 有效的图像扩展
      customResolvers: [], // 覆盖名称->图像路径解析的默认行为
      customSearchRegex: '([a-zA-Z0-9]+)', // 重写搜索要替换的变量的Regex。
    }),
    // // 第三方样式自动引入
    // createStyleImportPlugin({
    //   resolves: [
    //     ElementPlusResolve(),
    //   ],
    // }),
    // 自动生成路由
    Pages({
      dirs: 'src/views', // 需要生成路由的文件目录，默认就是识别src下面的pages文件
      extensions: ['vue', 'tsx', 'jsx'],
      exclude: ['**/components/*.vue'], // 排除在外的目录，上面配置目录的例子，里面有 components 目录，我们不希望他被解析为路由
      // importMode(path) {
      //   // Load about page synchronously, all other pages are async.
      //   return path.includes('about') ? 'sync' : 'async';
      // },
      extendRoute(route, parent) {
        if (route.path === '/' || !route.path) {
          // Index is unauthenticated.
          return {
            ...route,
            redirect: '/form/baseForm',
          };
        }

        // Augment the route with meta that indicates that the route requires authentication.
        return route;
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  optimizeDeps: {
    include: ['@vue/compiler-sfc'],
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/scss/index.scss" as *;',
      },
    },
    postcss: {
      plugins: [
        postcssPxtoRem({
          // rootValue: ({ file }) => {
          //   if (file.includes('official')) {
          //     return 172.5;
          //   }
          //   return 144;
          // }, // 按照自己的设计稿修改 1440/10
          rootValue: 144,
          unitPrecision: 5, // 保留到5位小数
          selectorBlackList: ['ignore'], // 忽略转换正则匹配项
          propList: ['*'],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0,
        }),
      ],
    },
  },
});
