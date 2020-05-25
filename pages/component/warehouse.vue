<template>
	<view>
	<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">仓库管理</block></cu-custom>
	<scroll-view scroll-y class="page">
		<view class="nav-list">
			<navigator hover-class='none' :url="'/pages/component/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
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
						title: '其他入库',
						name: 'bar',
						color: 'purple',
					},
					{
						title: '其他出库',
						name: 'nav',
						color: 'mauve',
					},{
						title: '上架',
						name: 'bar',
						color: 'purple',
					},
					{
						title: '下架',
						name: 'nav',
						color: 'mauve',
					},{
						title: '调拨',
						name: 'bar',
						color: 'purple',
					},
					{
						title: '组装',
						name: 'nav',
						color: 'mauve',
					},{
						title: '拆卸',
						name: 'bar',
						color: 'purple',
					},
					{
						title: '盘点',
						name: 'nav',
						color: 'mauve',
					},{
						title: '盘点报告',
						name: 'bar',
						color: 'purple',
					},
					{
						title: '即时盘点',
						name: 'nav',
						color: 'mauve',
					},{
						title: '盘盈单',
						name: 'bar',
						color: 'purple',
					},
					{
						title: '盘亏单',
						name: 'nav',
						color: 'mauve',
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
