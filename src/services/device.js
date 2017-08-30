import { request, config } from 'utils'

const { api } = config
const { device} = api

export async function query (params) {
  return request({
    url: device,
    method: 'get',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: device,
    method: 'patch',
    data: params,
  })
}
export async function create (params) {
  return request({
    url: device,
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
    url: device+'?ids='+str,
    method: 'delete',
    data: params,
  })
}
