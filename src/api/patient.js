import request from '../service/api'

export function home(data) {
    console.log(data)
    return request({
        url: 'admin/getPatients',
        method: 'post',
        data
    })
}