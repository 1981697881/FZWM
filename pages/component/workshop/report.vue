<template>
	<view>
	<cu-custom bgColor="bg-gradual-blue" class="customHead" :isBack="true"><block slot="backText">返回</block><block slot="content">汇报列表</block></cu-custom>
	<view class="box getheight">
		<view class="cu-bar bg-white solid-bottom" style="height: 60upx;">
			<view class="action">
				开始时间:
				<ruiDatePicker
				    fields="day"
					class='ruidata'
				    start="2010-00-00"
				    end="2030-12-30"
					:value="start"
				    @change="bindChange1"
				></ruiDatePicker>
			</view>
			<view class="action">
				结束时间:
				<ruiDatePicker
				    fields="day"
					class='ruidata'
				    start="2010-00-00"
				    end="2030-12-30"
					:value="end"
				    @change="bindChange2"
				></ruiDatePicker>
			</view>
		</view>
		<view class="cu-bar search bg-white" style="height: 60upx;">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
			<input :adjust-position="false" type="text" :value="keyword" @input="inputChange" placeholder="任务单号、金蝶号" confirm-type="search"></input>
		</view>
		<view class="action">
			<button class="cu-btn bg-green shadow-blur round" @tap="$manyCk(search)">搜索</button>						</view>
		</view>
	</view>
	<scroll-view scroll-y class="page" :style="{ 'height': pageHeight + 'px' }">
		<view v-for="(item,index) in cuIconList" :key="index">
				<view class="cu-list menu-avatar">
					<view class="cu-item" style="width: 100%;margin-top: 2px;height: 300upx;" >
						<view style="clear: both;width: 100%;" class="grid text-left col-2" @tap="$manyCk(showList(index, item))" data-target="Modal" data-number="item.number">
							<view class="text-grey">任务单号:{{item.workNo}}</view>
							<view class="text-grey">{{index+1}}</view>
							<view class="text-grey">卡号:{{item.processCard}}</view>
							<view class="text-grey">金蝶号:{{item.kingDeeNo}}</view>
							<view class="text-grey">生产批次:{{item.lotNo}}</view>
							<view class="text-grey">产品编码:{{item.productNumber}}</view>
							<view class="text-grey">产品名称:{{item.productName}}</view>
							<view class="text-grey">规格型号:{{item.model}}</view>
							<view class="text-grey" style="width: 100%;">计划量:{{item.planNum}}</view>
							<view class="text-grey">派工量:{{item.dispatchNum}}</view>
							<view class="text-grey">开工日期:{{item.workDate}}</view>
							<view class="text-grey">班组:{{item.processTeamName}}</view>
							<view class="text-grey">人员:{{item.reportName}}</view>
						</view>
					</view>
				</view>
		</view>
	</scroll-view>
	</view>
</template>
<script>
import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	import workshop from '@/api/workshop';
	export default {
		components: {ruiDatePicker},
		data() {
			return {
				start: '',
				end: '',
				onoff: true,
				keyword: '',
				pageHeight: 0,
				cuIconList: [],
			};
		},
		onLoad: function (option){
			if(JSON.stringify(option) != "{}"){
			this.start = option.startDate  
			this.end = option.endDate
			this.fetchData()
			}else{
				this.start = this.getDay('', 0).date
				this.end = this.getDay('', 3).date
				this.fetchData()
			}
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
				 
		},
		methods: {
			showList(index, item){
				uni.navigateTo({
					//url: '../production/productPassive?Fdate='+item.Fdate+'&FBillNo='+item.FBillNo+'&FNumber='+item.FItemNumber+'&FItemName='+item.FItemName+'&FModel='+item.FModel+'&Fauxqty='+item.Fauxqty+'&fsourceBillNo='+item.FBillNo+'&fsourceEntryID='+item.FSourceEntryID+'&fsourceTranType='+item.FTranType+'&unitNumber='+item.FUnitNumber+'&FUnitName='+item.FUnitName+'&Famount='+item.Famount+'&Fauxprice='+item.Fauxprice,
					url: '../workshop/reportDetails?workNo='+item.workNo+'&processCard='+item.processCard+'&kingDeeNo='+item.kingDeeNo+'&lotNo='+item.lotNo+'&productNumber='+item.productNumber+'&productName='+item.productName+'&model='+item.model+'&planNum='+item.planNum +'&productWorkDetailId='+item.productWorkDetailId 
				});
			},
			fetchData(val = ''){
				const me = this
				const obj = {
					pageSize: 50,
					pageNum: 1,
				}
				workshop.productWorkReport(this.qFilter(), obj).then(res => {
					if(res.success){
						me.cuIconList=res.data.list
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: res.msg,
					});
				})
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
				  inputChange(e){
				      this.keyword = e.detail.value
						this.fetchData(e.detail.value)	  
				   },
				  compareDate(date1,date2){
				                  var oDate1 = new Date(date1);
				                  var oDate2 = new Date(date2);
				                  if(oDate1.getTime() > oDate2.getTime()){
				                      return true; //第一个大
				                  } else {
				                      return false; //第二个大
				                  }
				},
				 // 查询条件过滤
				      qFilter() {
				        let obj = {}
				        this.keyword != null && this.keyword != '' ? obj.billNo = this.keyword : null
				        this.start != null && this.start != undefined ? obj.startDate = this.start : null
				        this.end != null && this.end != undefined ? obj.endDate = this.end : null
						return obj
				      },
					  bindChange1(e){
						   this.start = e
						  }, 
						   bindChange2(e){
						   this.end = e
						  },
		search(){
			const me = this
			if (this.start.length > 5 && this.end.length > 5) {
				if(!this.compareDate(this.start,this.end)){
				const obj = {
					pageSize: 50,
					pageNum: 1,
				}
				workshop.productWorkReport(this.qFilter(), obj).then(res => {
					if(res.success){
						me.cuIconList=res.data.list
						console.log(me.cuIconList)
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
						title: '结束日期不能大于开始日期'
					});
					return;
				}
			}else{
				uni.showToast({
					icon: 'none',
					title: '日期格式错误'
				});
				return;
				}
			
		},
		}
	}
</script>

<style>
	.action{
		font-size: 13px !important;
	}
	.ruidata{
		font-size: 13px;
		height: 7vw !important;
	}
	.box{
		width: 100%;
	}
	.cu-bar{
		min-height: 30px;
	}
	/* .page {
		height: calc(100vh - 75px);
	} */
	.nav-title::first-letter {
	    font-size: 16px;
	    margin-right: 2px;
	}
</style>

