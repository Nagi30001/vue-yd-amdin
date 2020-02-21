import request from '@/utils/request'

export function getChannelMsg(token) {
  return request({
    url: '/data/getChannelMsg',
    method: 'get',
    params : {token}
  })
}

export function addChannel(data) {
  return request({
    url: '/data/addChannel',
    method: 'post',
    data
  })
}

export function updateChannel(token,data) {
  return request({
    url: '/data/updateChannel',
    method: 'post',
    data,
    headers:{
      'token':token
    }
  })
}

export function getSellType(token) {
  return request({
    url: '/data/getSellType',
    method: 'get',
    params : {token}
  })
}

export function getEquipmentMsg(token) {
  return request({
    url: '/data/getEquipmentMsg',
    method: 'get',
    params : {token}
  })
}

export function getEquipmentInventory(token) {
  return request({
    url: '/data/getEquipmentInventory',
    method: 'get',
    params : {token}
  })
}


export function addEquipment(data) {
  return request({
    url: '/data/addEquipment',
    method: 'post',
    data
  })
}

export function updateEquipment(data) {
  return request({
    url: '/data/updateEquipment',
    method: 'post',
    data
  })
}




