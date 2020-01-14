import request from '../service/api'

export function home(data) {
    return request({
        url: 'admin/getNurses',
        method: 'post',
        data
    })
}