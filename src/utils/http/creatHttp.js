import Http from '@thales/http/src/index';
import { ElMessage } from 'yun-design';
import router from '@/router/index';
import { getToken } from '../auth';
import sessionExpiredHandler from './sessionExpiredHandler';

export default (prefix, options = {}) => Http.create({
  withCredentials: options.withCredentials || false,
  prefix,
  $message: (error) => {
    const msg = error.message;
    if (msg.indexOf('4000100804') !== -1 || msg.indexOf('4000100803') !== -1) {
      router.replace({ path: '/expire' });
    } else if (msg.indexOf('4002039X02') === -1) {
      ElMessage({
        message: msg,
        type: 'error',
        grouping: true,
        duration: 5 * 1000,
      });
    }
  },
  sessionExpiredHandler,
  tokenHandler(config) {
    let { headers, token } = config;
    if (!token) {
      token = getToken();
    }
    headers = headers || {};
    headers.Authorization = token;
    return { ...config, headers };
  },
  ...options,
});
