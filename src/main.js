import { createApp } from 'vue';
import YunDesign from 'yun-design';
import 'normalize.css';
import 'yun-design/theme-chalk/index.css';
import zhLocale from 'yun-design/lib/locale/lang/zh-cn';
import VueAnimateCss from 'vue3-animate-css';
import pinia from '@/store';
import design from './plugins/design';
import 'vue-global-api';
import App from './App.vue';
import router from './router';
import 'amfe-flexible';

createApp(App)
  .use(pinia)
  .use(router)
  .use(YunDesign, { locale: zhLocale })
  .use(design)
  .use(VueAnimateCss)
  .mount('#app');
