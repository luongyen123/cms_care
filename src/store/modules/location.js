import {listCity} from '../../api/location'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    listCity({commit},formData) {
        const { key } = formData
        return new Promise((resolve, reject) => {
            listCity({key: key}).then(reponse => {
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
  