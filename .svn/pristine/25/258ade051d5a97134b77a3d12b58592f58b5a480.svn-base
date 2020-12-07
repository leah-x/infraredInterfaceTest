<template>
  <div>
    <a-row type="flex" justify="start" align="middle" style="height: 48px">
      <a-col style="height: 100%" :span="2">
        <span style="color: black; float: left" @click="goBack">
          <a-icon type="left" />返回上层
        </span>
       
      </a-col>
       <a-col :span="8">
         <a-input-search
          placeholder="按照任务名搜索"
          enter-button
          @search="onSearchByTaskGroupName"
        />
      </a-col>
    </a-row>
    <!----- 任务组的表格 ----->
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :rowKey="(record) => record.id"
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      show-overflow-tooltip
    >
      <span slot="num" slot-scope="text, record, index">
        {{
          (pagination.current - 1) * pagination.pageSize + parseInt(index) + 1
        }}
      </span>
       <span slot="groupName"  >
       {{group.groupName}}
      </span>
      <span slot="action" slot-scope="text, record, index">
        <a @click="goTaskDiagDetail(index)">详情</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import Task from "../../netapi/task"
import loginVue from '../login.vue';
const columns = [
  {
    title: "序号",
    dataIndex: "num",
    scopedSlots: { customRender: "num" },
  },
  {
    title: "所属任务组",
    dataIndex: "groupName",
     scopedSlots: { customRender: "groupName" },
  },
  {
    title: "任务名",
    dataIndex: "taskName",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "管理",
    key: "Action",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  name: "groupDetail",

  data() {
    return {
      dataSource: [], //数据源
      columns,
      pagination: {},
      selectedRowKeys: [], // Check here to configure the default column
      taskId: "",
      TaskName: "",
      group: {
        groupName: "",
        remark: "",
      },
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
      /**
     **返回上一层的路由
     *
     **/
    goBack() {
      this.$router.go(-1);
    },
        //反馈已经被选择到的数据项
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      // console.log(this.selectedRowKeys);
    },
      /**
     * 根据报告名进行搜索
     * @param value 搜索字符
     **/
    onSearchByTaskGroupName(value) {},
    
    //载入数据
    refresh() {

      var taskGroupId = this.$route.query.groupId;
    //   console.log(taskGroupId);
      var userId = this.$cookies.get("loginId");
      this.pagination.current = 1;
      Task.getTaskPageG({
        userId: userId,
        groupId: taskGroupId,
        state: -1,
      }).then((r) => {
        // console.log(r);
        var js = JSON.parse(r.result);
        // console.log(js.list);
        for (var i = 0; i < js.list.length; i++) {
          // console.log( js.list[i].belongTaskGroup);
          this.getGroup(js.list[i].belongTaskGroup);
        }

        // 这里得到的数据就只有10个
        const pagination = { ...this.pagination }; //重新定义获取新的页面
        //  console.log(js);
        // 读取总的数据量是12个
        pagination.total = js.total;
        pagination.pageSize = js.pageSize;
        this.loading = false;
        this.dataSource = js.list; //把数据装进table里面
        // console.log(js.list);
        this.pagination = pagination; //获取
        this. selectedRowKeys = [];   //每次刷新清空被选择的数据项
      });
    },
    //  获取任务的信息
    getGroup(id) {
      Task.getTaskGroupByIdG({
        groupId: id,
      }).then((r) => {
        // console.log(r);
        var js = JSON.parse(r.result);
        this.group.groupName = js.groupName;
      });
    },
    /**
     * 
     *跳转到任务细节 
     **/
    goTaskDiagDetail(index){
    var id = this.dataSource[index].id;
     this.$router.push({
         path:'/taskDiagDetail',
         query:{
             taskId:id
             }
       });
    },
  },
};
</script>

<style>
</style>