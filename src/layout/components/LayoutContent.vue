<template>
  <yun-side-menu
    :menu="routers"
    :default-active="defaultActive"
    :system-name="systemName"
    @system-change="systemChange"
  />
  <LayoutPageTag v-if="pageSettings.hasPageTag">
    <main class="layout-main">
      <slot />
    </main>
  </LayoutPageTag>
  <div v-else class="outer-wrapper">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="path in xPath" :key="path.id">
          {{ path.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <main class="layout-main">
      <slot />
    </main>
  </div>
</template>
<script>
import {
  reactive, toRefs, computed, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'yun-design';
import { useConfigStore } from '@/store/modules/config';
import LayoutPageTag from './LayoutPageTag.vue';

import { routers } from '../const/menu';

export default {
  name: 'LayoutHeaderMenu',
  components: { LayoutPageTag },
  setup() {
    const route = useRoute();
    const store = useConfigStore();

    const defaultActive = ref(route.fullPath);
    const pageSettings = computed(() => store.pageSettings);
    const state = reactive({
      systemName: 'otms',
      routers,
    });
    const systemChange = (row) => {
      state.systemName = row.icon;
      ElMessage(JSON.stringify(row));
    };
    const getXPath = (list, path) => {
      const data = list.reduce(
        (result, item) => {
          let xPath = result;
          if (path === item.path) {
            xPath = [{ ...item }];
          } else if (item.children) {
            const subXPath = getXPath(item.children, path);
            if (subXPath.length) {
              xPath = [{ ...item }, ...subXPath];
            }
          }
          return xPath;
        },
        [],
      );
      return data;
    };
    const xPath = computed(() => getXPath(routers, route.fullPath));
    return {
      pageSettings,
      defaultActive,
      xPath,
      ...toRefs(state),
      systemChange,
    };
  },
};
</script>
<style lang="scss" scoped>

.layout-main{
  flex: 1;
  overflow-y: auto;
}
.outer-wrapper{
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .breadcrumb{
    height: 32px;
    display: flex;
    align-items: center;
    .el-breadcrumb__item:last-child{
      :deep(.el-breadcrumb__inner){
        font-weight: 700;
      }
    }
  }
}
:deep(.content-view){
  display: flex;
}
</style>
