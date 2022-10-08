// ajax 请求函数
import axios from "axios"
export default function ajax(url,data={},type='GET'){
  return new Promise((resolve, reject) => {
    // 执行ajax请求
    let promise;
    if(type === 'GET'){
      // 准备 url query参数
      let dataStr = ''  //  数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if(dataStr !== ''){
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    }else{
      // 发送post请求
      promise = axios.post(url,data)
    }
    promise.then((result) => {
      resolve(result.data)
    }).catch((err) => {
      reject(err.data)
    });
  });
}