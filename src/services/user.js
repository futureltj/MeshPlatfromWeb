import { request, config } from 'utils'

const { api } = config
const { user } = api

export async function query (params) {
  return request({
    url: user,
    method: 'get',
    data: params,
  })
}

export async function getdeplist () {
  return request({
    url: user,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: user,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  console.log(params)
  let str=''
  if(params.id!=undefined){
    str=params.id
  }else if(params.ids!=undefined){
    str = params.ids.join(',')
  }
  console.log(str)
  return request({
    url: user+'?ids='+str,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
