import Vue from "vue";
import App from "./App";
import router from "./router/index";
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import PaperDashboard from "./plugins/paperDashboard";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(PaperDashboard);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
