<template>
	<view>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">生产管理</block></cu-custom>
	<scroll-view scroll-y class="page">
		<view class="nav-list">
			<navigator hover-class='none' :url="'/pages/component/production/' + item.url" class="nav-li" navigateTo :class="'bg-'+item.color"
			 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
				<view class="nav-title">{{item.name}}</view>
				<view class="nav-name">{{item.title}}</view>
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
						name: '领料',
						url: 'receiveActive',
						color: 'blue',
						cuIcon: 'vipcard'
					},
					{
						title: '无源单',
						name: '领料',
						url: 'receivePassive',
						color: 'blue',
						cuIcon: 'vipcard'
					},{
						title: '有源单',
						name: '产品入库',
						url: 'productActive',
						color: 'blue',
						cuIcon: 'vipcard'
					},
					{
						title: '无源单',
						name: '产品入库',
						url: 'productPassive',
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
