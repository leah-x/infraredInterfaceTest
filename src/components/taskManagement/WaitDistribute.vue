<template>
  <div>
    <!--  -->
    <a-row type="flex" justify="start" align="middle" style="height: 48px">
      <a-col style="height: 100%" :span="6">
        <a-upload
          name="file"
          :multiple="true"
          :showUploadList="false"
         
          :customRequest="uploadImage"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        > 
        <!-- @change="handleChange" -->
          <a-button size="small" > <a-icon type="upload" />选择图片 </a-button>
        </a-upload>
      </a-col>
      <a-col style="height: 100%" :span="6">
        <a-button style="width: 30%" size="small" type="primary">
          上传
        </a-button>
      </a-col>
      <a-col :span="6"> </a-col>
      <a-col style="height: 100%" :span="6">
        <a-button style="width: 30%" type="primary" size="small">
          删除
        </a-button>
      </a-col>
    </a-row>
    <!----- 任务组的表格 ----->
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="data"
      show-overflow-tooltip
      :customRow="customRow"
    >
      <!-- 钩子函数 -->
      <span slot="state" slot-scope="text">
        <a-tag :color="text == 1 ? 'red' : 'green'">
          {{ text == 1 ? "无效" : "有效" }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="showDrawer">详情</a>
        <a-divider type="vertical" />
        <!-- <a @click="distributeTask(record.key,record.taskName)">派发</a> -->
        <!-- <a-divider type="vertical" /> -->
        <a @click="deleteItem(record.key)">删除</a>
      </span>
    </a-table>
    <!-- 派发任务对话框  -->
    <a-modal
      v-model="distributeVisible"
      title="派发任务"
      ok-text="派发"
      cancel-text="取消"
      @ok="distributeTaskConfirm"
    >
      <a-form-model :model="distributeTaskData">
        <a-form-model-item label="任务名">
          <a-input v-model="distributeTaskData.taskName" />
        </a-form-model-item>
        <a-form-model-item label="执行人">
          <a-select
            v-model="distributeTaskData.executeUser"
            placeholder="请选择执行人"
          >
            <a-select-option value="200"> 张三 </a-select-option>
            <a-select-option value="300"> 李四 </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!--   设置抽屉的样式  :closable="false"  -->
    <a-drawer
      title="任务详情"
      placement="right"
      :visible="visible"
      width="50%"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-form-model
        style="width: 100%"
        :model="diagResults"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="所属任务">
          <a-input v-model="diagResults.belongTask" :disabled="disabled" />
        </a-form-model-item>
        <a-form-model-item label="照片状态">
          <a-tag
            :disabled="disabled"
            style="width: 100%"
            :color="diagResults.diagResult == 1 ? 'green' : 'volcano'"
          >
            {{ diagResults.diagResult == 1 ? "正常" : "异常" }}
          </a-tag>
        </a-form-model-item>
        <a-list
          :grid="{ gutter: 16 }"
          :data-source="diagResults.parts"
          justify="space-around"
          style="margin: 16px"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card :title="item.partLocation">
              <a-row type="flex" justify="space-around">
                <a-col justify="space-around">
                  <a-col style="margin-bottom: 16px">
                    {{ item.detection_distance }}</a-col
                  >
                  <a-avatar shape="square" :size="220" :src="item.picture" />
                </a-col>
                <a-col>
                  <a-col style="margin-bottom: 16px">{{ item.remark }}</a-col>
                  <a-avatar shape="square" :size="220" :src="item.redPicture" />
                </a-col>
              </a-row>
            </a-card>
          </a-list-item>
        </a-list>
      </a-form-model>
    </a-drawer>
  </div>
</template>

<script>
const taskGroupColumns = [
  {
    title: "序号",
    dataIndex: "index",
  },
  {
    title: "任务组名",
    dataIndex: "groupName",
  },
  {
    title: "备注",
    dataIndex: "remark",
  },
  {
    title: "管理",
    key: "Action",
    scopedSlots: { customRender: "action" },
  },
];

const columns = [
  {
    title: "序号",
    dataIndex: "index",
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
    title: "检测单位",
    dataIndex: "DCompany",
  },
  {
    title: "检测站所",
    dataIndex: "DStation",
  },
  {
    title: "电压等级",
    dataIndex: "Elevel",
  },
  {
    title: "状态",
    dataIndex: "state",
    scopedSlots: { customRender: "state" },
  },
  {
    title: "管理",
    key: "Action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [];
for (let i = 1; i < 15; i++) {
  data.push({
    key: i.toString(),
    index: i.toString(),
    belongTaskGroup: `上海蔡伦站检测任务`,
    taskName: `第${i}个需要执行的任务`,
    DCompany: "上海第三检测所",
    DStation: "蔡伦站",
    Elevel: `500KV`,
    state: `${i % 3 == 0 ? 1 : 2}`,
    remark: "",
  });
}

const groupData = [];
for (let i = 1; i < 16; i++) {
  groupData.push({
    key: i.toString(),
    index: i.toString(),
    groupName: `20200916上海蔡伦站检测任务组`,
    taskName: `第${i}个需要执行的任务`,
    remark: "上海第三检测所,检测任务合集",
  });
}

export default {
  name: "CreateTask",
  data() {
    return {
      data,
      columns,
      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      ids: [],
      groupTaskVisible: false,
      groupTaskViewVisible: false,
      distributeVisible: false,
      fileList:[],
      group: {
        groupName: "",
        remark: "",
      },
      taskGroupColumns,
      groupData,
      distributeTaskData: {
        taskName: "",
        executeUser: "",
      },
      disabled: true,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      diagResults: {
        belongTask: "上海市第9个检测任务",
        diagResult: 2,
        generateDate: new Date().toLocaleString(),
        autoAdvice: "建议近期增加检测频率，减少事故发生",
        parts: [
          {
            picture: "https://www.duanlingui.xin/link/picture.jpg",
            redPicture: "https://www.duanlingui.xin/link/redpicture.jpg",
          },
          {
            picture: "https://www.duanlingui.xin/link/picture.jpg",
            redPicture: "https://www.duanlingui.xin/link/redpicture.jpg",
          },
        ],
        // remark:'这是一串长长的任务备注，用以显示额外信息'
      },
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    //设置抽屉的可见性
    afterVisibleChange(val) {
      // console.log('visible', val);
    },

    customRow(record, index) {
      return {
        on: {
          click: (event) => {
            this.visible = true;
            //  console.log('messege');
            // console.log('-------------------------');
            // console.log(index);
          },
        },
      };
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    handleChange(info) {
      this.fileList = info.fileList;
      const status = info.file.status; //如果已经上传完就获取已经上传的文件
      // console.log(info.fileList.length);
      if (status !== "uploading") {
        console.log(info.file);
        console.log(info.fileList);
      }
    },

    //长传头像前校验
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("只能上传jpg/png格式的头像!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片不得大于2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    //上传照片列表
    uploadImage(file) {
      this.avatarLoading = true;
      const formData = new FormData();
      // console.log(this.fileList);
        console.log( file.file);
      formData.append("file", file.file);
      // console.log( file);
      // api.upload(formData).then(
      //   (res) => {
      //     if (res) {
      //       this.imageUrl = res.data.data.link;
      //       this.saveAvatar(); // 保存新头像
      //       this.avatarLoading = false;
      //     }
      //   },
      //   (err) => {
      //     this.avatarLoading = false;
      //   }
      // );
    },
    //反馈已经被选择到的数据项
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    createGroupTask() {
      this.groupTaskVisible = true;
    },
    createGroupTaskConfirm() {
      this.$message.info("创建成功！");
      this.groupTaskVisible = false;
    },

    deleteItem(id) {
      const par = this;
      this.$confirm({
        title: "确认删除这个任务?",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          //  const dataSource = [...par.dataSource];
          //  this.dataSource = dataSource.filter((item) => item.id !== id);
          par.$message.success("删除任务" + id + "成功。");
        },
        onCancel() {
          par.$message.error("删除失败！");
        },
      });
    },

    //载入数据
    refresh(){
       this.userId = this.$cookies.get("loginId");
        this.pagination.current = 1;
        
    },
    distributeTask(id, taskName) {
      this.distributeVisible = true;
      this.distributeTaskData.taskName = taskName;
    },
    showTaskGroup() {
      this.groupTaskViewVisible = true;
    },
    distributeTaskConfirm() {
      this.$message.info("派发成功！");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
