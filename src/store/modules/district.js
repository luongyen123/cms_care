import {listDistrict} from '../../api/district'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    listDistrict({commit},formData) {
        const { key, city_code } = formData
        return new Promise((resolve, reject) => {
            listDistrict({key: key, city_code: city_code}).then(reponse => {
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
  