import request from '../service/api'

export function home(data) {
    return request({
        url: 'admin/getNurses',
        method: 'post',
        data
    })
}
export function detail(data) {
    return request({
        url: 'nurse/detail',
        method: 'post',
        data
    })
}