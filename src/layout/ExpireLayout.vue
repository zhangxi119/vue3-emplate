<template>
  <el-container>
    <el-header>
      <LayoutHeaderMenu />
    </el-header>
    <el-container>
      <RouterView />
    </el-container>
  </el-container>
</template>
<script>
import LayoutHeaderMenu from './components/LayoutHeaderMenu.vue';

export default {
  name: 'AppLayout',
  components: { LayoutHeaderMenu },
  setup() {
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
