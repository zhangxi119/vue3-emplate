<template>
  <div class="stc-video" :class="{showEdg: showEdg}">
    <video
      muted
      autoplay
      loop
      v-bind="$attrs"
    />
    <div />
  </div>
</template>

<script setup>
defineProps({
  showEdg: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang='scss'>
.stc-video {
  width: 100%;
  height: 100%;
  position: relative;
  &.showEdg::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 5px;
    height: 5px;
    z-index: 10;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    border-left: 1px solid rgba(255, 255, 255, 0.4);
  }

  &.showEdg::after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 5px;
    height: 5px;
    z-index: 10;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    border-right: 1px solid rgba(255, 255, 255, 0.4);
  }

  &.showEdg>div {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      content: "";
      width: 5px;
      height: 5px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      border-left: 1px solid rgba(255, 255, 255, 0.4);
      z-index: 10;
    }

    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      content: "";
      width: 5px;
      height: 5px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      border-right: 1px solid rgba(255, 255, 255, 0.4);
      z-index: 10;
    }
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
