<template>
	<view>
		<components v-if="PageCur=='component'"></components>
	</view>
</template>

<script>
	import service from '../../service.js';
	import store from '@/store'
	import login from '@/api/login';
	import basic from '@/api/basic';
	import {
		mapState
	} from 'vuex'
	
	export default {
		data() {
		return {
			PageCur: 'component'
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'account']),
		onReady() {
			/**
			 * 默认登录，这情况为已登录过，而登录缓存还在，后台登录，前端不展示登录页
			 * 检测用户账号密码是否在已缓存的用户列表中
			 */
			if(service.getUrls().url !='' && typeof service.getUrls().url != "undefined"){
				if(service.getUsers().length > 0){
					console.log(service.getUsers()[0].account !='' && service.getUsers()[0].account != "undefined")
					if(service.getUsers()[0].account !='' && service.getUsers()[0].account != "undefined"){
						const data = {
								account: service.getUsers()[0].account,
								password: service.getUsers()[0].password
							};
							if(data.account && data.password){
								login.login(data).then(res => {
									console.log(res.success)
									if(res.success){
										data.userId = res.data['userId']
										data.username =res.data['username']
										store.commit("login", data)
										service.clearUser()
										service.addUser(data)
										console.log(123)
										
										}
									}).catch(err => {
										uni.showToast({
											icon: 'none',
											title: err.msg,
										});
										return uni.reLaunch({
											url: '../login/login',
										});
								})
							}
						} else {
						return uni.reLaunch({
							url: '../login/login',
						});
					}
				}else {
					return uni.reLaunch({
						url: '../login/login',
					});
				}	
			}else{
				uni.showToast({
					icon: 'none',
					title: '服务器地址不存在，请返回登录页输入',
				});
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
