import request from '../service/api'

export function listDistrict(data) {
    return request({
        url: 'location/getDistrict',
        method: 'post',
        data
    })
}