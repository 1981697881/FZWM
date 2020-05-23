<template>
	<view>
		<components v-if="PageCur=='component'"></components>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'component'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
