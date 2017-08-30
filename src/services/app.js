import { request, config } from 'utils'

const { api } = config
const { user, userLogout, userLogin } = api

export async function login (params) {
  console.log(params)
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  sessionStorage.removeItem('jwttoken')
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}
