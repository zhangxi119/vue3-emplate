<template>
  <section class="layout-page-tag-root">
    <yun-page-tabs
      ref="myTabsRef"
      :title-path="'meta.title'"
    >
      <slot />
    </yun-page-tabs>
  </section>
</template>

<script>

import { ref } from 'vue';

export default {
  name: 'LayoutPageTag',
  setup() {
    const myTabsRef = ref('');
    const openTab = (tab) => {
      myTabsRef.value.addTab(tab);
    };
    return {
      openTab,
      myTabsRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-page-tag-root{
  height: 100%;
  flex:1;
  overflow: hidden;
}
.outer-wrapper{
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
}
</style>
