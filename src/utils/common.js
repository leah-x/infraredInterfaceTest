
// 常量
export default {
  /**
   * 系统名字
   */
  SYSTEM_NAME:"红外智能诊断分析系统",
  /**
   * debug 调试开关
   */
  DEBUG:true,
  /**
   * 网络错误提示信息
   */
  NETWORK_ERROR_MESSAGE:"网络错误，请刷新重试！",
  /**
   * 调试方法
   * @param path 调试方法所在文件
   * @param msg 调试弹出信息
   * @constructor
   */
  LOG:function (path,msg){
    if (!this.DEBUG){
      return ;
    }
    console.log("------------------")
    console.log(path)
    console.log(msg)
    console.log("------------------")
  },

  /**设置全局变量任务组Id */
  
}
