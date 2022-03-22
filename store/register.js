import { reqRegister } from "@/api/index.js";
import qs from 'qs'

const state = {
    token:''
};
const actions = {
    async getRegister({ commit }, data = {}) {
		data= qs.stringify(data)
        let result = await reqRegister(data);
		console.log("result："+result)
        if (result.status == 0) {
            // commit("GETREGISTER", result.token);
        }
		else {
			uni.showToast({
				title:'用户名或者密码不正确！',
				icon:'error'
			})
		}
    }
};
const mutations = {
    GETREGISTER(state, token) {
        state.token = token
    }
};

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}