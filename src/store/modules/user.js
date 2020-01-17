import {login, getList, getLogs, getRequest, logout} from '../../api/user'
import router from '../../router'
import { getToken, getRole, setToken, setRole, setCurrentUser, removeRole, removeToken, removeCurrentUser } from '../../utils/auth'

const state = {
    token: getToken(),
    role: getRole(),
    userCurrent: {}
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
        setToken(token)
    },
    SET_USER: (state, user) => {
        state.user = user
        setCurrentUser(user)
    },
    SET_ROLE: (state,role) => {
        state.role = role
        setRole(role)
    }
}

const actions = {
    //user login
    login({ commit}, userInfo) {
        const { userId, password } = userInfo
        return new Promise((resolve, reject) => {
            login({user_id: userId.trim(), password: password}).then(reponse => {
                const { data }= reponse
                commit('SET_TOKEN', data.token)
                commit('SET_USER', data.user)
                commit('SET_ROLE', data.user.role)
                resolve()
            }).catch( error => {
                reject(error)
            })
        })
    },
    getList({commit}, formData) {
        const {next_page, start_date, end_date, city_code,district_code, name} = formData
        return new Promise((resolve, reject) => {
            getList({page: next_page, name: name}).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    },
    getLogs({commit}, formData) {
        const {page, id} = formData
        return new Promise((resolve, reject) => {
            getLogs({page: page, user_login: id}).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    },
    getRequest({}, formData) {
        const {page, status, start_date, end_date} = formData
        return new Promise((resolve, reject) => {
            getRequest({page: page, status: status, start_date: start_date, end_date: end_date}).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    },
    logout({}) {
        return new Promise((resolve, reject) => {
            logout().then(reponse => {
                const { data }= reponse
                removeRole()
                removeToken()
                removeCurrentUser()
                resolve()
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
  