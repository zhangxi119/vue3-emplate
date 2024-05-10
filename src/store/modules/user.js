import { localStorageRemove } from '@/utils/localStorage';
import { USER, TOKEN } from '@/constant/storage';

export const useUserStore = defineStore('user', {
  // 静态数据
  state: () => ({
    userInfo: {},
    token: null,
  }),
  getters: {},
  actions: {
    loginOut(state) {
      this.token = null;
      this.userInfo = {};
      localStorageRemove(USER);
      localStorageRemove(TOKEN);
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
      },
    ],
  },
});
