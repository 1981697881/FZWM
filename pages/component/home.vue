<template name="components">
	<view>
		<scroll-view scroll-y class="page">
			<view class="cu-bar bg-cyan">
				<view ></view>
				<view class="content">
				</view>
				<view class="action">
					<navigator :url="'/pages/component/bar'">
						<text class="cuIcon-settings" style="font-size: 21px;"></text>
					</navigator>
				</view>
			</view>
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
						title: '采购管理',
						name: 'procurement',
						color: 'purple',
						cuIcon: 'vipcard'
					},
					{
						title: '销售管理',
						name: 'sales',
						color: 'mauve',
						cuIcon: 'formfill'
					},
					{
						title: '生产管理',
						name: 'production',
						color: 'pink',
						cuIcon: 'list'
					},
					{
						title: '仓库管理',
						name: 'warehouse',
						color: 'brown',
						cuIcon: 'newsfill'
					},
					{
						title: '委外',
						name: 'outsourcing',
						color: 'red',
						cuIcon: 'formfill'
					},
					{
						title: '车间管理',
						name: 'workshop',
						color: 'orange',
						cuIcon: 'timefill'
					},
					{
						title: '库存查询',
						name: 'inventory',
						color: 'green',
						cuIcon: 'messagefill'
					},
					{
						title: '快速录单',
						name: 'indent',
						color: 'olive',
						cuIcon: 'album'
					},
				],
			};
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
