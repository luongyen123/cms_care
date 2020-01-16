import request from '../service/api'

export function home(data) {
    return request({
        url: 'admin/getPatients',
        method: 'post',
        data
    })
}
export function detail(data){
    return request({
        url: 'patient/detail',
        method: 'post',
        data
    })
}