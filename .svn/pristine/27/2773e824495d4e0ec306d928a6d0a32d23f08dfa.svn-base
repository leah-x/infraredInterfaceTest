<template>
  <div>
    <a-row type="flex" justify="start" align="middle" style="height: 48px">
      <a-col style="height: 100%" :span="2">
        <span style="color: black; float: left" @click="goBack">
          <a-icon type="left" />返回上层
        </span>
      </a-col>
    </a-row>
    <a-row>
      <a-descriptions
        style="background: white"
        bordered
        v-if="diag"
        title="诊断详情"
      >
        <a-descriptions-item :span="2" label="任务名称">
          {{ diag.taskDiag.taskName }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="设备名称">
          {{ diag.taskDiag.deviceName }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="检测起点">
          {{ diag.taskDiag.startPoint }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="检测终点">
          {{ diag.taskDiag.endPoint }}
        </a-descriptions-item>
        <a-descriptions-item :span="3" label="设备型号">
          {{ diag.taskDiag.model }}
        </a-descriptions-item>
        <a-descriptions-item :span="3" label="处理建议">
          {{ diag.taskDiag.autoSuggest }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="最高温">
          {{ diag.points[0].value }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="最高温点坐标">
          ( {{ diag.points[0].startx }} , {{ diag.points[0].starty }})
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="最低温">
          {{ diag.points[1].value }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="最低温点坐标">
          ( {{ diag.points[1].startx }} , {{ diag.points[0].starty }})
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="平均温">
          {{ diag.points[2].value }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="平均温点坐标">
          ( {{ diag.points[2].startx }} , {{ diag.points[0].starty }})
        </a-descriptions-item>
        <a-descriptions-item :span="3" label="诊断图">
          <a-avatar shape="square" :size="200" :src="diag.resultPicture" />
        </a-descriptions-item>
      </a-descriptions>
    </a-row>
    <a-row type="flex" justify="start" align="middle" style="height: 48px">
      <a-col style="margin-top:5px;" :span="24">
        <a-button
          type="primary"
          :disabled="disabled"
          @click="createReport"
        >
         确认并生成报告
        </a-button>
        <a-button
          type="primary"
          :disabled="disabled"
        >
         修改信息
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Diag from "../../netapi/diag";
import Report from "../../netapi/report"
export default {
  name: "taskDiagDetail",
  data() {
    return {
      id: null,
      diag: null,
      disabled:true,
    };
  },
  methods: {
    /**
     **返回上一层的路由
     *
     **/
    goBack() {
      this.$router.go(-1);
    },
    /**
     * 根据id任务诊断结果
     * @param id
     */
    getFlawById(id) {
      Diag.getTaskDiagByTaskId({
        taskId: id,
      })
        .then((data) => {
          if (data.code === "200") {
            // 直接获取对象
            this.diag = JSON.parse(data.result);
            console.log(this.diag);
            // fixme 图片暂时使用固定的地址
             this.diag.resultPicture = "http://81.68.252.160:8081/static/auto2.png";
          } else {
            this.$message.info(data.message);
          }
        })
        .catch((err) => {
          this.$message.error(this.NETWORK_ERROR_MESSAGE);
          console.log(err);
        });
    },
    /**
     * 判断该任务是否已经生成报告
     **/
   getReportByTaskId(id){
     
     Report.getReportByTaskId({
         taskId:id,
     }).then(r=>{
         if(r.result == null){
             this.disabled =false;
         }
     })
   },
    /**
     * 接收id参数并获取对应缺陷
     */
    receiveIdAndGetFlaw() {
      this.id = this.$route.query.taskId;
      this.getFlawById(this.id);
      this.getReportByTaskId(this.id);
    },
    /**
     * 确认并生成报告
     * */
    createReport(){
        var t = this;
        var userId = this.$cookies.get("loginId")
        var id = this.$route.query.taskId;
        Report.createReportById({
            userId:userId,
            id:id,
        }).then(r=>{
            if(r.code == 200){
          t.$message.success("报告生成成功");
            }else{
         t.$message.error("报告生成失败"+r.message);  
            } 
            t.receiveIdAndGetFlaw();
        })
    }
  },
  beforeMount() {
    this.receiveIdAndGetFlaw();
  },
};
</script>

<style>
</style>