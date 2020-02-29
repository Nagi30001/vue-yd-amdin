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

export function getCarTypeMsg() {
  return request({
    url: '/data/getCarTypeMsg',
    method: 'get'
  })
}

export function addCarType(data) {
  return request({
    url: '/data/addCarType',
    method: 'post',
    data
  })
}

export function updateCarType(data) {
  return request({
    url: '/data/updateCarType',
    method: 'post',
    data
  })
}

export function addPurchaseMsg(data) {
  return request({
    url: '/data/addPurchaseMsg',
    method: 'post',
    data
  })
}

export function scrapPurchaseMsg(data) {
  return request({
    url: '/data/scrapPurchaseMsg',
    method: 'post',
    data
  })
}

export function receivePurchaseMsg(data) {
  return request({
    url: '/data/receivePurchaseMsg',
    method: 'post',
    data
  })
}

export function checkIccid(iccid) {
  return request({
    url: '/data/checkIccid',
    method: 'post',
    params : {iccid}
  })
}
