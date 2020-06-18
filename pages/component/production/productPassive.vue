<template>
	<view>
		<uni-fab
	    :pattern="pattern"
	    :horizontal="horizontal"
		:vertical="vertical"
		:popMenu="popMenu"
		:direction="direction"
		 @fabClick="fabClick"
		 ></uni-fab>
		
	<cu-custom bgColor="bg-gradual-blue" class="customHead" :isBack="true"><block slot="backText">返回</block><block slot="content">产品入库</block></cu-custom>
	<view class="box getheight">
		<view class="cu-bar bg-white solid-bottom" style="height: 30px;">
			<view class="action">
				单号：<text>{{lento}}</text>
			</view>
			<view class="action">
				日期：
				<ruiDatePicker
				    fields="day"
					class='ruidata'
				    :start="'2010-00-00'"
				    end="2030-12-30"
					:value="start"
				    @change="bindChange2"
				></ruiDatePicker>
			</view>
			<view class="action">
				包数：<text>123</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="height: 30px;">
			<view class="action">
				<view style="width: 90px;">部门：</view>
				        <ld-select :list="options"
				        list-key="label" value-key="value"
				        placeholder="请选择"
				        clearable
				        v-model="value"
				        @change="selectChange"></ld-select>
			</view>
			<view class="action">
				<view style="width: 90px;">部门：</view>
				        <ld-select :list="options"
				        list-key="label" value-key="value"
				        placeholder="请选择"
				        clearable
				        v-model="value"
				        @change="selectChange"></ld-select>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="height: 30px;">
			<view class="action">
				<view class="title">备注：</view>
				<input  name="input" style="font-size: 13px;"></input>
				
			</view>
			<button class="cu-btn round lines-blue line-blue shadow" @tap="showModal" data-target="Modal">详情</button>
		</view>
	</view>
	<view class="cu-modal" :class="modalName=='Modal'?'show':''">
		<view class="cu-dialog" style="height: 150px;">
			<view class="cu-bar bg-white justify-end" style="height: 30px;">
				<view class="content">Modal标题</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-sm">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">文本：</text>
					</view>
					<view class="action">
						<text class="text-grey">小目标还没！</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">文本：</text>
					</view>
					<view class="action">
						<text class="text-grey">小目标还没！</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	<scroll-view scroll-y class="page" :style="{ 'height': pageHeight + 'px' }">
		<view class="cu-tabbar-height" v-for="(item,index) in cuIList" :key="index">
				<view class="cu-list menu-avatar">
					<view class="cu-item" style="width: 100%;margin-top: 2px;height: 80px;"  :class="modalName=='move-box-'+ index?'move-cur':''" 
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" >
						<view style="clear: both;width: 100%;" class="grid text-center col-2">
							<view class="text-grey">{{item.number}}</view>
							<view class="text-grey">{{item.name}}</view>
							<view class="text-grey" >序号:{{index}}</view>
							<view class="text-grey" >数量:{{item.quantity}}</view>
							<view class="text-grey" >型号:{{item.model}}</view>
							<view class="text-grey" >单位:{{item.unitName}}</view>
							<view class="text-grey" >{{pickerVal>-1?picker[pickerVal]:''}}</view>
							<view class="text-grey" >
								<picker @change="PickerChange" :value="index" :range="picker">
									<view class="picker">
										<button @tap="checkWrm" class="cu-btn sm round bg-green shadow">
										<text class="cuIcon-homefill">
										</text>仓库</button>
									</view>
								</picker>
								</view>
						</view>
						<!-- <view class="content">
							<view class="text-grey">{{item.number}}</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">
									{{item.name}}
								</view> 
							</view>
							<view class="text-grey">{{item.number}}</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">型号:{{item.model}}</view>
							<view class="cu-tag round bg-grey sm">单位:{{item.unitName}}</view>
							<view class="cu-tag round bg-grey sm">数量:{{item.unitName}}</view>
						</view>
						<view class="round lg">
							
						</view> -->
						<view class="move">
							<view class="bg-red">删除</view>
						</view>
					</view>
				</view>
		</view>
		<view class="cu-bar tabbar shadow foot">
			<view class="box text-center">
				<button class="cu-btn bg-green shadow-blur round lg" style="width: 50%;">提交</button>
			</view>
		</view>
	</scroll-view>
	</view>
