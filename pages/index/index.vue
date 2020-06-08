<template>
	<view>
		<components v-if="PageCur=='component'"></components>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
		return {
				PageCur: 'component'
			}
		},
		/* onLoad(){
			if(service.getUsers().length<=0){
				uni.reLaunch({
					url: '../login/login',
				});
			}else{
				if(service.getUsers()[0].username =='' && service.getUsers()[0].username == "undefined"){
					 uni.reLaunch({
					 	url: '../login/login',
					 });
				}
			}
		}, */
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
