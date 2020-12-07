<template>
  <div>
    <a-row type="flex"
           justify="start"
           align="middle"
           class="search">
      <a-col >
        <a-input-search
          placeholder="按照缺陷设备进行搜索"
          enter-button
          @search="onSearchByDeviceType" />
      </a-col>
      <a-col>
        <a-dropdown>
          <a-menu slot="overlay" @click="switchSortWay">
            <a-menu-item key="0"> <a-icon type="right" />{{sortWay[0]}}</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px"> {{currentWay}} <a-icon type="down" /> </a-button>
        </a-dropdown>
      </a-col>
      <a-col style="margin-left: 8px">
        <a-button-group>
          <a-button @click="refreshThisPage" type="primary">
            刷新
          </a-button>
          <a-badge :count="waitConfirmFlawNumber" title="待确认缺陷">
            <a-button  @click="toWaitConfirmFlaw" :count="5">
              待确认缺陷
            </a-button>
          </a-badge>

        </a-button-group>
      </a-col>
    </a-row>
    <a-table
      style="margin-top: 8px"
       :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :rowKey="(record) => record.id"
      :columns="columns"
      :data-source="data"
      :pagination="false"
    >
    <span slot="num" slot-scope="text, record, index">
        {{
          (pageInfo.current - 1)* pageInfo.size+ parseInt(index) + 1
        }}
      </span>
       <span slot="type" slot-scope="text">
     {{ text==1? "普通设备":"待检入设备"}}
    </span>
      <span slot="action" slot-scope="text, record,index">
      <a @click="viewItem(index)">详情</a>
    </span>
    </a-table>
    <a-pagination
      style="margin-top: 8px"
      align="end"
      :defaultCurrent=1
      :defaultPageSize=10
      @change="simplePageChange"
      v-model="pageInfo.current"
      :total="pageInfo.total"
      show-less-items />
  </div>
</template>

<script>

import Diag from "../../netapi/diag.js";

const columns = [
  {
    title:'序号',
    dataIndex: 'num',
     scopedSlots: { customRender: 'num' },
  },
  {
    title: '缺陷设备',
    dataIndex: 'flawDevice',
  },
  {
    title: '设备种类',
    dataIndex: 'type',
     scopedSlots: { customRender: 'type' },
  },
  {
    title: '缺陷描述',
    dataIndex: 'flawDesp',
  },
  {
    title: '管理',
    key:'id',
    scopedSlots: { customRender: 'action' },
  },
];

export default {
  name: "flawShow",
  data(){
    return{
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      data:[],
      pageInfo:{
        current:1,
        size:10,
        total:50,
      },
      currentWay:"默认排序",
      sortWay:[
        "默认排序",
      ],
      waitConfirmFlawNumber:0,
    }
  },
  methods:{
    viewItem(index){
      // 查看详情 跳转到任务组完成详情界面 todo
      var id = this.data[index].id;
      this.$router.push({
        path: "/flawDetail",
        query: {
          id: id
        }
      });
    },
    onSearchByDeviceType(value){

    },
    simplePageChange(page,pagesize){
      Diag.getFlawPage({
        page: page,
        size: pagesize
      }).then(data=>{
        // console.log(data);
        if (data.code==="200"){
          // console.log(data);
          // 循环执行生成对象
          let result=JSON.parse(data.result);
          // 拼接分页对象
          this.stringPageInfo(result);
          // 抽取实际数组组合
         this.data=result.list;
        }else{
          this.$message.info(data.message)
        }
      }).catch(err=>{
        this.$message.error(this.NETWORK_ERROR_MESSAGE);
        console.log(err)
      })
    },
    /**
     * 拼接分页对象
     * @param result
     */
    stringPageInfo(result){
      this.pageInfo.current=result.pageNum;
      this.pageInfo.size=result.pageSize;
      this.pageInfo.total=result.total;
    },
    /**
     * 切换任务排序方式
     * @param way 排序方式
     */
    switchSortWay(way){
      this.currentWay=this.sortWay[way.key];
    },
    /**
     * 刷新这个页面
     */
    refreshThisPage(){
      this.simplePageChange(1,10)
      this.selectedRowKeys = [];
    },
    /**
     * 获取被选择的缺陷信息 
     **/
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      // console.log(this.selectedRowKeys);
    },
    /**
     * 获取待确认缺陷
     **/
    getMyWaitConfirmFlawNumber(){
      this.waitConfirmFlawNumber=5;
    },
    /**
     * 等待确认缺陷
     */
    toWaitConfirmFlaw(){
         var t = this;
      for (var i = 0; i <this.selectedRowKeys.length ; i++){
       var x = this.selectedRowKeys[i];
       var flawId = this.data[x].id; 
       Diag.confirmFlaw({
          flawId: flawId,
        }).then((r) => {
          this. refreshThisPage();
          //  console.log(r);
        });
    }}

  },
  created() {
    // 进入此页面即获取页面数据
    this.simplePageChange(this.pageInfo.current,this.pageInfo.size)
  }
}
</script>

<style scoped>

</style>
