<template>
	<view>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">产品入库</block></cu-custom>
	<scroll-view scroll-y class="page">
		<view class="box">
			<view class="cu-bar bg-white solid-bottom" style="height: 30px;">
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
					    :start="'2010-00-00'"
					    end="2030-12-30"
						:value="end"
					    @change="bindChange2"
					></ruiDatePicker>
				</view>
			</view>
			<view class="cu-bar search bg-white" style="height: 30px;">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" :value="keyword" @input="inputChange" placeholder="搜索" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="search">搜索</button>						</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</scroll-view>
	</view>
</template>

<script>
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	export default {
		 components: {ruiDatePicker},
		data() {
			return {
				start: null,
				end: null,
				keyword: '',
			};
		},
		 created: function() {
			  this.start = this.getDay('', 0).date
			  this.end = this.getDay('', 2).date
    },
		methods: {
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
			if (this.start.length > 5 && this.end.length > 5) {
				if(!this.compareDate(this.start,this.end)){
					
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
		height: 7vw;
	}
	.cu-bar{
		min-height: 30px;
	}
	.page {
		height: calc(100vh - 75px);
	}
	.nav-title::first-letter {
	    font-size: 16px;
	    margin-right: 2px;
	}
</style>
