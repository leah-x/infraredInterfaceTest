import common from "../utils/common";
import API from "./baseAxios";

//二级地址
const Report="Report";

const debug="report";
export default {
  getReportPage: params => {
    common.LOG(debug,params);
    return API.GET(Report + "/getReportPage", params);
  },
  createReport: params => {
    common.LOG(debug,params);
    return API.POST(Report + "/createReport", params);
  },
  getReportFileById: params => {
    // common.LOG(debug,params);
    return API.GET(Report + "/getReportFileById", params);
  },
  getReportByTaskId: params => {
    // common.LOG(debug,params);
    return API.GET(Report + "/getReportByTaskId", params);
  },
  createReportById: params => {
    // common.LOG(debug,params);
    return API.GET(Report + "/createReportById", params);
  },
  // createReport: params => {
  //   common.LOG(debug,params);
  //   return API.POST(Report + "/createReport", params);
  // },
}
