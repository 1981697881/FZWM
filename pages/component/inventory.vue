<template>
	<view>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">库存查询</block></cu-custom>
	<loading :loadModal="loadModal"></loading>
	<uni-fab
	:pattern="pattern"
	:horizontal="horizontal"
	:vertical="vertical"
	:popMenu="popMenu"
	distable
	:direction="direction"
	 @fabClick="fabClick"
	 ></uni-fab>
	<scroll-view scroll-y class="page">
		
	</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			loadModal: false,
			horizontal: 'right',
			vertical: 'bottom',
			popMenu: false,
			direction: 'horizontal',
			pattern: {
				color: '#7A7E83',
				backgroundColor: '#fff',
				selectedColor: '#007AFF',
				buttonColor: '#007AFF'
			},
			};
		},
		methods: {
		fabClick() {
			var that = this
			uni.scanCode({
				success:function(res){
					basic.barcodeScan({'uuid':res.result}).then(reso => {
						if(reso.success){
							if(that.isOrder){
								if(reso.data['billNo'] != '' && reso.data['billNo'] != null){
									let number = 0;
									  for(let i in that.cuIList){
										  if(reso.data['number'] == that.cuIList[i]['number']){
											  if(reso.data['quantity'] == null){
											  	reso.data['quantity'] = 1
											  }
											  that.cuIList[i]['quantity'] =  parseFloat(that.cuIList[i]['quantity']) + parseFloat(reso.data['quantity'])
											  number ++
											  break
										  } 
									  }
									  if(number == 0){
										  if(reso.data['quantity'] == null){
										  	reso.data['quantity'] = 1
										  }
										  that.cuIList.push(reso.data)
										  that.form.bNum = that.cuIList.length
										  
									  }
								}else{
									uni.showToast({
										icon: 'none',
										title: '该物料没有单据信息',
									});
								}
							}else{
								console.log(reso.data)
								let number = 0;
								  for(let i in that.cuIList){
									  if(reso.data['number'] == that.cuIList[i]['number']){
										  if(reso.data['quantity'] == null){
										  	reso.data['quantity'] = 1
										  }
										  that.cuIList[i]['quantity'] =  parseFloat(that.cuIList[i]['quantity']) + parseFloat(reso.data['quantity'])
										  number ++
										  break
									  } 
								  }
								  if(number == 0){
									  if(reso.data['quantity'] == null){
									  	reso.data['quantity'] = 1
									  }
									  that.cuIList.push(reso.data)
									  that.form.bNum = that.cuIList.length
									  
								  }
							}
						}
					}).catch(err => {
						uni.showToast({
							icon: 'none',
							title: err.msg,
						});
					})
					
				}
			});
		}
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
