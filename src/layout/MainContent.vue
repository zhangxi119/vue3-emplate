<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="catchList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'MainContent',
  setup() {
    const router = useRouter();
    const findAllCatchableRoute = (routes, list) => {
      routes.forEach((route) => {
        if (route.meta?.catchName) {
          list.push(route.meta.catchName);
        }
        if (route.children) {
          findAllCatchableRoute(route.children, list);
        }
      });
    };
    const catchList = computed(() => {
      const { routes } = router.options;
      const list = [];
      findAllCatchableRoute(routes, list);
      return list;
    });
    return {
      catchList,
    };
  },
};
</script>

<style scoped>
.MainContent-container {
  min-width: 1160px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
