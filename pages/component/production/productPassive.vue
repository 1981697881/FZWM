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
		
	<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">产品入库</block></cu-custom>
	<scroll-view scroll-y class="page">
		<view class="box">
			<view class="cu-bar bg-white solid-bottom" style="height: 30px;">
				<view class="action">
					单号：<text></text>
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
					包数：<text></text>
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
					<input  name="input"></input>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height">
				
			
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
	export default {
		 components: {ruiDatePicker, ldSelect, uniFab},
			data() {
				return {
					lento: 1234564,
					start: null,
					keyword: '',
					value: '',
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
				};
			},
		 created: function() {
			  this.start = this.getDay('', 0).date
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
		fabClick() {
			uni.scanCode({
				success:function(res){
					console.log(JSON.stringify(res));
				}
			});
		},
		}
	}
</script>

<style>
	.input{
		height: 30px;
	}
	.box{
		width: 100%;
	}
	.uni-input-placeholder, .uni-input-input{
		font-size: 13px;
	}
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
