import Vue from 'vue'
import axios from 'axios'
// import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// 创建 axios 实例
console.log(process.env.VUE_APP_API_BASE_URL)
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000, // 请求超时时间
  withCredentials: true // 允许携带cookie
})
axios.defaults.withCredentials = true // 允许axios请求携带cookie等凭证
axios.defaults.baseURL = '/apiix' // 打包时去掉
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    // const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 500) {
      notification.error({
        message: '连接不上服务器',
        description: data.message
      })
    }
    if (error.response.status === 404) {
      notification.error({
        message: '请求数据失败',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: '账号或密码错误',
        description: ''
      })
      // if (token) {
      //   store.dispatch('Logout').then(() => {
      //     setTimeout(() => {
      //       window.location.reload()
      //     }, 1500)
      //   })
      // }
    }
  }
  return Promise.reject(error)
}

// request interceptor
// service.interceptors.request.use(config => {
//   const token = Vue.ls.get(ACCESS_TOKEN)
//   if (token) {
//     config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
//   }

//   return config
// }, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
