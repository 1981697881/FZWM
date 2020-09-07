<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">仓库管理</block>
		</cu-custom>
		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator
					v-if="item.color == 'olive' ? false : true"
					hover-class="none"
					:url="'/pages/component/warehouse/' + item.path+'?source='+item.source"
					class="nav-li"
					navigateTo
					:class="'bg-' + item.color"
					v-for="(item, index) in elements"
					:key="index"
				>
					<view class="nav-title text-center">{{ item.name }}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
				<view v-if="item.color == 'olive'" @tap="$manyCk(fabClick)" class="nav-li" :class="'bg-' + item.color" v-for="(item, index) in elements" :key="index">
					<view class="nav-title text-center">{{ item.name }}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
import basic from '@/api/basic';
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
					}, 
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
					}, 
					{ 
						title: '盘盈单',
						name: 'inventoryProfit',
						color: 'cyan',
					},
					{
						title: '盘亏单',
						name: 'dishDeficient',
						color: 'cyan',
					},*/
			]
		};
	},
	onLoad: function(option) {
		let me = this;
		if (JSON.stringify(option) != '{}') {
			basic.getSysMenuById(option.id).then(rest => {
				let data = rest.data;
				this.elements = data;
			});
		}
	},
	methods: { 
		fabClick() {
			var that = this;
			let resultA = []; 
			uni.scanCode({
				success: function(res) {
					basic.barcodeScan({ uuid: res.result }).then(reso => {
							console.log(reso)
							if (reso.data.chartNumber != null && typeof reso.data.chartNumber != 'undefined') {
								// 预览图片
								uni.navigateTo({
									url: 'warehouse/documentEnquiry?chartNumber='+reso.data.chartNumber
								});
								/* uni.previewImage({
								  urls: ['https://tz.xinyuanhengye.cn:8088/tz.html?file=' + reso.data.chartNumber + '.pdf'],
								  longPressActions: {
								    itemList: ['发送给朋友', '保存图片', '收藏'],
								    success: function(data) {
								      console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
								    },
								    fail: function(err) {
								      console.log(err.errMsg);
								    }
								  }
								}) */
								/* uni.downloadFile({
									url: 'https://tz.xinyuanhengye.cn:8088/tz.html?file=' + reso.data.chartNumber + '.pdf',
									success: function(resr) {
										var filePath = resr.tempFilePath;
										uni.openDocument({
											filePath: filePath,
											success: function(rest) {
												console.log('打开文档成功');
											}
										});
									}
								}); */
							} else {
								uni.showToast({
									icon: 'none',
									title: '该二维码没有图号'
								});
							}
						})
						.catch(err => {
							uni.showToast({
								icon: 'none',
								title: err.msg
							});
						});
				}
			});
		}
	}
};
</script>

<style>
.page {
	height: 100vh;
}
.nav-list {
	margin-top: 5%;
}
.nav-title::first-letter {
	font-size: 16px;
	margin-right: 2px;
}
</style>
