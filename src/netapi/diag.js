import API from './baseAxios'
import common from "../utils/common";

//二级地址, 为了分层
const diag="Diag";

const debug="diag";
export default {
  getTaskGroupDiagInfo: params => {
    common.LOG(debug,params);
    return API.GET(diag + "/getTaskGroupDiagInfo", params);
  },
  getFlawPage: params => {
    common.LOG(debug,params);
    return API.GET(diag + "/getFlawPage", params);
  },
  getFlawById: params => {
    common.LOG(debug,params);
    return API.GET(diag + "/getFlawById", params);
  },
  confirmFlaw:params => {
    common.LOG(debug,params);
    return API.GET(diag + "/confirmFlaw", params);
  },
  getTaskDiagByTaskId:params => {
    common.LOG(debug,params);
    return API.GET(diag + "/getTaskDiagByTaskId", params);
  },
  
}
