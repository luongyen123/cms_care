import axios from 'axios'
import {Message} from 'element-ui'
import store from '../store'
import { getToken } from '../utils/auth'

const service = axios.create({
    baseURL: 'http://care.spacev.monster/api',
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if(getToken()) {
            config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }  
)
service.interceptors.response.use(
    reponse => {
        const res = reponse.data
        if(res.status != 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5*1000
            })
            return Promise.reject(new Error(res.message) || 'Error')
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service