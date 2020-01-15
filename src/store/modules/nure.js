import {home} from '../../api/nure'
import {formatSearch} from '../../utils/dateFormat'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    home({commit},formData) {
        let { start_date, end_date, city_code, district_code,next_page } = formData
        let district_code_sub = district_code.substr(0,1)
        if(district_code_sub != city_code) {
            district_code = ""
        }
        return new Promise((resolve, reject) => {
            home({page: next_page, start_date: formatSearch(start_date), end_date: formatSearch(end_date),city_code: city_code, district_code: district_code}).then(reponse => {
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
  