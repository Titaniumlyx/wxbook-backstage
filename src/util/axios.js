import axios from 'axios'
import router from '../router'
import Vue from 'vue'

const baseURL = '/api/admin'

var xhr = axios.create({
  baseURL,
  timeout: 15000
});

const fetch = {
  get(url, data, config){
    return new Promise((resolve,reject) => {
      xhr.get(url, {params: data}, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
        Vue.prototype.$message.error('请求超时，请检查你的网络')
      })
    })
  },
  post(url, data, config, method = 'post'){
    return new Promise((resolve,reject) => {
      xhr[method](url, data, config).then(res => {
        // console.log(res);
        if(res.data.code === 401){
          router.push('/Login')
          Vue.prototype.$message.error(res.data.msg)
        }
        resolve(res.data)
      }).catch(err => {
        reject(err)
        Vue.prototype.$message.error('请求超时，请检查你的网络')
      })
    })
  },
  put(url, data, config){
    return this.post(url, data, config, 'put')
  },
  delete(url, data, config){
    return this.post(url, data, config, 'delete')
  }
}

export default fetch
