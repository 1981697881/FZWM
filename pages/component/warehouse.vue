<template>
	<view>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">仓库管理</block></cu-custom>
	<scroll-view scroll-y class="page">
		<view class="nav-list">
			<navigator hover-class='none' :url="'/pages/component/warehouse/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
			  v-for="(item,index) in elements" :key="index">
				<view class="nav-title text-center">{{item.title}}</view>
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
				elements: [
					/* {
						title: '其他入库',
						name: 'ICReceive',
						color: 'cyan',
					},
					{
						title: '其他出库',
						name: 'otherOutbound',
						color: 'cyan',
					},{ 
						title: '上架',
						name: 'shelves',
						color: 'cyan',
					},
					{
						title: '下架',
						name: 'undercarriage',
						color: 'cyan',
					}, */
					{
						title: '调拨有源单',
						name: 'transfersActive',
						color: 'cyan',
					},{
						title: '调拨无源单',
						name: 'transfersPassive',
						color: 'cyan',
					},
					/* {
						title: '组装',
						name: 'nav',
						color: 'cyan',
					},{
						title: '拆卸',
						name: 'bar',
						color: 'cyan',
					},
					{
						title: '盘点',
						name: 'Inventory',
						color: 'cyan',
					},{
						title: '盘点报告',
						name: 'bar',
						color: 'cyan',
					},
					{
						title: '即时盘点',
						name: 'nav',
						color: 'cyan',
					}, */
					{ 
						title: '盘盈单',
						name: 'inventoryProfit',
						color: 'cyan',
					},
					{
						title: '盘亏单',
						name: 'dishDeficient',
						color: 'cyan',
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
