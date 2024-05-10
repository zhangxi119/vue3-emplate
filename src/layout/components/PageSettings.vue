<template>
  <yun-drawer
    v-model="drawer"
    :size="'small'"
    title="显示设置"
    @confirm="drawerConfirm"
    @closed="drawerClose"
  >
    <el-form>
      <el-card
        :border="false"
        shadow="never"
        header-padding="0"
        :body-style="{ padding: '16px 0 0 0' ,borderBottom:'1px solid #EBECEE',marginBottom:'24px'}"
      >
        <template #header>
          <div class="card-header">
            <span class="title">显示设置
            </span>
          </div>
        </template>
        <el-form-item label="显示Tabs标签页" class="pageSetting-drawer-item">
          <el-switch
            v-model="editPageSettings.hasPageTag"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </el-form-item>
      </el-card>
      <el-card
        :border="false"
        shadow="never"
        header-padding="0"
        :body-style="{ padding: '16px 0 0 0' }"
      >
        <template #header>
          <div class="card-header">
            <span class="title">主题色设置
            </span>
          </div>
        </template>
        <el-form-item :label-width="0" class="pageSetting-drawer-item">
          <div class="color-select">
            <el-tooltip
              v-for="color in COLORLIST"
              :key="color.code"
              effect="dark"
              :content="color.text"
              placement="bottom"
            >
              <div

                :class="['color-select-option',{active:color.code === editPageSettings.pageColor}]"
                :style="{backgroundColor:color.code}"
                @click="checkColor(color.code)"
              >
                <i class="yun-iconfont icon-check" />
              </div>
            </el-tooltip>
          </div>
        </el-form-item>
      </el-card>
    </el-form>
  </yun-drawer>
</template>
<script setup name="PageSettings">
import {
  computed, ref, watch, inject,
} from 'vue';
import { useConfigStore } from '@/store/modules/config';
import { COLORLIST } from '@/constant/const';
import YunTheme from '@ylz-material/theme';

const props = defineProps({
  visible: {
    default: false,
    type: Boolean,
  },
});
const emits = defineEmits(['update:visible']);

const store = useConfigStore();
const pageSettings = computed({
  get: () => store.pageSettings,
  set: (val) => {
    store.setPageSettings({ ...val });
  },
});
const drawer = ref(false);
const editPageSettings = ref({ ...pageSettings.value });
const drawerConfirm = () => {
  pageSettings.value = editPageSettings.value;
  drawer.value = false;
};
const drawerClose = () => {
  emits('update:visible', false);
};

const reload = inject('reload');
const checkColor = (code) => {
  editPageSettings.value.pageColor = code;
};
watch(() => props.visible, (data) => {
  drawer.value = data;
}, {
  immediate: true,
});
watch(() => pageSettings.value.pageColor, (data) => {
  YunTheme.set(data);
  reload(0);
});
</script>
<style lang="scss" scoped>

.color-select{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width:100%;
  &-option{
    width:24px;
    height: 24px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #06B880;
    .yun-iconfont{
      display: none;
    }
    & + .color-select-option{
      margin-left: 16px;
    }
    &.active{
      .yun-iconfont{
        display: block;
        position: absolute;
        color:#ffffff;
        font-size: 24px;
      }
    }
  }
}
</style>
