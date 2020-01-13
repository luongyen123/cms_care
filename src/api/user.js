import request from '../service/api'

export function login(data) {
    return request({
        url: 'auth/login',
        method: 'post',
        data
    })
}