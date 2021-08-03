import { axios } from '../router/request'
// import { version } from './config'
const api = {
  getPbjhList: 'altmm/sys/scheduling/getPbjhList', // 获取本周排班信息
  getPbyhfzxx: 'altmm/sys/pbyhfzxx/getPbyhfzxx', // 人员分组管理
  getPbyhfzxxById: 'altmm/sys/pbyhfzxx/getPbyhfzxxById', // 获取一条人员分组
  getSavePbyhfzxx: 'altmm/sys/pbyhfzxx/getSavePbyhfzxx', // 保存一条人员分组
  deletePbyhfzxx: 'altmm/sys/pbyhfzxx/deletePbyhfzxx', // 删除一条人员分组
  getPbbcxx: 'altmm/sys/pbbcxx/getPbbcxx', //  班次管理 获取人员分组列表
  getPbyhxxBybqid: 'altmm/sys/pbjh/getPbyhxxBybqid' // 获取病区人员信息
}

export default api

export function getPbjhList (id, searchDate) {
  return axios({
    url: api.getPbjhList + '?bqid=' + id + '&searchDate=' + searchDate,
    method: 'get'
  })
}
// page, pageSize
// '&page=' + page + '&rows=' + pageSize

export function getPbyhfzxx (id, page, pageSize) {
  return axios({
    url: api.getPbyhfzxx + '?bqid=' + id + '&page=' + page + '&rows=' + pageSize,
    method: 'get'
  })
}
export function getPbyhfzxxById (id) {
  return axios({
    url: api.getPbyhfzxxById + '?id=' + id,
    method: 'get'
  })
}
export function getSavePbyhfzxx (id, params) {
  return axios({
    url: api.getSavePbyhfzxx + '?id=' + id,
    method: 'put',
    data: params
  })
}
export function deletePbyhfzxx (id) {
  return axios({
    url: api.deletePbyhfzxx + '?id=' + id,
    method: 'get'
  })
}
export function getPbbcxx (id, bcmc, page, pageSize) {
  return axios({
    url: api.getPbbcxx + '?bqid=' + id + '&bcmc=' + bcmc + '&page=' + page + '&rows=' + pageSize,
    method: 'get'
  })
}
export function getPbyhxxBybqid (id, searchDate) {
  return axios({
    url: api.getPbyhxxBybqid + '?bqid=' + id + '&searchDate=' + searchDate,
    method: 'get'
  })
}
