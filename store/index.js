import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import login from './login.js'
import register from './register.js'

const store = new Vuex.Store({
	modules:{
		login,
		register
	}
})
export default store