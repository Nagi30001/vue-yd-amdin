import request from '@/utils/request'
// import QS from 'qs'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    headers:{
      'token':token
    }
  })
}

export function getUsers(token) {
  return request({
    url: '/user/getUsers',
    method: 'get',
    params: {token}
  })
}

export function addUser(token,data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data,
    headers:{
      'token':token
    }
  })
}

export function checkJobNum(token,value) {
  return request({
    url: '/user/checkJobNum',
    method: 'post',
    params: {value},
    headers:{
      'token':token
    }
  })
}

export function updateUser(token,data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data,
    headers:{
      'token':token
    }
  })
}

export function updatePassword(data) {
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data
  })
}
