<template>
  <yun-taskbar>
    <yun-taskpanel
      ref="panel"
      :remote-method="remoteMethod"
      :action="action"
    />
  </yun-taskbar>
  <yun-excel-edit
    ref="excelEdit"
    title="入库单导入"
    :columns="columns"
    :table-data="tableData"
    @submit="submit"
  />
</template>
<script>
import { reactive, toRefs } from 'vue';
import { YunTask } from '@ylz-material/task';
import { mockData, tableData, columns } from './taskMockData';

export default {
  name: 'TaskMenu',
  setup() {
    const edit = reactive({
      tableData: [],
      editIndex: 0,
      excelEdit: null,
    });
    const open = (index) => {
      edit.tableData = tableData;
      edit.editIndex = index;
      edit.excelEdit.show();
    };

    const submit = () => {
      const curData = mockData[edit.editIndex];
      if (curData) {
        curData.progress = 0;
        curData.statet = 'DOING';
      }
      YunTask.pushEvent('import');
      edit.excelEdit.hide();
    };
    const task = reactive({
      action: {
        import: (scope) => {
          if (scope.row?.state === 'SUCCESS') {
            return [
              {
                label: '导入按钮',
              },
            ];
          }
          if (scope.row?.state === 'FAIL') {
            return [
              {
                label: '修改数据重新导入',
                handler: (row, index) => {
                  open(index);
                },
              },
            ];
          }
          return [];
        },
        export: () => [
          {
            label: '导出按钮',
            handler: (row) => {
              console.log('row', row);
            },
          },
        ],
      },
      remoteMethod: {
        import: () => new Promise((resolve) => {
          setTimeout(() => {
            if (mockData[0]) {
              mockData[0].progress += 0.5;
              if (mockData[0].progress >= 1) {
                mockData[0].state = Math.random() > 0.5 ? 'FAIL' : 'SUCCESS';
              } else {
                mockData[0].state = 'DOING';
              }
            }
            resolve(mockData);
          }, 2000);
        }),
        export: () => new Promise((resolve) => {
          setTimeout(() => {
            resolve([]);
          }, 2000);
        }),
      },
    });

    return {
      ...toRefs(task),
      ...toRefs(edit),
      columns,
      submit,
    };
  },
};
</script>
