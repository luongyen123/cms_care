import {home} from '../../api/patient'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    home({commit},formData) {
        const { start_date, end_date, city_code, district_code,next_page } = formData
        return new Promise((resolve, reject) => {
            home({page: next_page}).then(reponse => {
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
  