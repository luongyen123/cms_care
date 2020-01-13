import {login} from '../../api/user'
import router from '../../router'
import { getToken, getRole, setToken, setRole } from '../../utils/auth'

const state = {
    token: getToken(),
    role: getRole(),
    name: '',
    avatar: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLE: (state,role) => {
        state.role = role
    }
}

const actions = {
    //user login
    login({ commit}, userInfo) {
        const { userId, password } = userInfo
        return new Promise((resolve, reject) => {
            login({userId: userId.trim(), password: password}).then(reponse => {
                const { data }= reponse
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                commit('SET_NAME', data.user.name)
                commit('SET_ROLE', data.user.role)
                setRole(data.user.role)
                commit('SET_AVATAR', 'http://care.spacev.monster' + data.user.avatar)
                resolve()
            }).catch( error => {
                reject(error)
            })
        })
    }
}