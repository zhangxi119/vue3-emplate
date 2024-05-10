<template>
  <div class="player-container">
    <div v-loading="loading" class="player-container__box">
      <div class="player-container__box--player">
        <div id="realTimePlayer" />
      </div>
      <div class="tool">
        <el-button size="small" :icon="FullScreen" @click="wholeFullScreen">
          全屏
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue';
import { ElNotification } from 'yun-design';
import { FullScreen } from '@yun-design/icons-vue';

const props = defineProps({
  playUrl: {
    type: String,
    default: '',
  },
});
const player = ref(null);
const loading = ref(false);

const init = () => {
  // 创建播放器
  player.value = new window.JSPlugin({
    szId: 'realTimePlayer', // 容器ID
    szBasePath: '/js/',
    iMaxSplit: 4, // 最大分屏数量
    iCurrentSplit: 1, // 当前分屏数量
    openDebug: false,
    oStyle: {
      borderSelect: '#FFCC00',
    },
  });
  // 事件回调绑定
  player.value.JS_SetWindowControlCallback({
    pluginErrorHandler: (iWndIndex, iErrorCode, oError) => {
      console.log('pluginError callback:', iWndIndex, iErrorCode, oError);

      if (iErrorCode === '0x12f910019') {
        console.log('SET_SSL error');
      }
      if (iErrorCode.includes('0x12f910027')) {
        ElNotification({
          title: '提示',
          message: '送流异常，被后端关闭连接，请稍候重试！',
          type: 'warning',
          // duration: 0
        });
      }
    },
  });
};
const play = () => {
  const playURL = props.playUrl;
  const index = player.value?.currentWindowIndex || 0; // 当前窗口索引
  return player.value.JS_Play(playURL, { playURL, mode: 1 }, index).then(
    () => {
      console.log('realplay success');
    },
    (e) => {
      // console.log(9999999999, e);
      // const { SuperRender } = window;
      // console.log('SuperRender', SuperRender);

      ElNotification({
        title: '提示',
        message: '当前摄像头取流失败，请稍候重试！',
        type: 'warning',
      });
      console.error(e);
    },
  );
};

// 屏幕大小改变之后的回调事件
const playerResizeEvent = () => {
  player.value.JS_Resize();
};
// 调整分屏
const arrangeWindow = () => {
  const splitNum = 1;
  player.value.JS_ArrangeWindow(splitNum).then(
    () => {
      console.log(`arrangeWindow to ${splitNum}x${splitNum} success`);
    },
    (e) => {
      console.log('arrangeWindow', e);
    },
  );
  player.value.JS_SelectWnd(0);
};
const wholeFullScreen = () => {
  player.value.JS_FullScreenDisplay(true).then(
    () => {
      console.log('wholeFullScreen success');
    },
    (e) => {
      console.error(e);
    },
  );
  setTimeout(() => {
    arrangeWindow();
  }, 200);
};
const stopPlay = () => player.value.JS_StopRealPlayAll().then(
  () => true,
  (e) => {
    console.error('stopPlay', e);
  },
);
const loadPlayerVideo = async () => {
  if (!props.playUrl) return;

  try {
    loading.value = true;
    await play();
    loading.value = false;
  } catch (e) {
    console.log('loadPlayerVideo', e);
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  window.addEventListener('resize', playerResizeEvent);
  await init();
  setTimeout(() => {
    arrangeWindow();
    setTimeout(() => {
      arrangeWindow();
    }, 10);
  }, 10);
  nextTick(() => {
    loadPlayerVideo();
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', playerResizeEvent);
  stopPlay(); // 目的是关闭websokect的流，否则开多个页签会报错
  player.value = null;
});

defineExpose({
  stopPlay,
});
</script>

<style lang="scss" scoped>
.player-container {
  flex: 1;
  background-color: #f0f2f5;
  text-align: center;

  &__box {
    width: 100%;
    height: 100%;

    &--player {
      width: 100%;
      height: calc(100% - 40px);
      box-sizing: border-box;
      display:flex;
      justify-content:center;
      #realTimePlayer {
        width: 100%;
        height: 100%;
      }
    }
    .tool{
      padding:4px 2px;
      display:flex;
      justify-content:center;
    }
  }
}
</style>
