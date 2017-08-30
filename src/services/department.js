import { request, config } from 'utils'

const { api } = config
const { department,parentdepartment } = api

export async function query (params) {
  return request({
    url: department,
    method: 'get',
    data: params,
  })
}
export async function queryParent (params) {
  return request({
    url: parentdepartment,
    method: 'get',
    data: params,
  })
}
export async function update (params) {
  return request({
    url: department,
    method: 'patch',
    data: params,
  })
}
export async function create (params) {
  return request({
    url: department,
    method: 'post',
    data: params,
  })
}
export async function remove (params) {
  let str=''
  if(params.id!=undefined){
    str=params.id
  }else if(params.ids!=undefined){
    str = params.ids.join(',')
  }
  console.log(str)
  return request({
    url: department+'?ids='+str,
    method: 'delete',
    data: params,
  })
}
