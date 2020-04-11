/**
 * 统一捕获接口报错 : 用的axios内置的拦截器
 * 弹窗提示: 引入 Element UI的Message组件
 * 报错重定向: 路由钩子
 * 基础鉴权: 服务端过期时间戳和token,还有借助路由的钩子
 * 表单序列化: 我这边直接用qs(npm模块),你有时间也可以自己写
 */

import axios from 'axios'
import { message } from 'antd'

/**
 * axios 请求的baseUrl
 * @type {string}
 */
const baseUrl = '/api'
const RES_OK = '200'
const RES_ERR = '400'
const TIMEOUT = 10000

const ApiRequest = axios.create({
  baseURL: baseUrl,
  timeout: TIMEOUT,
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    // 'Content-Type': 'application/json;charset=utf-8'
  }
})

ApiRequest.interceptors.request.use(
  config => {
    // 若是有做鉴权token , 就给头部带上token
    // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
    // 这里localStorage一般是请求成功后我们自行写入到本地的,因为你放在vuex刷新就没了
    // 一些必要的数据写入本地,优先从本地读取
    // token 添加到http header
    config.headers = {
      ...config.headers,
    }
    return config
  },
  error => {
    // error 的回调信息,看贵公司的定义
    return Promise.reject(error.data.error.message)
  }
)

// 返回状态判断(添加响应拦截器)
ApiRequest.interceptors.response.use(
  res => {
    /**
     * 对响应数据做些事
     * 只返回了data 部分
     * code，message，result 没返回
     */
    const { data } = res
    // 和服务端约定的 Code
    const { code, msg } = data
    message.destroy()
    if (!code) {
      if (msg) message.success({ content: msg, duration: 1 })
      return Promise.resolve(data)
    } else {
      if (code === RES_OK) {
        if (msg) message.success({ content: msg, duration: 1 })
        return Promise.resolve(data)
      } else if (code === RES_ERR) {
        if (msg) message.error({ content: msg, duration: 1 })
        return Promise.reject(msg)
      }
    }
  },
  error => {
    // deal with error
    // 404
    // 503
    // ...
    /**
     * 检查错误码
     */
    /**
     * 捕获错误信息，并保存起来
     * @type {AxiosResponse | AxiosInterceptorManager<AxiosResponse> | any}
     */
    return Promise.reject(error)
  }
)

export default ApiRequest
