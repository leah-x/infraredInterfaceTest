<template>
  <div>
    <a-row type="flex" justify="space-between" align="middle" class="search">
      <a-col :span="6">
        <a-input-search
          style="width: 80%; margin-left: -20%"
          size="small"
          placeholder="按照任务名搜索"
          enter-button
          @search="onSearchByTaskName"
        />
      </a-col>
      <a-col :span="6">
        <a-input-search
          style="width: 80%; margin-left: -10%"
          size="small"
          placeholder="按照任务组搜索"
          enter-button
          @search="onSearchByTaskGroupName"
        />
      </a-col>
      <a-col :span="6">
        <a-date-picker
          style="width: 80%; margin-right: -10%"
          size="small"
          placeholder="搜索这个时间点后的任务"
          @change="onDateAfterSearch"
        />
      </a-col>
      <a-col :span="6">
        <a-date-picker
          style="width: 80%; margin-right: -20%"
          size="small"
          placeholder="搜索这个时间点前的任务"
          @change="onDateBeforeSearch"
        />
      </a-col>
    </a-row>
    <a-table
      style="margin-top: 10px"
      :columns="columns"
      :rowKey="(record) => record.id"
      :data-source="dataSource"
      :pagination="pagination"
      size="small"
    >
     <span slot="num" slot-scope="text, record, index">
        {{
          (pagination.current - 1) * pagination.pageSize + parseInt(index) + 1
        }}
      </span>
       <span slot="taskState" slot-scope="text">
        <a-tag :color="text ==3 ?  'green':'red' ">
          {{ text == 3 ? "已完成" : "有效" }}
        </a-tag>
      </span>
      <!-- , index -->
      <span slot="action" slot-scope="text, record">
        <a @click="viewItem(record.key)">详情</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import Task from "../../netapi/task";
const columns = [
  {
    title: "序号",
    dataIndex: "num",
     scopedSlots: { customRender: "num" },
  },
  {
    title: "所属任务组",
    dataIndex: "belongTaskGroup",
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
    title: "状态",
    dataIndex: "taskState",
    scopedSlots: { customRender: "taskState" },
  },
  {
    title: "管理",
    key: "Action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "DoneTask",
  data() {
    return {
      columns,
      dataSource: [], //数据源
      pagination: {},
    };
  },
   mounted() {
    this.refresh();
  },
  methods: {
    viewItem(id) {
      this.$router.push({
        path: "/DoneTaskDetail",
        query: id,
      });
    },
    //刷新整个页面
    refresh() {
      var userId = this.$cookies.get("loginId");
      this.pagination.current = 1;
      Task.getTaskPageG({
        userId: userId,
        state: 3,
      }).then((r) => {
        // console.log(r);
        var js = JSON.parse(r.result);
        // console.log(js.list);
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
        // console.log(this.pagination);
      });
    },
    onSearchByTaskName(value) {},
    onSearchByTaskGroupName(value) {},
    onDateAfterSearch(date) {},
    onDateBeforeSearch(date) {},
  },
};
</script>

<style scoped>
</style>
