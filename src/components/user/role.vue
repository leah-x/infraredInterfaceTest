<template>
  <div>
    <a-row type="flex" justify="start" style="margin-bottom: 1%">
        <a-button
          @click="showRoleModal"
          type="primary"
        >
          添加角色
        </a-button>
        <a-modal
          v-model="roleVisible"
          title="添加角色"
          cancelText="取消"
          okText="确认"
          @ok="addRole"
        >
          <a-form-model v-bind="layout">
            <a-tooltip placement="top" title="角色名不能重复">
              <a-form-model-item has-feedback label="角色名">
                <a-input v-model="roleName" autocomplete="off" />
              </a-form-model-item>
            </a-tooltip>
          </a-form-model> </a-modal
      >
     
    </a-row>

    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      size="small"
      :rowKey="(record) => record.id"
      :bordered="true"
    >
      <span slot="sum" slot-scope="text, record, index">
        {{
          (pagination.current - 1) * pagination.pageSize + parseInt(index) + 1
        }}
      </span>
      <span slot="roleName" slot-scope="text">
        <label> {{ text }} </label>
      </span>
      <!-- @change="handleTableChange" -->
      <!-- 钩子函数 :rowKey='rowKey' 可以用slot-scope来获得每一行的index,可以以此来  -->
      <!--setPermissions(record, index)  <a-tag color="red">设置权限</a-tag>-->
      <span slot="perms" slot-scope="text, record, index">
        <!-- 用下拉框的形式来设置用户的权限 -->
        <a-select
          mode="multiple"
          placeholder="Inserted are removed"
          style="width: 100%"
          :default-value="defaultPrem(index)"
          @change="changePrem"
          @dropdownVisibleChange="changeIndex(index)"
        >
          <!-- -->
          <!-- :value="defaultPremItem" index,-->
          <a-select-option
            v-for="item in allPremItem"
            :key="item.id"
            :value="item.permName"
          >
            {{ item.permName }}
          </a-select-option>
        </a-select>
      </span>

      <span slot="Action" slot-scope="text, record, index">
        <a-button size="small" type="danger" @click="deleteRole(record, index)">
          {{ (text = "删除") }}
        </a-button>
      </span>
    </a-table>
    <!--  设置权限弹出框  -->
  
  </div>
</template>

<script>
import user from "../../netapi/user";
const columns = [
  {
    title: "序号",
    dataIndex: "sum",
    scopedSlots: { customRender: "sum" },
  },
  {
    title: "登录名",
    dataIndex: "roleName",
    scopedSlots: { customRender: "roleName" },
  },
  {
    title: "权限",
    dataIndex: "perms",
    scopedSlots: { customRender: "perms" },
  },
  {
    title: "管理",
    key: "Action",
    scopedSlots: { customRender: "Action" },
  },
];