</template>
<script>
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	 import ldSelect from '@/components/ld-select/ld-select.vue'
	 import uniFab from '@/components/uni-fab/uni-fab.vue';
	import basic from '@/api/basic';
	export default {
		 components: {ruiDatePicker, ldSelect, uniFab},
			data() {
				return {
					lento: 123456412,
					start: null,
					picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
					pickerVal: -1,
					pageHeight: 0,
					keyword: '',
					value: '',
					modalName: null,
					gridCol: 3,
					skin: false,
					listTouchStart: 0,
					listTouchDirection: null,
					 options: [{
					                  value: '选项1',
					                  label: '黄金糕'
					                }, {
					                  value: '选项2',
					                  label: '双皮奶'
					                }, {
					                  value: '选项3',
					                  label: '蚵仔煎'
					                }, {
					                  value: '选项4',
					                  label: '龙须面'
					                }, {
					                  value: '选项5',
					                  label: '北京烤鸭'
					                }],
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
									cuIList: [{
										billNo: "WORK018520",
										label: "HL-006",
										model: "12",
										name: "HL-127开稀水",
										number: "C.HL.006.001",
										tranType: "85",
										unitName: "KG",
										unitNumber: "00",
									}],					
				};
			},
		 onReady: function() {
			 var me = this
			 uni.getSystemInfo({
			 　　success: function(res) { // res - 各种参数
			 　　   let info = uni.createSelectorQuery().select(".getheight");
			 　　   let customHead = uni.createSelectorQuery().select(".customHead");
					 var infoHeight = 0;
					 var headHeight = 0;
			 　　　  　info.boundingClientRect(function(data) { //data - 各种参数
						infoHeight = data.height
			 　　    }).exec();
					customHead.boundingClientRect(function(data) { //data - 各种参数
						headHeight = data.height
			 　　    }).exec();
			 setTimeout(function () {
				 console.log(infoHeight +','+ headHeight)
			 					me.pageHeight= res.windowHeight - infoHeight - headHeight
			 				}, 1000);
			        }
			 });
			  this.start = this.getDay('', 0).date
    },
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// 查询前后三天日期
			     getDay(date, day){
			       var today = new Date();
			        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day
			        today.setTime(targetday_milliseconds) //注意，这行是关键代码
			        var tYear = today.getFullYear()
			        var tMonth = today.getMonth()
			        var tDate = today.getDate()
			        var getDay = today.getDay()
			        tMonth = this.doHandleMonth(tMonth + 1)
			        tDate = this.doHandleMonth(tDate)
			        var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
			        var week = weeks[getDay]
			        return {
			          day: tDate,
			          week: week,
			          date: tYear + "-" + tMonth + "-" + tDate
			        }
			      },
			      doHandleMonth(month) {
			        var m = month;
			        if(month.toString().length == 1) {
			          m = "0" + month;
			        }
			        return m;
			      },
				 selectChange(val){
				         this.value = val
				   },
				 // 查询条件过滤
				      qFilter() {
				        let obj = {}
				        this.keyword != null && this.keyword != '' ? obj.docNo = this.keyword : null
				        this.value != null && this.value != undefined ? obj.businessDateEnd = this.value[1] : null
				        this.value != null && this.value != undefined ? obj.businessDateStart = this.value[0] : null
				        return obj
				      },
					  bindChange1(e){
						   this.start = e
						  }, 
						   bindChange2(e){
						   this.end = e
						  },
		search(){
		},
		PickerChange(e) {
			console.log(e.detail.value)
			this.pickerVal = e.detail.value
		},
		fabClick() {
			var that = this
			uni.scanCode({
				success:function(res){
					basic.barcodeScan({'uuid':res.result}).then(reso => {
						if(reso.success){
							that.cuIList.push(reso.data)
							console.log(that.cuIList)
						}
					}).catch(err => {
						uni.showToast({
							icon: 'none',
							title: reso.msg,
						});
					})
					
				}
			});
		},// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style>
	.cu-item{
		float: left;
		width: 50%;
	}
	.cu-item .content{
		float: left;
	}
	.cu-list.menu-avatar>.cu-item .content{
		left: 5px;
	}
	.cu-list.menu-avatar>.cu-item .action{
		
	}
	.input{
		height: 30px;
	}
	.box{
		width: 100%;
	}
	.uni-input-placeholder, .uni-input-input{
		font-size: 13px;
	}
	.action,.content{
		font-size: 13px !important;
	}
	.ruidata{
		font-size: 13px;
		height: 7vw;
	}
	.cu-bar{
		min-height: 30px;
	}
	/* .page {
		height: calc(100vh - 320upx);
	} */
	.nav-title::first-letter {
	    font-size: 16px;
	    margin-right: 2px;
	}
</style>
