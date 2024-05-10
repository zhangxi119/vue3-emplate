import { useUserStore } from '@/store/modules/user';

// 白名单，不需要登录验证
const whiteList = ['/login', '/official', '/config', '/expire'];

export default function handlePermission(to) {
  const { token } = useUserStore();
  const loginRoute = {
    path: '/login',
    query: {
      redirect: to.path,
    },
  };
  if (token) {
    return to.path === '/login' ? { path: '/' } : true;
  }
  return whiteList.some((e) => to.path.startsWith(e)) ? true : loginRoute;
}
