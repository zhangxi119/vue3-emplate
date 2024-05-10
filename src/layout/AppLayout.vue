<template>
  <el-container v-if="reloadTag">
    <el-header>
      <LayoutHeaderMenu />
    </el-header>
    <el-container>
      <LayoutContent>
        <RouterView />
      </LayoutContent>
    </el-container>
  </el-container>
</template>
<script>
import {
  provide, computed, ref, nextTick,
} from 'vue';
import { useConfigStore } from '@/store/modules/config';
import LayoutHeaderMenu from './components/LayoutHeaderMenu.vue';
import LayoutContent from './components/LayoutContent.vue';

export default {
  name: 'AppLayout',
  components: { LayoutContent, LayoutHeaderMenu },
  setup() {
    const store = useConfigStore();
    const hasPageTag = computed(() => store.pageSettings.hasPageTag);
    const reloadTag = ref(true);
    const reload = () => {
      reloadTag.value = false;
      nextTick(() => {
        reloadTag.value = true;
      });
    };
    provide('reload', reload);
    provide('hasPageTag', hasPageTag);
    return {
      reloadTag,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-header {
  padding: 0;
  height: 48px;
}
.el-container {
  height: 100%;
  overflow: hidden;
}
.el-aside {
  height: 100%;
}

</style>
