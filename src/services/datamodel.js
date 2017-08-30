import { request, config } from 'utils'

const { api } = config
const { datamodel} = api

export async function query (params) {
  return request({
    url: datamodel,
    method: 'get',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: datamodel,
    method: 'patch',
    data: params,
  })
}
export async function create (params) {
  return request({
    url: datamodel,
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
    url: datamodel+'?ids='+str,
    method: 'delete',
    data: params,
  })
}
