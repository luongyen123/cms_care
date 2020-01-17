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
export function historyRequest(data){
    return request({
        url: 'admin/patient/history',
        method: 'post',
        data
    })
}