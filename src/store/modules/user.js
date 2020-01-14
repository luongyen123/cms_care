import {login} from '../../api/user'
import router from '../../router'
import { getToken, getRole, setToken, setRole, setCurrentUser } from '../../utils/auth'

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
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  