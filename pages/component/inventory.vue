<template>
	<view>
	<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">库存查询</block></cu-custom>
	<scroll-view scroll-y class="page">
		
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
