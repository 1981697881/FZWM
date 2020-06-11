<template>
	<view>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">销售管理</block></cu-custom>
	<scroll-view scroll-y class="page">
		<view class="nav-list">
			<navigator hover-class='none' :url="'/pages/component/sales/' + item.url" class="nav-li" navigateTo :class="'bg-'+item.color"
			 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
				<view class="nav-title">{{item.title}}</view>
				<view class="nav-name">{{item.name}}</view>
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
						title: '有源单',
						name: '销售出库',
						url: 'salesActive',
						color: 'blue',
						cuIcon: 'vipcard'
					},
					{
						title: '无源单',
						name: '销售出库',
						url: 'salesPassive',
						color: 'blue',
						cuIcon: 'vipcard'
					},
				],
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
	.nav-list{
		margin-top: 5%;
	}
	.nav-title::first-letter {
	    font-size: 16px;
	    margin-right: 2px;
	}
</style>
