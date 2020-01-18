import {adsCreate, getList} from '../../api/ads'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    adsCreate({commit},formData) {
        const { base64, active, name } = formData
        return new Promise((resolve, reject) => {
            adsCreate({base64: base64, active: active,name: name }).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    },
    getList({commit},formData) {
        const { page } = formData
        return new Promise((resolve, reject) => {
            getList({page: page }).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
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
  