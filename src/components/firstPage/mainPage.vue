<template>
  <div>
 <a-row   >
      <a-col style="border: 1px solid black; text-align: center;  height: 230px;" :span="8">
        <div  style="width: 90%;   height: 100%; margin: 1px auto;">
          <div id="citybar" style="width: 100%; height: 100%;"></div>
        </div>
      </a-col>
      <a-col style="border: 1px solid black;  height: 230px;" :span="8">
        <div style="width: 90%; margin:1px auto; height: 100%;">
          <div id="voltagebar" style="width:100%; height: 100%;"></div>
        </div>
      </a-col>
      <a-col style="border: 1px solid black; height: 230px;" :span="8">
        <div style="width: 85%;  height: 100%;  margin: 1px auto;" >
          <div id="substationLine" style="width: 100%;  height: 100%; "></div>
        </div>
      </a-col>
    </a-row> 
    <!-- 引入图标的数据 -->
    <a-row>
      <a-col style="border: 1px solid black; height: 230px;" :span="8">
        <div style="width: 90%;  height: 100%; margin: 1px auto;">
          <div id="defectpie" style="width: 100%;  height: 100%;"></div>
        </div>
      </a-col>
      <a-col style="border: 1px solid black; height: 230px;" :span="8">
        <div style="width: 90%; height: 100%; margin: 1px auto;">
          <div id="equipmentpie" style="width: 100%;  height: 100%;"></div>
        </div>
      </a-col>
      <a-col style="border: 1px solid black; height: 230px;" :span="8">
        <div style="width: 90%; margin: 1px auto;  height: 100%;">
          <div id="typebar"  style="width: 100%;  height: 100%;"></div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
