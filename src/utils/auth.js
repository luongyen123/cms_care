import Cookies from 'js-cookie'

const Tokenkey = 'Care-Token'
const UserLogin = 'currentUser'
const role = 'role'

export function getToken() {
    return Cookies.get(Tokenkey)
}

export function setToken(token) {
    return Cookies.set(Tokenkey, token)
}

export function removeToken(){
    return Cookies.remove(Tokenkey)
}

export function getCurrentUser() {
    return Cookies.get(UserLogin)
}

export function setCurrentUser(user) {
    return Cookies.set(UserLogin,user)
}

export function removeCurrentUser() {
    return Cookies.remove(UserLogin)
}

export function getRole(){
    return Cookies.get(role)
}

export function setRole(role) {
    return Cookies.set(role,role)
}

export function removeRole() {
    return Cookies.remove(role)
}