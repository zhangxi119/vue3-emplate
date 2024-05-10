<template>
  <yun-header-menu
    v-model:tenantId="tenantId"
    user-name="荔小智"
    :tenand-list="tenandList"
    :title="title"
    :user-tools="userTools"
    certified
    @change-tenant="changeTenant"
    @loginout="loginout"
  >
    <div class="item">
      <TaskMenu />
      <span class="tips">任务中心</span>
    </div>
    <div class="item" @click="handler">
      <i class="yun-iconfont icon-search" />
      <span class="tips">搜索</span>
    </div>
    <div class="item" @click="handler">
      <i class="yun-iconfont icon-youjian" />
      <div class="tips">
        消息
      </div>
    </div>
    <div class="item" @click="editPageSettingHandle">
      <i class="yun-iconfont icon-settings" />
      <div class="tips">
        显示设置
      </div>
    </div>
  </yun-header-menu>

  <PageSettings v-model:visible="drawer" />
</template>
<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'yun-design';
import { removeToken } from '@/utils/auth';
import PageSettings from './PageSettings.vue';
import TaskMenu from './TaskMenu.vue';

const cb = () => {
  ElMessage('handle');
};

export default {
  name: 'LayoutHeaderMenu',
  components: { PageSettings, TaskMenu },
  setup() {
    const router = useRouter();
    const state = reactive({

      title: '运荔枝',
      tenandList: [
        { tenantName: '成都谷道科技有限公司余姚分公司', tenantId: 'tenantId1' },
        { tenantName: '2成都运', tenantId: 'tenantId2' },
        { tenantName: '3成都运荔枝科技有限公司', tenantId: 'tenantId3' },
        { tenantName: '4成都运荔枝科技有限公司', tenantId: 'tenantId4' },
        { tenantName: '5成都运荔枝科技有限公司', tenantId: 'tenantId5' },
        { tenantName: '6成都运荔枝科技有限公司', tenantId: 'tenantId6' },
        { tenantName: '7成都运荔枝科技有限公司', tenantId: 'tenantId7' },
        { tenantName: '8成都运荔枝科技有限公司', tenantId: 'tenantId8' },
      ],
      tenantId: 'tenantId5',
      drawer: false,
      userTools: [
        { name: '名称1', cb },
        { name: '名称2', cb },
        { name: '名称3', cb },
      ],
    });

    const changeTenant = (row) => {
      ElMessage(JSON.stringify(row));
    };
    const loginout = () => {
      removeToken();
      router.push('/login');
    };

    const editPageSettingHandle = () => {
      state.drawer = true;
    };
    return {
      ...toRefs(state),
      changeTenant,
      loginout,
      editPageSettingHandle,
    };
  },
};
</script>
<style lang="scss" scoped>

.item {
  margin-right: 24px;
  color: #808792;
  position: relative;
  margin-bottom: 0;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  .tips {
    display: none;
    position: absolute;
    width: 48px;
    top: 36px;
    left: -4px;
    height: 28px;
    line-height: 28px;
    padding: 0 12px;
    background: #000f25;
    margin-top: -10px;
    margin-left: 5px;
    color: #fff;
    font-size: 12px;
    border-radius: 4px;
    text-align: center;
    z-index: 1;
  }
  &:hover {
    color: #404b5c;
    .tips {
      display: block;
    }
  }
  :deep(.taskbar-badge){
    height:24px !important;
    display: flex;
    align-items: center;
  }
}

</style>
<style lang="scss">
.pageSetting-drawer-item .el-form-item__content{
  justify-content: flex-end;
}
.yun-header-menu{
  > .r {
    > .el-button {
      margin-right: 16px
    }
  }
}
</style>
