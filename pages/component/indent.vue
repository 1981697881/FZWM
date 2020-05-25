<template>
	<view>
	<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">快速录单</block></cu-custom>
	<scroll-view scroll-y class="page">
		<view class="nav-list">
			
		</view>
		<view class="cu-tabbar-height"></view>
	</scroll-view>
	<view class="cu-bar tabbar bg-white shadow foot">
		<view class="box">
			<view class="cu-bar btn-group">
				<button class="cu-btn bg-green shadow-blur">入库</button>
				<button class="cu-btn text-green line-green shadow">出库</button>
			</view>
			<view class="cu-bar btn-group">
				<button class="cu-btn bg-green shadow-blur round">移库</button>
				<button class="cu-btn bg-blue shadow-blur round">盘点</button>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
		
		}
	}
</script>

<style>
	.box{
		width: 100%;
	}
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
