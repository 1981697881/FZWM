<template>
	<view>
		<loading :loadModal="loadModal"></loading>
	<cu-custom bgColor="bg-gradual-blue" class="customHead" :isBack="true"><block slot="backText">返回</block><block slot="content">汇报</block></cu-custom>
		<uni-fab
	    :pattern="pattern"
	    :horizontal="horizontal"
		:vertical="vertical"
		cuIcon="add"
		:popMenu="popMenu"
		distable
		:direction="direction"
		 @fabClick="fabClick"
		 ></uni-fab>
	<view class="box getheight">
		<view class="cu-bar bg-white solid-bottom" style="height: 60upx;">
			<view class="action">
				单号:<text>{{form.finBillNo}}</text>
			</view>
			<view class="action">
				卡号:<text>{{form.bNum}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="height: 60upx;">
			<view class="action">
				金蝶号:<text>{{form.finBillNo}}</text>
			</view>
			<view class="action">
				生产批次:<text>{{form.bNum}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="height: 60upx;">
			<view class="action">
				产品编码:<text>{{form.finBillNo}}</text>
			</view>
			<view class="action">
				产品名称:<text>{{form.bNum}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="height: 60upx;">
			<view class="action">
				规格型号:<text>{{form.finBillNo}}</text>
			</view>
			<view class="action">
				计划量:<text>{{form.bNum}}</text>
			</view>
		</view><view class="cu-bar bg-white solid-bottom" style="height: 60upx;">
			<view class="action">
				派工数量:<text>{{form.finBillNo}}</text>
			</view>
			
		</view>
	</view>
	<view class="cu-modal" :class="modalName=='Modal'?'show':''">
		<view class="cu-dialog" style="height: 350upx;">
			<view class="cu-bar bg-white justify-end" style="height: 60upx;">
				<view class="content">温馨提示</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-sm">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">用户：{{form.username}}</text>
					</view>
					<view class="action">
						<text class="text-grey"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="cu-modal" :class="modalName2=='Modal'?'show':''">
		<view class="cu-dialog" style="height: 150px;">
			<view class="cu-bar bg-white justify-end" style="height: 60upx;">
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
								<input name="input" type='digit' style="border-bottom: 1px solid;" v-model="popupForm.quantity"></input>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item" style="width: 100%;">
					<view class="flex">
						<view class="flex-sub">
							<view class="cu-form-group">
								<view class="title">库位:</view>
								<input name="input" style="border-bottom: 1px solid;" v-model="popupForm.positions"></input>
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
		<view class="cu-bar bg-olive solid-bottom" style="height: 60upx;">
			<view class="action">
				<view style="width: 90px;">人员:</view>
				        <ld-select :list="deptList"
				        list-key="FName" value-key="FNumber"
				        placeholder="请选择"
				        clearable
				        v-model="form.fdeptID"
				        @change="deptChange"></ld-select>
			</view>
			<view class="action">
				<view style="width: 90px;">工序:</view>
				        <ld-select :list="deptList"
				        list-key="FName" value-key="FNumber"
				        placeholder="请选择"
				        clearable
				        v-model="form.fdeptID"
				        @change="deptChange"></ld-select>
			</view>
		</view>
		<view class="cu-bar bg-olive solid-bottom" style="height: 60upx;">
			<view class="action">
				生产数量:<text>{{form.finBillNo}}</text>
			</view>
			<view class="action">
				合格数量:<text>{{form.bNum}}</text>
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
	import production from '@/api/production';
	import service from '@/service.js';
	import loading from '@/components/loading';
	export default {
		 components: {ruiDatePicker, ldSelect, uniFab, loading},
			data() {
				return {
					pageHeight: 0,
					headName: '',
					isOrder: false,
					loadModal: false,
					pickerVal: null,
					modalName: null,
					modalName2: null,
					gridCol: 3,
					form: {
						finBillNo: null,
						fdate: '',
						bNum: 0,
						fnote: '',
						fbillerID: null,
						fdCStockId: '',
						fdeptID: '',
					},
					popupForm: {
						fbatchNo: '',
						positions: '',
						quantity: '',
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
					startDate: null,
					endDate: null,	
				};
			},
			 onLoad: function (option) {
				 let me = this
				if(JSON.stringify(option) != "{}"){
					 this.isOrder = true
					 me.form.fdeptID = option.FDeptNumber 
					 this.startDate = option.startDate
					 this.endDate = option.endDate 
					 this.billNo = option.billNo 
					 basic.getOrderList({
					 	 billNo: option.billNo,
					 	 startDate: option.startDate,
					 	endDate: option.endDate,
					 	tranType: option.tranType,
					 	 type: option.type,
					 }).then(res => {
					 	if(res.success){
					 		let data = res.data
					 			for(let i in data){
					 				me.cuIList.push({
					 					Fdate: data[i].Fdate,
					 					number: data[i].FItemNumber,
					 					name: data[i].FItemName,
					 					model: data[i].FModel,
					 					Fauxprice: data[i].Fauxprice,
					 					Famount: data[i].Famount,
										FBatchManager: data[i].FBatchManager,
					 					fsourceBillNo: data[i].FBillNo,
					 					fsourceEntryID: data[i].FEntryID,
					 					quantity: data[i].Fauxqty, 
					 					fsourceTranType: data[i].FTranType,
					 					unitID: data[i].FUnitNumber,
					 					unitName: data[i].FUnitName
					 			})
					 		}
					 		me.form.bNum = res.data.length
							
					 		
					 	}
					 }).catch(err => {
					 	uni.showToast({
					 		icon: 'none',
					 		title: err.msg,
					 	});
					 })
				 }
			 },
		 onReady: function() {
			 var me = this
			 me.loadModal = true
			 if(service.getUsers().length > 0){
			 	if(service.getUsers()[0].account !='' && service.getUsers()[0].account != "undefined"){
					me.form.fbillerID = service.getUsers()[0].userId
					me.form.username = service.getUsers()[0].username
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
						me.initMain()
						
						 
				}
			}
			
    },
		methods: {
			clearList() {
				const that = this
				if(that.cuIList.length>0){
					uni.showModal({
						title: '温馨提示',
						content: '是否清空列表，清空之后将无法还原！',
						success: function (res) {
							if (res.confirm) {
							   that.cuIList = []
							   that.initMain()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			initMain(){
				const me = this
				this.form.fdate = this.getDay('', 0).date
				basic.getBillNo({'TranType':24}).then(res => {
					if(res.success){
						me.form.finBillNo=res.data
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: err.msg,
					});
				});
				basic.getDeptList({}).then(res => {
					if(res.success){
						me.deptList=res.data
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: err.msg,
					});
				});
				basic.getStockList({}).then(res => {
					if(res.success){
						me.stockList=res.data
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: err.msg,
					});
				})
				me.loadModal = false
			},
			saveData(){
				let portData = {}
				let result = []
				let list = this.cuIList
				let array = []
				let isBatchNo = false
				for(let i in list){
					let obj = {}
					obj.fauxqty = list[i].quantity
					obj.fentryId = list[i].index
					obj.finBillNo = this.form.finBillNo
					obj.fitemId = list[i].number
					if(list[i].FBatchManager){
						if(list[i].fbatchNo != '' && list[i].fbatchNo != null){
							obj.fbatchNo = list[i].fbatchNo 
							isBatchNo = true
						}else{
							isBatchNo = false
							break
						}
					}else{
						if(list[i].fbatchNo == '' || list[i].fbatchNo == null){
							obj.fbatchNo = list[i].fbatchNo 
							isBatchNo = true
						}else{
							isBatchNo = false
							break
						}
					}
					obj.fdCSPId = list[i].positions
					obj.fauxprice = list[i].Fauxprice != null && typeof list[i].Fauxprice != "undefined" ? list[i].Fauxprice : 0
					obj.famount = list[i].Famount != null && typeof list[i].Famount != "undefined" ? list[i].Famount : 0  
					obj.fsCStockId = list[i].stockId
					if(list[i].stockId == null || typeof list[i].stockId == 'undefined'){
						result.push(list[i].index)
					}
					
					obj.fsourceBillNo = list[i].fsourceBillNo == null || list[i].fsourceBillNo == "undefined" ? '' :  list[i].fsourceBillNo 
					obj.fsourceEntryId = list[i].fsourceEntryID == null || list[i].fsourceEntryID == "undefined" ? '' :  list[i].fsourceEntryID 
					obj.fsourceTranType = list[i].fsourceTranType == null || list[i].fsourceTranType == "undefined" ? '' :  list[i].fsourceTranType
					console.log(list[i].unitNumber)
					obj.funitId = list[i].unitID
					array.push(obj)	
				}
				portData.items = array
				portData.ftranType = 24
				portData.finBillNo = this.form.finBillNo
				portData.fdate = this.form.fdate
				portData.fdeptId = this.form.fdeptID
				portData.fbillerID = this.form.fbillerID
				console.log(JSON.stringify(portData))
				if(result.length == 0){
					if(isBatchNo){
					production.pickingStockOut(portData).then(res => {
						if(res.success){
							this.cuIList = []
							uni.showToast({
								icon: 'success',
								title: res.msg,
							});
							this.form.bNum = 0
							this.initMain()
							if(this.isOrder){
								uni.navigateBack({
								 url: '../workshop/report?startDate='+this.startDate+'&endDate='+this.endDate   
							});
						}
						}
					}).catch(err => {
						uni.showToast({
							icon: 'none',
							title: err.msg,
						});
					})
					}else{
						uni.showToast({
							icon: 'none',
							title: '启用批号，批号不能为空，未启用批号，批号必须为空',
						});
					}
				}else{
					uni.showToast({
						icon: 'none',
						title: '仓库不允许为空',
					});
				}
			},
			saveCom(){
				this.modalName2 = null
			},
			del(index, item) {
				this.cuIList.splice(index,1)
				this.form.bNum = this.cuIList.length
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			showModal2(index, item) {
				this.modalName2 = 'Modal'
				this.popupForm = {
					quantity: '',
					fbatchNo: '',
					positions: ''
				}
				if(item.fbatchNo == null || typeof item.fbatchNo == 'undefined'){
					item.fbatchNo = ''
				}
				if(item.positions == null || typeof item.positions == 'undefined'){
					item.positions = ''
				}
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
				         this.form.fdeptID = val
				   },
				   stockChange(val){
				 						let sList = this.stockList
				 						let list = this.cuIList
				 						const me = this
				 						for(let i in sList){
				 							if(sList[i].FNumber == val){
				 								for(let j in list){
				 									me.$set(list[j],'stockName', sList[i].FName);
				 									me.$set(list[j],'stockId', val);
				 								}
				 							}
				 							
				 						}
				     },
		bindChange(e){
			this.form.fdate = e
		}, 
		PickerChange(e, item) {
			this.$set(item,'stockName', this.stockList[e.detail.value].FName);
			this.$set(item,'stockId', this.stockList[e.detail.value].FNumber);
		},
		fabClick() {
			var that = this
			
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