export default {
  name: "role",
  data() {
    return {
      columns,
      pagination: {},
      dataSource: [],
      loading: false,
      visible: false,
      // mockData: [], //穿梭框的数据源
      targetKeys: [],
      currentId: {},
      premId: [],
      defaultPremItem: [], //角色已有权限
      allPremItem: [],
      roleName: "",
      roleVisible: false,
      seleId: "",
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  //页面加载的时候就开始获取数据
  mounted() {
    //拿到穿梭框里的数据
    this.refresh();
    //拿到已有的所有权限
    this.allprem();
  },
  //在数据加载后进行的函数
  updated() {
    this.defaultPrem();
  },
  //页面加载的时候就过滤数据，将已经被选中的数据过滤掉
  computed: {
    // filteredOptions() {
    //   return allPremItem.filter((o) => !this.defaultPremItem.includes(o));
    // },
  },
  methods: {
    //显示添加角色的框
    showRoleModal() {
      this.roleVisible = true;
    },
    //添加角色
    addRole() {
      var t = this;
      this.roleVisible = false;
      //将数据添加到表格里面
      user.addRoleG( {
          roleName: this.roleName,
        }).then( (r) => {
          // console.log(r.code);
          if (r.code == 200) {
            t.$message.success("角色添加成功");
            t.refresh();
          } else if (r.code == "") {
            // console.log(r.message);
            t.$message.error("角色添加失败");
          }
        })
    },
    // //找出每个角色已有的权限
    defaultPrem(index) {
      var defaultPremItem = [];
      var t = this;
      var i = 0;
      // 得到每组数据源的id号
      if (index != undefined) {
        var newId = this.dataSource[index].id;
      } else {
        return;
      }
      //  利用每个角色的id的到该角色所拥有的权限
     user.getRolePermG({
          roleId: newId,
        }).then((r) => {
          // console.log(r.result);
          var js = JSON.parse(r.result);
          // console.log(js);
          //   //  每个角色可能有好几个权限，因此使用权限数组的长度循环打印该角色的权限
          if (js.length == 0) {
            defaultPremItem.push();
          } else if (js.length > 0) {
            for (var i = 0; i < js.length; i++) {
              var obj = {
                permName: js[i].permName,
                id: js[i].id,
              };
              defaultPremItem.push(js[i].permName);
            }
          }
        })

      return defaultPremItem;
    },

    //加载出所有的权限数据
    allprem() {
      var allPerm = [];
        user.getPermAllG(
          {
          size: 100,
        }).then(
           (r) => {
          //  console.log(r.result);
          var permData = JSON.parse(r.result);
          // console.log(permData.list.length);

          for (var i = 0; i < permData.list.length; i++) {
            //  将所有的可选择条目装进选择框
            var obj = {
              permName: permData.list[i].permName,
              id: permData.list[i].id,
            };
            this.allPremItem.push(obj); //循环得到所有的权限
          }
          //  console.log(this.allPremItem);
        })
     
    },

    //index,记录每个权限被选中的状态，即每次权限有改变就刷新该角色的权限
    changePrem(value) {
      var x = this;
      var z = []; //得到被选择的角色名
      var t = []; //得到被选择角色名的Id
      var text = `${value}`;
      z = text.split(","); //逗号为分隔符
      //  console.log(this.allPremItem);
      //  得到所有选择到的名字
      for (var i = 0; i < z.length; i++) {
        //在所有权限里进行查找
        for (var j = 0; j < this.allPremItem.length; j++) {
          if (this.allPremItem[j].permName == z[i]) {
            t.push(this.allPremItem[j].id);
          }
        }
      }
      //  console.log(t);
      //  console.log(z.length);
      // 判断得到的是否为有效角色ID好
      var index = this.seleId;
      if (index != undefined) {
        var id = this.dataSource[index].id;
      } else {
        return;
      }
      t = t.toString(); //把数组转为字符串
      //所形成的url为:/getTableData?status=1,3等价于 /getUserByName?status=1&status=3
      //更新角色权限
      user.updateRolePermG({
          roleId: id,
          perms: t,
        }).then((r) => {
          // console.log(r);
        })
    },

    changeIndex(i) {
      // console.log(i);
      this.seleId = i;
    },

    //删除角色
    deleteRole(record, index) {
      var t = this;
      var id = this.dataSource[index].id;
      var roleName = this.dataSource[index].roleName;
      var net = this.$api;
      this.$confirm({
        title: "你确定要删除"+roleName+"吗？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          user.deleteRoleG({
              roleId: id,
            }).then(
                (r) => {
              // console.log(r);
              if (r.code == 200) {
                t.$message.success("角色删除成功");
                t.refresh();
              } else if (r.code == "") {
                // console.log(r.message);
                t.$message.error("角色删除失败");
              }
            })
        
        },
        onCancel() {
          // console.log("Cancel");
        },
      });
      this.refresh();
    },

    handleOk(e) {
      this.visible = false;
    },
    //刷新角色列表
    refresh() {
      this.pagination.current = 1;
      user.getRolePermInfoPageG(null).then((r) => {
          // console.log(r);
          var js = JSON.parse(r.result);
          // 这里得到的数据就只有10个
          // console.log(js);
          const pagination = { ...this.pagination }; //重新定义获取新的页面
          // //  console.log(pagination);
          // // 读取总的数据量是12个
          pagination.total = js.total;
          pagination.pageSize = js.pageSize;
          this.loading = false;
          // console.log(js.list);
          this.dataSource = js.list; //把数据装进table里面
          this.pagination = pagination; //获取
        });

     
    },

    filterOption(inputValue, option) {
      return option.description.indexOf(inputValue) > -1;
    },

    handleChange(targetKeys, direction, moveKeys) {
      this.targetKeys = targetKeys;
      //   可以得到该角色的id，得到Id后可以将数据填充到角色添加数据
    },

    handleSearch(dir, value) {
      //   console.log("search:", dir, value);
    },
  },
};
</script>

<style>
</style>