import request from '@/utils/request'

export function sellmsg(data) {
  return request({
    url: '/sell/sellmsg',
    method: 'post',
    data
  })
}
export function loadSellMsg(data) {
  return request({
    url: '/sell/loadSellMsg',
    method: 'post',
    data
  })
}

export function addSellReceipts(token,data) {
  return request({
    url: '/sell/addSellReceipts',
    method: 'post',
    data,
    headers:{
      'token':token
    }
  })
}

export function reachCheckMsg(token) {
  return request({
    url: '/sell/reachCheckMsg',
    method: 'post',
    params : {token},
    headers:{
      'token':token
    }
  })
}

export function reachCheck(token,data) {
  return request({
    url: '/sell/reachCheck',
    method: 'post',
    data,
    headers:{
      'token':token
    }
  })
}

export function uploadFile(token,data,file) {
  return request({
    url: '/sell/uploadFile',
    method: 'post',
    data,file,
    headers:{
      'token':token
    }
  })
}

export function getMyReceipts(token) {
  return request({
    url: '/sell/getMyReceipts',
    method: 'post',
    params : {token},
    headers:{
      'token':token
    }
  })
}

export function cancellation(token,id) {
  return request({
    url: '/sell/cancellation',
    method: 'post',
    params : {token,id}

  })
}

export function searchQueryDate(data) {
  return request({
    url: '/sell/searchQueryDate',
    method: 'post',
    data

  })
}

export function pushInstallMsg(data) {
  return request({
    url: '/sell/pushInstallMsg',
    method: 'post',
    data
  })
}
