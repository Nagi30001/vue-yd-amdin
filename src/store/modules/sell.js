import { sellmsg, addSellReceipts, reachCheckMsg, reachCheck, uploadFile, getMyReceipts, cancellation, searchQueryDate, pushInstallMsg, loadSellMsg} from '@/api/sell'
import { getToken } from '@/utils/auth'


const state = {
  token: getToken(),
  // 用户信息
  user:'',
  // 获取用户城市信息
  citys: '',
  // 获取车型信息
  carTyep: '',
  // 选择完城市获取平台信息
  thirdPartyMsg: '',
  // 销售类型信息
  sellType: '',
  // 附加业务信息
  additionType: '',
  // 单据信息
  receipts:''

}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_CITYS: (state, citys) => {
    state.citys = citys
  },
  SET_CARTYPE: (state, carTyep) => {
    state.carTyep = carTyep
  },
  SET_THIRDPARTYMSG: (state, thirdPartyMsg) => {
    state.thirdPartyMsg = thirdPartyMsg
  },
  SET_SELLTYPE: (state, sellType) => {
    state.sellType = sellType
  },
  SET_ADDITIONTYPE: (state, additionType) => {
    state.additionType = additionType
  },
  SET_RECEIPTS: (state, receipts) => {
    state.receipts = receipts
  }
}


const actions = {
  // 初始化获取信息
  sellmsg({commit},allSearchMsg) {
   // 发送请求
   return new Promise((resolve, reject) => {
     sellmsg(allSearchMsg).then(res => {
       // 回调把数据传回去
       resolve(res)
     }).catch(error => {
       reject(error)
     })
   })
  },
  
  // 加载信息
  loadSellMsg({commit},allSearchMsg) {
   // 发送请求
   return new Promise((resolve, reject) => {
     loadSellMsg(allSearchMsg).then(res => {
       // 回调把数据传回去
       resolve(res)
     }).catch(error => {
       reject(error)
     })
   })
  },
  
  
  // 获取用户需要审核的信息
  reachCheckMsg({ commit }){
    return new Promise((resolve, reject) => {
      reachCheckMsg(getToken()).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //信息确认请求发送
  reachCheck({commit},data){
    return new Promise((resolve, reject) => {
      reachCheck(getToken(),{token:getToken(),id:data.id,type:data.type,data:data.data})
      .then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增单据
  addSellReceipts({ commit }, temp){

    return new Promise((resolve, reject) => {

      console.log(temp)
      addSellReceipts(getToken(),{temp: temp ,token:state.token}).then(res => {

        // 回调把数据传回去
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 上传图片请求
  uploadFile({commit},data,file){
    return new Promise((resolve,reject) => {
      uploadFile(getToken(),data,file).then(res => {
        resolve(res)
      })
    })
  },
  // 获取我的报单
  getMyReceipts({commit}){
    return new Promise((resolve, reject) => {
      getMyReceipts(getToken()).then(res => {
        resolve(res)
      })
    })
  },

  // 作废单据
  cancellation({commit},id){
    return new Promise((resolve,reject) => {
      cancellation(getToken(),id).then(res => {
        resolve(res)
      })
    })
  },

  // 根据条件查询单据
  searchQueryDate({commit},queryDate){
    return new Promise((resolve, reject) => {
      searchQueryDate(queryDate).then(res => {
        resolve(res)
      })
    })
  },

  // 设备安装确认
  pushInstallMsg({commit},installMsg){
    return new Promise((resolve, reject) => {
      pushInstallMsg(installMsg).then(res => {
        resolve(res)
      })
    })
  }


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