//    import moment from "moment";
//    import "moment/locale/zh-cn";
// import { EleResize } from "../../../../esresize.js";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
export default {
  name: "mainPage",
  data() {
    return {
        //   moment,
      locale,
      //----------江苏省各市任务量与缺陷量统计-------
      cityBar: {
        title: {
          text: "江苏省各市任务量与缺陷量统计",
          textStyle: {
            fontSize: "10px",
          },
        },
        color: ["#36cec9", "#ffc53d"],
        tooltip: {},
        legend: {
          left: "70%",
          data: ["任务量", "缺陷量"],
        },
        xAxis: {
          data: ["南京市", "苏州市"],
          axisLine: {},
          axisTick: {
            //---坐标轴 刻度
            show: true, //---是否显示
            inside: true, //---是否朝内
            lengt: 3, //---长度
            lineStyle: {
              //color:'red',			//---默认取轴线的颜色
              width: 1,
              type: "solid",
            },
          },
        },
        yAxis: {
          type: "value",
          // data: [0,6,12,18,24, 30, ],
        },
        grid: {
          // left: "4%",
           right: "4%",
          top: "30%",
          bottom: "8%",
          containLabel: true,
        },
        series: [
          {
            name: "任务量",
            type: "bar", //设置图表主题
            data: [2, 27],
            barWidth: 3,
          },
          {
            name: "缺陷量",
            type: "bar", //设置图表主题
            data: [0, 4],
            barWidth: 3,
          },
        ],
      },
      //---------不同电压等级任务量与缺陷量统计--------
      voltageBar: {
        title: {
          text: "不同电压等级任务量与缺陷量统计",
          textStyle: {
            fontSize: "10px",
          },
        },
        color: ["#36cec9", "#ffc53d"],
        tooltip: {},
        legend: {
          left: "70%",
          data: ["任务量", "缺陷量"],
        },
        grid: {
           right: "4%",
          top: "30%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: {
          data: ["500KV"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "任务量",
            type: "bar", //设置图表主题
            data: [5],
            barWidth: 3,
          },
          {
            name: "缺陷量",
            type: "bar", //设置图表主题
            data: [26],
            barWidth: 3,
          },
        ],
      },
      //变电站任务量与缺陷量统计
      substationLine: {
        title: {
          text: "变电站任务量与缺陷量统计",
          textStyle: {
            fontSize: "10px",
          },
        },
        color: ["#36cec9", "#ffc53d"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: "70%",
          data: ["任务量", "缺陷量"],
        },
        grid: {
         right: "4%",
          // right: "5%",
          top: "30%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2020-01",
            "020-02",
            "020-03",
            "020-04",
            "020-05",
            "020-06",
            "020-07",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "任务量",
            type: "line",
            stack: "总量",
            data: [15, 12, 9, 18, 19, 26, 24],
          },
          {
            name: "缺陷量",
            type: "line",
            stack: "总量",
            data: [8, 6, 4, 9, 10, 17, 14],
          },
        ],
      },
      //缺陷性质占比
      defectpie: {
        title: {
          text: "缺陷性质占比",
          textStyle: {
            fontSize: "5px",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          left: "60%",
          data: ["危机缺陷", "严重缺陷", "一般缺陷"],
        },
        grid: {
           left: "3%",
          // right: "5%",
          top: "30%",
          bottom: "4%",
          containLabel: true,
        },
        series: [
          {
            type: "pie",
            radius: ["20%", "40%"],

            label: {
              formatter: "{per|{d}%}  ",

              borderWidth: 1,
              borderRadius: 1,

              rich: {
                per: {
                  padding: [1, 1],
                  borderRadius: 2,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "5",
                fontWeight: "bold",
              },
            },
            labelLine: {},
            data: [
              { value: 335, name: "危机缺陷" },
              { value: 310, name: "严重缺陷" },
              { value: 234, name: "一般缺陷" },
            ],
          },
        ],
      },
      //缺陷设备占比

      equipmentpie: {
        title: {
          text: "缺陷设备占比",
          textStyle: {
            fontSize: "10px",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "60%",

          data: ["无缺陷设备", "缺陷设备"],
        },
        grid: {
          left:"3%",
          top: "30%",
          bottom: "4%",
          containLabel: true,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "40%",
            center: ["50%", "50%"],
            label: {
              formatter: "{per|{d}%}  ",

              borderWidth: 1,
              borderRadius: 4,

              rich: {
                per: {
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
            data: [
              { value: 234, name: "无缺陷设备" },
              { value: 25, name: "缺陷设备" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },

      //设备缺陷类型统计
      typebar: {
        title: {
          text: "设备缺陷类型统计",
          textStyle: {
            fontSize: "10px",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        // 图例
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 1,
          top: 20,
          data: [
            {
              name: "表面破损",
              icon: "circle",
              textStyle: {
                fontSize: "5px",
              },
            },
            {
              name: "尖端放电",
              icon: "circle",
              textStyle: {
                fontSize: "5px",
              },
            },
            {
              name: "均压不当",
              icon: "circle",
              textStyle: {
                fontSize: "5px",
              },
            },
            {
              name: "瓷套裂纹",
              icon: "circle",
              textStyle: {
                fontSize: "5px",
              },
            },
            {
              name: "表面污秽",
              icon: "circle",
              textStyle: {
                fontSize: "5px",
              },
            },
            {
              name: "其他",
              icon: "circle",
              textStyle: {
                fontSize: "5px",
              },
            },
          ],
        },
        // 格子
        grid: {
          left: "2%",
          right: "30%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: {
          name: "数量",
          type: "value",
        },
        yAxis: {
          name: "月份",
          type: "category",
          data: ["2020-04"],
        },
        series: [
          {
            name: "表面破损",
            type: "bar",
            barWidth: 10,
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [13],
          },
          {
            name: "尖端放电",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [10],
          },
          {
            name: "均压不当",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [4],
          },
          {
            name: "瓷套裂纹",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [2],
          },
          {
            name: "表面污秽",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [2],
          },
          {
            name: "其他",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [1],
          },
        ],
      },
    };
  },
  // 页面载入时就转入该函数
   mounted: function () {
     //设置一个定时器来刷新图形的绘制
     setTimeout(() =>{
       this.drawLine();
     },100)
   },
  methods: {
    drawLine: function () {
      //基于准备好的DOM，初始化echarts实例
      let  citybar = this.$echarts.init(
        document.getElementById("citybar")
      );
      //绘制图表
      citybar.setOption(this.cityBar);

      // 开始绘制第二个柱状图标
      let voltagebar = this.$echarts.init(
        document.getElementById("voltagebar")
      );
      //绘制图表
      voltagebar.setOption(this.voltageBar);

      // 开始绘制第三个柱状图标
      let substationline = this.$echarts.init(
        document.getElementById("substationLine")
      );
      //绘制图表
      substationline.setOption(this.substationLine);
      // 开始绘制第四个空心饼状图图标
      let defectpie = this.$echarts.init(document.getElementById("defectpie"));
      //绘制图表
      defectpie.setOption(this.defectpie);
      // 开始绘制第五个实心饼状图
      let equipmentpie = this.$echarts.init(
        document.getElementById("equipmentpie")
      );
      //绘制图表
      equipmentpie.setOption(this.equipmentpie);
      // 开始绘制第六个柱状图
      let typebar = this.$echarts.init(document.getElementById("typebar"));
      //绘制图表
      typebar.setOption(this.typebar);
    },
  },
  
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>