<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">文档查询</block>
		</cu-custom>
		<web-view style="margin-top: 14%;" :src="allUrl" @message="getMessage"></web-view>
	</view>
</template>

<script>
import basic from '@/api/basic';
export default {
	data() {
		return {
			src: '',
			allUrl: '',
			viewerUrl: 'http://xyy.gzfzdev.com:8866/xyy/web/viewer.html' // 格式化文件流的一个js 文件 文末会分享出来
		};
	},
	onLoad(options) {
		let fileUrl = encodeURIComponent('https://tz.xinyuanhengye.cn:8088/tz.html?file=2480.pdf'); // encodeURIComponent 函数可把字符串作为 URI 组件进行编码。
		this.allUrl = this.viewerUrl + '?file=' + fileUrl;
		console.log(this.allUrl);
	},
	methods: {
		getMessage(e) {
			let data = e.detail.data;
			console.log(JSON.stringify(data));
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
