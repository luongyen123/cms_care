import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import patientModule from './modules/patient'
import nureModule from './modules/nure'
import locationModule from './modules/location'
import districtModule from './modules/district'
import adsModule from './modules/ads'

Vue.use(Vuex)
export default new Vuex.Store({
    modules : {
        user: userModule,
        patient: patientModule,
        nure: nureModule,
        location: locationModule,
        district: districtModule,
        ads: adsModule
    }
})