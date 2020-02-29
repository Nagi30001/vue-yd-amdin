import { getChannelMsg ,addChannel ,updateChannel, getSellType, getEquipmentMsg, getEquipmentInventory, addEquipment, updateEquipment, getCarTypeMsg,
addCarType, addPurchaseMsg, scrapPurchaseMsg, receivePurchaseMsg, checkIccid} from '@/api/data'
import { getToken } from '@/utils/auth'



const actions = {
  // 获取渠道信息数组
  getChannelMsg({commit}){
    return new Promise((resolve, reject) => {
      getChannelMsg(getToken()).then(res => {
        resolve(res)
      }).catch(err0r => {
        reject(error)
      })
    })
  },
  // 添加聚到信息
  addChannel({commit},channelMsg){
    return new Promise((resolve, reject) => {
      addChannel({token:getToken(),channel:channelMsg}).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新渠道信息
  updateChannel({commit},channelMsg){
    return new Promise((resolve,reject) => {
      updateChannel(getToken(),{token:getToken(),channel:channelMsg}).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取销售类型信息
  getSellType({commit}){
    return new Promise((resolve, reject) => {
      getSellType(getToken()).then(res => {
        resolve(res)
      })
    })
  },

  // 获取设备型号信息
  getEquipmentMsg({commit}){
    return new Promise((resolve, reject) => {
      getEquipmentMsg(getToken()).then(res => {
        resolve(res)
      })
    })
  },

  // 获取设备库存/转移信息/维修信息/报废信息/更换信息
  getEquipmentInventory({commit}){
    return new Promise((resolve, reject) => {
      getEquipmentInventory(getToken()).then(res => {
        resolve(res)
      })
    })
  },

  // 添加设备信息
  addEquipment({commit},equipmentMsg){
    return new Promise((resolve,reject) => {
      addEquipment(equipmentMsg).then(res => {
        resolve(res)
      })
    })
  },

  // 更新设备信息
  updateEquipment({commit},equipmentMsg){
    return new Promise((resolve,reject) => {
      updateEquipment(equipmentMsg).then(res => {
        resolve(res)
      })
    })
  },

  // 获取车型数据
  getCarTypeMsg({commit}){
    return new Promise((resolve, reject) => {
      getCarTypeMsg().then(res => {
        resolve(res)
      })
    })
  },

  // 添加车型
  addCarType({commit},carTypeMsg){
    return new Promise((resolve, reject) => {
      addCarType(carTypeMsg).then(res => {
        resolve(res)
      })
    })
  },

  // 添加采购单据
  addPurchaseMsg({commit},purchaseMsg){
    return new Promise((resolve,reject) => {
      addPurchaseMsg(purchaseMsg).then(res => {
        resolve(res)
      })
    })
  },

  // 报废采购单据
  scrapPurchaseMsg({commit},msg){
    return new Promise((resolve, reject) => {
      scrapPurchaseMsg(msg).then(res => {
        resolve(res)
      })
    })
  },

  // 采购单据收货
  receivePurchaseMsg({commit},msg){
    return new Promise((resolve, reject) => {
      receivePurchaseMsg(msg).then(res =>{
        resolve(res)
      })
    })
  },
  
  // 检查iccid是否存在没有被使用
  checkIccid({commit},iccid){
    return new Promise((resolve, reject) => {
      checkIccid(iccid).then(res => {
        resolve(res)
      })
    })
  }


}


export default {
  namespaced: true,
  actions
}
