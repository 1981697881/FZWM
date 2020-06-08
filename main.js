import Vue from 'vue'
import App from './App'
import store from './store'
import service from './service.js'
import login from '@/api/login';
import components from './pages/component/home.vue'
Vue.component('components',components)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
import Request from '@/plugins/request/js/index'

global.$http = Request();
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App,
	mounted(){
		 /**
		  * 默认登录，这情况为已登录过，而登录缓存还在，后台登录，前端不展示登录页
		  * 检测用户账号密码是否在已缓存的用户列表中
		  */
		 			
		 if(service.getUsers()[0].username =='' && service.getUsers()[0].username == "undefined"){
		 	return
		 }else{
		 	const data = {
		 		username: service.getUsers()[0].username,
		 		password: service.getUsers()[0].password
		 	};
			if(data.username && data.password){
				login.login(data).then(res => {
					if(res.flag){
						uni.showToast({
							icon: 'none',
							title: res.msg,
						});
						store.commit("login", data)
						service.clearUser()
						service.addUser(data)
						uni.reLaunch({
							url: '../index/index',
						});
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: err.msg,
					});
				})
			}
		 }
	  }
})
app.$mount()

 



