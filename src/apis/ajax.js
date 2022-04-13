/* 
  能发送Ajax请求的函数模块
*/

import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data={}, type='GET') {
  return new Promise(function(resolve,reject) {
    let promise
    // 执行异步Ajax请求
    if(type==='GET'){
      promise = axios.get(url,{
        params: data
      })
    }else if(type==='POST'){
      promise = axios.post(url,data)
    }else if(type==='PUT'){
      promise = axios.put(url,data)
    }else {
      promise = axios.delete(url,{
        params: data
      })
    }
    promise.then(response => {
      // 成功调用resolve
      resolve(response.data)
    }).catch(error => {
      // 失败了，提示错误原因
      message.error('请求出错了：'+error.message)
    })
  })
}