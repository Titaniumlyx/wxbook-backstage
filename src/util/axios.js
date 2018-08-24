import axios from 'axios'
import router from '../router'

const baseURL = '/api/admin'

var xhr = axios.create({
  baseURL,
  timeout: 5000
});

const fetch = {
  get(url, data, config){
    return new Promise((resolve,reject) => {
      xhr.get(url, {params: data}, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post(url, data, config, method = 'post'){
    return new Promise((resolve,reject) => {
      xhr[method](url, data, config).then(res => {
        // console.log(res);
        if(res.data.code === 401){
          router.push('/Login')
        }
        resolve(res.data)
      }).catch(err => {
        reject(err)
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
