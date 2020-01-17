import Cookies from 'js-cookie'

const Tokenkey = 'Care-Token'
const UserLogin = 'currentUser'
const RokeKey = 'care-role'

export function getToken() {
    return Cookies.get(Tokenkey)
}

export function setToken(token) {
    return Cookies.set(Tokenkey, token, { expires: 7 })
}

export function removeToken(){
    return Cookies.remove(Tokenkey)
}

export function getCurrentUser() {
    user = Cookies.get(UserLogin)
    return JSON.parse(user)
}

export function setCurrentUser(user) {
    user = JSON.stringify(user)
    return Cookies.set(UserLogin,user,{ expires: 7 })
}

export function removeCurrentUser() {
    return Cookies.remove(UserLogin)
}

export function getRole(){
    return Cookies.get(RokeKey)
}

export function setRole(role) {
    return Cookies.set(RokeKey,role, { expires: 7 })
}

export function removeRole() {
    return Cookies.remove(RokeKey)
}