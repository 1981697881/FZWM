<template>
	<view>
		<view class="cu-bar bg-gradual-blue">
			<view ></view>
			<view>
				登录
			</view>
			<view >
			
			</view>
		</view>
		<view class="content">
			<view class="padding" style="text-align: center;">
				<view class="cu-avatar round imgxl margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
			</view>
			<view class="input-group">
				<view class="input-row border">
					<text class="title">账号：</text>
					<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
				</view>
				<view class="input-row">
					<text class="title">密码：</text>
					<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="bindLogin">登录</button>
			</view>
		
		</view>
	</view>
	
</template>

<script>
	import service from '../../service.js';
	import login from '@/api/login';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '@/components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
			}
		},
		created(){
		 plus.key.addEventListener('backbutton',()=>{
		    if(back_k){
				plus.runtime.quit();
		    }else{
				uni.showToast({
				title:"再按一次退出应用",
				icon:'none'
				});
			}
				back_k ++
		    setTimeout(()=>{
				back_k --
		    },3000)
		   }, false);
		},
		onReady() {
			/**
			 * 默认登录，这情况为已登录过，而登录缓存还在，后台登录，前端不展示登录页
			 * 检测用户账号密码是否在已缓存的用户列表中
			 */
			console.log(123)
			/* if(service.getUsers()[0].account =='' && service.getUsers()[0].account == "undefined"){
				return
			}else{
				console.log(service.getUsers()[0])
				const data = {
					account: service.getUsers()[0].account,
					password: service.getUsers()[0].password
				};
					if(data.account && data.password){
						login.login(data).then(res => {
							if(res.flag){
								uni.reLaunch({
									url: '../index/index',
								});
								uni.showToast({
									icon: 'none',
									title: res.msg,
								});
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
			} */
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			onLogin() {
				/**
				 * 默认登录，这情况为已登录过，而登录缓存还在，后台登录，前端不展示登录页
				 * 检测用户账号密码是否在已缓存的用户列表中
				 */
			
				if(service.getUsers()[0].account =='' && service.getUsers()[0].account == "undefined"){
					return
				}else{
					const data = {
						account: service.getUsers()[0].account,
						password: service.getUsers()[0].password
					};
					login.login(data).then(res => {
						uni.showToast({
							icon: 'none',
							title: res.msg,
						});
						this.toMain(data);
					}).catch(err => {
						uni.showToast({
							icon: 'none',
							title: err.msg,
						});
					})
				}
					
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					account: this.account,
					password: this.password
				};
				console.log(data)
				login.login(data).then(res => {
					uni.showToast({
						icon: 'none',
						title: res.msg,
					});
					console.log(res)
					this.toMain(data);
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: err.msg,
					});
				})
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								console.log(13)
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			toMain(data) {
				this.login(data);
				service.clearUser()
				service.addUser(data)
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				//if (this.forcedLogin) {
					uni.reLaunch({
						url: '../index/index',
					});
				/* } else {
					uni.navigateBack();
				} */

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}
	}
</script>

<style>
	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}
	.cu-bar {
		height: 50px;
		font-size: 16px;
	}
	.cu-avatar.imgxl {
	    width: 90px;
	    height: 90px;
	    font-size: 2.5em;
	}
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 10px;
	}
	
	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}
	
	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}
	
	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}
	
	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}
	
	button.primary {
		background-color: #0faeff;
	}
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
