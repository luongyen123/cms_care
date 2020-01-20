import request from '../service/api'

export function adsCreate(data) {
    return request({
        url: 'admin/banner/create',
        method: 'post',
        data
    })
}
export function getList(data) {
    return request({
        url: 'admin/banner/get',
        method: 'post',
        data
    })
}
export function edit(data) {
    return request({
        url: 'admin/banner/update',
        method: 'post',
        data
    })
}
export function del(data) {
    return request({
        url: 'admin/banner/delete',
        method: 'post',
        data
    })
}