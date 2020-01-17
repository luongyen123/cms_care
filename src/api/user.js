import request from '../service/api'

export function login(data) {
    return request({
        url: 'auth/login',
        method: 'post',
        data
    })
}
export function getList(data) {
    return request({
        url: 'admin/getUsers',
        method: 'post',
        data
    })
}
export function getLogs(data) {
    return request({
        url:'admin/loginLogs',
        method: 'post',
        data
    })
}
export function getRequest(data) {
    return request({
        url:'admin/getRequests',
        method: 'post',
        data
    })
}
export function logout() {
    return request({
        url:'user/logout',
        method: 'post'
    })
}
export function detailRequest(data){
    return request({
        url:'admin/request/detail',
        method: 'post',
        data
    })
}