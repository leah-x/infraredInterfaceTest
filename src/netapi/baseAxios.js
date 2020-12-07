import axios from 'axios';
import qs from 'qs'
import baseUrl from './baseUrl'
axios.defaults.withCredentials = true; //解决session的问题

// 添加一个响应拦截器，将 res.data -> data 
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

//基地址 http:
//接口代理地址参见：config/index.js中的proxyTable配置 //192.168.1.201
let base = baseUrl; 
 
//通用方法 
//post：保存  
export default {
POST: function(url, params)  { 
  return  axios.post(`${base}${url}`,params)
   .then(res => res.data)
},
 
//get：查询 
 GET: function(url, params)  {
  return axios.get(`${base}${url}`, { params: params })
  .then(res => res.data)
},

//put：更新
 PUT: function(url, params) {
  return axios.put(`${base}${url}`, qs.stringify(params)).then(res => res.data)
},

//delete：删除
 DELETE : function(url, params){
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
},
 PATCH:  function(url, params)  {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
}