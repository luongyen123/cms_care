import router from './router'
import {Message} from 'element-ui'
import { getToken } from './utils/auth'

router.beforeEach(async(to, from, next) => {
    const hasToken = getToken()
    if(hasToken) {
        if(to.path === '/') {
            next({path: '/dashboard'})
        }else{
            const hasRoles = getToken()
            if (hasRoles){
                if (to.matched.some((record) => record.meta.permisions) == hasRoles){
                    next()
                } else{
                    Message.error('Permision denined' || 'Has Error')
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
          } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/`)
          }
    }
})