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
		<view class="cu-tabbar-height" v-for="(item,index) in cuIconList" :key="index">
				<view class="cu-list menu-avatar">
					<view class="cu-item" style="width: 100%;margin-top: 2px;">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
						<view class="content">
							<view class="text-grey">凯尔</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">
									<text class="cuIcon-infofill text-red  margin-right-xs"></text>
									我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
								</view> </view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">22:20</view>
							<view class="cu-tag round bg-grey sm">5</view>
						</view>
					</view>
					<view class="cu-item" style="width: 100%;margin-top: 2px;">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);">
							<view class="cu-tag badge">99+</view>
						</view>
						<view class="content">
							<view class="text-grey">
								<view class="text-cut">瓦洛兰之盾-塔里克</view>
								<view class="cu-tag round bg-orange sm">战士</view>
							</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">
									塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。
								</view>
							</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">22:20</view>
						<view class="cuIcon-notice_forbid_fill text-gray"></view>
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
	
	export default {
		 components: {ruiDatePicker, ldSelect, uniFab},
			data() {
				return {
					lento: 123456412,
					start: null,
					pageHeight: 0,
					modalName: null,
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
									cuIconList: [{
										cuIcon: 'cardboardfill',
										color: 'red',
										badge: 120,
										name: 'VR'
									}, {
										cuIcon: 'recordfill',
										color: 'orange',
										badge: 1,
										name: '录像'
									}, {
										cuIcon: 'picfill',
										color: 'yellow',
										badge: 0,
										name: '图像'
									}, {
										cuIcon: 'noticefill',
										color: 'olive',
										badge: 22,
										name: '通知'
									}, {
										cuIcon: 'upstagefill',
										color: 'cyan',
										badge: 0,
										name: '排行榜'
									}, {
										cuIcon: 'clothesfill',
										color: 'blue',
										badge: 0,
										name: '皮肤'
									}, {
										cuIcon: 'discoverfill',
										color: 'purple',
										badge: 0,
										name: '发现'
									}, {
										cuIcon: 'questionfill',
										color: 'mauve',
										badge: 0,
										name: '帮助'
									}, {
										cuIcon: 'commandfill',
										color: 'purple',
										badge: 0,
										name: '问答'
									}, {
										cuIcon: 'brandfill',
										color: 'mauve',
										badge: 0,
										name: '版权'
									}],
									
									
				};
			},
		 onReady: function() {
			 var me = this
			 uni.getSystemInfo({
			 　　success: function(res) { // res - 各种参数
			 　　    let info = uni.createSelectorQuery().select(".getheight");
			 　　　  　info.boundingClientRect(function(data) { //data - 各种参数
						me.pageHeight= res.windowHeight - data.height - 46
			 　　    }).exec()
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
	.cu-item{
		float: left;
		width: 50%;
	}
	.cu-item .content{
		float: left;
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
