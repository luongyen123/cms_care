import request from '../service/api'

export function listCity(data) {
    return request({
        url: 'location/getCity',
        method: 'post',
        data
    })
}