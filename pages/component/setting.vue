<template>
	<view>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">系统设置</block></cu-custom>
	<scroll-view scroll-y class="page">
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']" style="padding: 5px;">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">系统设置</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-btn text-olive"></text>
					<text class="text-grey">检查更新</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact" @tap="onLoginOut">
					<text class="cuIcon-discoverfill text-orange"></text>
					<text class="text-grey">退出登录</text>
				</button>
			</view>
		</view>
	</scroll-view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations(['logout']),
			onLoginOut() {
				const me = this
				uni.showModal({
					title: '提示',
					content: '是否退出？',
					success: function(res) {
						if (res.confirm) {
							me.logout() 
							service.clearUser()
							// 退出当前应用，改方法只在App中生效  
							uni.reLaunch({
								url: '../login/login',
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				return true;
			},
		}
	}
</script>

<style>
	.nav-li {
		width: 60%;
		text-align: center;
		margin-left: 20%;
	}
	.page {
		height: 100vh;
	}
	.nav-list{
		margin-top: 5%;
	}
	.nav-title::first-letter {
	    font-size: 16px;
	    margin-right: 2px;
	}
</style>
