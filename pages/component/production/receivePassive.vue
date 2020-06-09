<template>
	<view>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">领料</block></cu-custom>
	<scroll-view scroll-y class="page">
		<view class="nav-list">
			<navigator hover-class='none' :url="'/pages/component/' + item.name" class="nav-li " navigateTo :class="'bg-'+item.color"
			  v-for="(item,index) in elements" :key="index">
				<view class="nav-title">{{item.title}}</view>
				<text :class="'cuIcon-' + item.cuIcon"></text>
			</navigator>
		</view>
		<view class="cu-tabbar-height"></view>
	</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				elements: [{
						title: '销售出库（有源单）',
						name: 'bar',
						color: 'cyan'
					},
					{
						title: '销售出库（无源单）',
						name: 'nav',
						color: 'cyan'
					},
				],
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
