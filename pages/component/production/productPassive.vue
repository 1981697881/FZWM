<template>
	<view>
		<uni-fab
	    :pattern="pattern"
	    :horizontal="horizontal"
		:vertical="vertical"
		:popMenu="popMenu"
		distable
		:direction="direction"
		 @fabClick="fabClick"
		 ></uni-fab>
	<cu-custom bgColor="bg-gradual-blue" class="customHead" :isBack="true"><block slot="backText">返回</block><block slot="content">产品入库</block></cu-custom>
	<view class="box getheight">
		<view class="cu-bar bg-white solid-bottom" style="height: 30px;">
			<view class="action">
				单号:<text>{{form.finBillNo}}</text>
			</view>
			<view class="action">
				日期:
				<ruiDatePicker
				    fields="day"
					class='ruidata'
				    start="'2020-00-00'"
				    end="2030-12-30"
					:value="form.fdate"
				    @change="bindChange"
				></ruiDatePicker>
			</view>
			<view class="action">
				包数:<text>{{form.bNum}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="height: 30px;">
			<view class="action">
				<view style="width: 90px;">部门:</view>
				        <ld-select :list="deptList"
				        list-key="FName" value-key="FNumber"
				        placeholder="请选择"
				        clearable
				        v-model="form.fdeptID"
				        @change="deptChange"></ld-select>
			</view>
			<view class="action">
				<view style="width: 90px;">仓库:</view>
				        <ld-select :list="stockList"
				        list-key="FName" value-key="FNumber"
				        placeholder="请选择"
				        clearable
				        v-model="form.fdCStockId"
				        @change="stockChange"></ld-select>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="height: 30px;">
			<view class="action">
				<view class="title">备注:</view>
				<input name="input" style="font-size: 13px;" v-model="form.fnote"></input>
				
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
	<view class="cu-modal" :class="modalName2=='Modal'?'show':''">
		<view class="cu-dialog" style="height: 150px;">
			<view class="cu-bar bg-white justify-end" style="height: 30px;">
				<view class="content">{{popupForm.headName}}</view>
				<view class="action" @tap="hideModal2">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view>
				<view class="cu-item" style="width: 100%;">
					<view class="flex">
						<view class="flex-sub">
							<view class="cu-form-group">
								<view class="title">批号:</view>
								<input name="input" style="border-bottom: 1px solid;" v-model="popupForm.fbatchNo"></input>
							</view>
						</view>
						<view class="flex-sub">
							<view class="cu-form-group">
								<view class="title">数量:</view>
								<input name="input" style="border-bottom: 1px solid;" v-model="popupForm.quantity"></input>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item" style="width: 100%;">
					<view class="flex">
						<view class="flex-sub">
							<view class="cu-form-group">
								<view class="title">库位:</view>
								<input name="input" style="border-bottom: 1px solid;" v-model="popupForm.quantity"></input>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="clear: both;" class="cu-bar bg-white justify-end padding-bottom-xl">
				<view class="action">
					<button class="cu-btn line-green text-green" @tap="hideModal2">取消</button>
					<button class="cu-btn bg-green margin-left" @tap="$manyCk(saveCom)">确定</button>
				</view>
			</view>
		</view>
	</view>
	<scroll-view scroll-y class="page" :style="{ 'height': pageHeight + 'px' }">
		<view class="cu-tabbar-height" v-for="(item,index) in cuIList" :key="index">
				<view class="cu-list menu-avatar">
					<view class="cu-item" style="width: 100%;margin-top: 2px;height: 80px;"  :class="modalName=='move-box-'+ index?'move-cur':''" 
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" >
						<view style="clear: both;width: 100%;" class="grid text-center col-2" @tap="showModal2(index, item)" data-target="Modal" data-number="item.number">
							<view class="text-grey">{{item.number}}</view>
							<view class="text-grey">{{item.name}}</view>
							<view class="text-grey">序号:{{index}}</view>
							<view class="text-grey">数量:{{item.quantity}}</view>
							<view class="text-grey">批号:{{item.fbatchNo}}</view>
							<view class="text-grey">单位:{{item.unitName}}</view>
							<view class="text-grey">{{pickerVal==-1?'':stockList[pickerVal].FName}}</view>
							<view class="text-grey">
								<picker @change="PickerChange" :value="pickerVal" :range-key="'FName'" :range="stockList">
									<view class="picker">
										<button class="cu-btn sm round bg-green shadow" >
										<text class="cuIcon-homefill">
										</text>仓库</button>
									</view>
								</picker>
								</view>
						</view>
						<view class="move">
							<view class="bg-red" @tap="del(index,item)">删除</view>
						</view>
					</view>
				</view>
		</view>
		<view class="cu-bar tabbar shadow foot">
			<view class="box text-center">
				<button class="cu-btn bg-green shadow-blur round lg" style="width: 50%;" @tap="$manyCk(saveData)">提交</button>
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
					pageHeight: 0,
					headName: '',
					pickerVal: -1,
					modalName: null,
					modalName2: null,
					gridCol: 3,
					form: {
						finBillNo: null,
						fdate: null,
						bNum: '123',
						fnote: '',
						fdCStockId: '',
						fdeptID: '',
					},
					popupForm: {
						fbatchNo: ''
					},
					skin: false,
					listTouchStart: 0,
					listTouchDirection: null,
					deptList: [],
					stockList: [],
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
					cuIList: [],					
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
			 		me.pageHeight= res.windowHeight - infoHeight - headHeight
			 		}, 1000);
			      }
			 });
			  this.form.fdate = this.getDay('', 0).date
			  basic.getBillNo({'TranType':2}).then(res => {
			  	if(res.success){
			  		me.form.finBillNo=res.data
			  	}
			  }).catch(err => {
			  	uni.showToast({
			  		icon: 'none',
			  		title: res.msg,
			  	});
			  });
			  basic.getDeptList({}).then(res => {
			  	if(res.success){
			  		me.deptList=res.data
			  	}
			  }).catch(err => {
			  	uni.showToast({
			  		icon: 'none',
			  		title: res.msg,
			  	});
			  });
			  basic.getStockList({}).then(res => {
			  	if(res.success){
			  		me.stockList=res.data
			  	}
			  }).catch(err => {
			  	uni.showToast({
			  		icon: 'none',
			  		title: res.msg,
			  	});
			  })
    },
		methods: {
			saveData(){
				const portData = this.form
				let list = this.cuIList
				let array = []
				for(let i in list){
					array.push(list[i])	
				}
				portData.items = array
				console.log(portData)
				/* basic.productStockIn(portData).then(res => {
					if(res.success){
						console.log(res)
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: res.msg,
					});
				}) */
			},
			saveCom(){
				this.modalName2 = null
			},
			del(index, item) {
				this.cuIList.splice(index,1)
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			showModal2(index, item) {
				this.modalName2 = 'Modal'
				this.popupForm = {}
				this.popupForm = item
			},
			hideModal(e) {
				this.modalName = null
			},
			hideModal2(e) {
				this.modalName2 = null
				this.popupForm = {}
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
				 deptChange(val){
				         this.fdeptID = val
				   },
				   stockChange(val){
				           this.fdCStockId = val
				     },
					  bindChange(e){
						   this.fdate = e
						  }, 
		PickerChange(e) {
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
