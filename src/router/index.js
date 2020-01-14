import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import {Message} from 'element-ui'
import {getToken, getRole} from '../utils/auth'
Vue.use(VueRouter);

const whiteList = ['/login']
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active"
});
router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  const hasRoles = getRole()
  if(hasToken && hasRoles) {
    if (to.matched.some((record) => record.meta.permisions) == hasRoles){
      if(to.path === '/login') {
        next({path: '/dashboard'})
      }else {
        next()
      }
    } else {
      next(`/login`)
    }
  } else {
      if (whiteList.indexOf(to.path) !== -1) {
          // in the free login whitelist, go directly
          next()
        } else {      
          // other pages that do not have permission to access are redirected to the login page.
          next(`/login`)
        }
  }
})
export default router;
