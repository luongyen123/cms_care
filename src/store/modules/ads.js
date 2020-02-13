import {adsCreate, getList, edit, del} from '../../api/ads'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    adsCreate({commit},formData) {
        const { base64, active, name, link } = formData
        return new Promise((resolve, reject) => {
            adsCreate({base64: base64, active: active,name: name, link }).then(reponse => {
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
    },
    edit({commit},formData) {
        const { id, base64, active, name, link } = formData
        return new Promise((resolve, reject) => {
            edit({id: id, base64: base64, active:active, name: name, link: link }).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    },
    del({commit},formData) {
        const { id } = formData
        return new Promise((resolve, reject) => {
            del({id: id}).then(reponse => {
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
  