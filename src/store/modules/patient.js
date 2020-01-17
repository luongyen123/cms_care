import {home, detail, historyRequest} from '../../api/patient'
import {formatSearch} from '../../utils/dateFormat'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    home({commit},formData) {
        let { start_date, end_date, city_code, district_code,next_page } = formData
        let district_code_sub = district_code.substr(0,2)
        if(district_code_sub != city_code) {
            district_code = ""
        }
        return new Promise((resolve, reject) => {
            home({page: next_page, start_date: formatSearch(start_date), end_date: formatSearch(end_date), city_code: city_code, district_code: district_code}).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    },
    detail({commit},formData) {
        let { id } = formData
        return new Promise((resolve, reject) => {
            detail({id: id}).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    },
    historyRequest({commit},formData) {
        let { id, page } = formData
        return new Promise((resolve, reject) => {
            historyRequest({id_patient: id, page: page}).then(reponse => {
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
  