<template>
  <div
    ref="container"
    class="animal-img"
    v-bind="$attrs"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <div ref="imgRef" :style="`background: url(${src}) no-repeat 0px 0px;`" class="real-img" />
  </div>
</template>

<script setup>
import gsap from 'gsap';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  frames: {
    type: Number,
    default: 51,
  },
});

const imgRef = ref();
const container = ref();
const img = new Image();
const width = ref('0');
const height = ref('0');
const interval = ref(0);
const currentFrame = ref(0);
const scale = ref('1');
let tween;
img.onload = function () {
  width.value = `${img.width}PX`;
  height.value = `-${img.height}PX`;
  interval.value = img.height / props.frames;
  nextTick(() => {
    const rect = container.value.getBoundingClientRect();
    scale.value = rect.width / img.width;
  });
};
// eslint-disable-next-line vue/no-setup-props-destructure
img.src = props.src;
let animalId = 0;
function playAnimal() {
  tween?.pause();
  tween?.kill();
  tween = gsap.to(currentFrame, {
    value: Math.ceil((props.frames - 1) / 2),
    duration: 0.5,
    onUpdate() {
      imgRef.value.style.backgroundPositionY = `-${Math.floor(currentFrame.value) * interval.value}PX`;
    },
  });
}
function playAnimalReverse() {
  tween.pause();
  tween.kill();
  tween = gsap.to(currentFrame, {
    value: 0,
    duration: 0.5,
    onUpdate() {
      imgRef.value.style.backgroundPositionY = `-${Math.floor(currentFrame.value) * interval.value}PX`;
    },
  });
}
function onMouseenter() {
  if (props.autoPlay) {
    playAnimal();
  }
}
function onMouseleave() {
  if (props.autoPlay) {
    playAnimalReverse();
  }
}
const animalFn = () => {
  animalId = requestAnimationFrame(animalFn);
};
onUnmounted(() => {
  cancelAnimationFrame(animalId);
});
defineExpose({
  playAnimal,
  playAnimalReverse,
});
</script>

<style scoped lang='scss'>
@keyframes cartoonRun {
  0% {
    background-position-y: 0px
  }

  100% {
    background-position-y: v-bind('height')
  }

}

.animal-img {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .real-img {
    width: 100%;
    height: 100%;
    zoom: v-bind('scale');
    position: relative;
    // animation-duration: 2s;
    // animation-timing-function: steps(51, end);
    // &:hover {
    //   animation-name: cartoonRun;
    //   animation-direction: normal;
    // }
  }
}
</style>
