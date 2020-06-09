<template>
	<view>
		<components v-if="PageCur=='component'"></components>
	</view>
</template>

<script>
	import service from '../../service.js';
	import store from '@/store'
	import login from '@/api/login';
	import {
		mapState
	} from 'vuex'
	
	export default {
		data() {
		return {
				PageCur: 'component'
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onReady() {
			/**
			 * 默认登录，这情况为已登录过，而登录缓存还在，后台登录，前端不展示登录页
			 * 检测用户账号密码是否在已缓存的用户列表中
			 */
			if(service.getUsers().length > 0){
				if(service.getUsers()[0].username !='' && service.getUsers()[0].username != "undefined"){
					const data = {
							username: service.getUsers()[0].username,
							password: service.getUsers()[0].password
						};
								if(data.username && data.password){
									login.login(data).then(res => {
										if(res.flag){
											store.commit("login", data)
											service.clearUser()
											service.addUser(data)
										}
									}).catch(err => {
										uni.showToast({
											icon: 'none',
											title: err.msg,
										});
									})
								}
					}else{
					return uni.reLaunch({
						url: '../login/login',
					});
				}
			}else {
				return uni.reLaunch({
					url: '../login/login',
				});
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
