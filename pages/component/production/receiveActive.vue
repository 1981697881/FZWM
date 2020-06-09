<template>
	<view>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">领料</block></cu-custom>
	<scroll-view scroll-y class="page">
		<view class="box">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>						</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</scroll-view>
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
	.page {
		height: 100vh;
	}
	.nav-title::first-letter {
	    font-size: 16px;
	    margin-right: 2px;
	}
</style>
