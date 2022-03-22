<template>
<view class="global">
		<!-- renderjs -->
		<!-- emitData接收从视图层过来的数据。如果msg改变，触发moudle='map'的script标签中的receiverMsg方法 -->
		<view @click="map.emitData" :msg="msg" :change:msg="map.receiveMsg" class="renderjs" id="renderjs-view">
		</view>

		<view class="header">
			<!-- 百度地图容器 -->
			<view id="allmap" class="map"></view>
			<!-- <view id="allmap1" class="map"></view> -->

		</view>
		<u-button @click="a">定位</u-button>

	</view>
</template>


<!-- 逻辑层 -->
<script>
	export default {
		data() {
			return {
				ak: 'FBZG0MCbBIrNrL8X0F56zYdgOYTs4xcG',
				currPoint: [110.370542, 23.05205],
				msg: []
			}

		},
		onReady() {

		},

		created() {

		},
		mounted() {
			// 获取当前位置经纬度

			let that = this
			
			uni.$on('getPoint', (currPoint) => {
				console.log('定位中..........')
				console.log('逻辑层，mounted,$on里的===============================' + currPoint)
				this.currPoint = currPoint;
				this.changeMsg()
				
			})
		},
		methods: {
			// 触发逻辑层出入renderjs数据改变
			changeMsg() {
				// this.msg = 'msg被改变' + Math.random() * 10;
				this.msg = this.currPoint
				console.log('逻辑层的msg被改变了','逻辑层里:msg=currPoint=' ,this.msg)
				
				
			},
			a() {
				this.msg = [111.370542, 23.05205],
				console.log('aaaa')
			},
			// 接收renderjs发回的数据
			receiveRenderData(val) {
				console.log('receiveRenderData-->', val);
			}
		}


	}
</script>

<!-- ============================= 视图层，使用uniapp 提供的renderjs技术调用web端的百度地图api ============================================-->
<script module="map" lang="renderjs">
	import {
		mymap
	} from "@/util/map.js";
	var BMap = null;

	export default {
		name: "bm",
		data() {
			return {
				ak: 'FBZG0MCbBIrNrL8X0F56zYdgOYTs4xcG',

				currPoint: [113.45060254362793,23.090403100818246],
				name: 'render-vm'


			}
		},
		


		mounted() {



			const view = document.getElementById('renderjs-view')
			// const button = document.createElement('button')
			// button.innerText = '一个按钮'
			// view.appendChild(button)


		},
		
		watch:{
			currPoint:{
				handler(newValue,oldValue){
					console.log('watch里面的currPoint:'+this.currPoint+oldValue)
					// ================百度地图==================
					mymap(this.ak).then((mymap) => {
						
						// 创建百度地图实例				
						BMap = new BMapGL.Map("allmap");
						console.log("BMap是:" + BMap)
						console.log('视图层watch的currPoint:==============' + this.currPoint[0])
						var point = new BMapGL.Point(this.currPoint[0], this.currPoint[1]);
						BMap.centerAndZoom(point, 5); //设置缩放级别	
						BMap.setTilt(43); //设置倾斜角度
						BMap.setHeading(24.5); //设置地图旋转角度		
						BMap.enableScrollWheelZoom();
						BMap.setMapStyleV2({
							styleId: '自定义样式的id' //百度开放平台搜搜个性化地图
						});
						// 标记点
						var point = new BMapGL.Point(this.currPoint[0], this.currPoint[1]);   
						var marker = new BMapGL.Marker(point);        // 创建标注   
						BMap.addOverlay(marker); 
						
						console.log(Map.prototype,'bmappppp')
					
						
						// 坐标转换==========================
						    var ggPoint = new BMapGL.Point(this.currPoint[0], this.currPoint[1]);
						
						    //地图初始化
						    var bm = new BMapGL.Map("allmap");
						    bm.centerAndZoom(ggPoint, 15);
						    bm.addControl(new BMapGL.ZoomControl());
						
						    //添加gps marker和label
						    var markergg = new BMapGL.Marker(ggPoint);
						    bm.addOverlay(markergg); //添加GPS marker
						    var labelgg = new BMapGL.Label("未转换的GPS坐标（错误）",{offset:new BMapGL.Size(10, -10)});
						    markergg.setLabel(labelgg); //添加GPS label
						
						    //坐标转换完之后的回调函数
						    let translateCallback = function (data){
						      if(data.status === 0) {
						        var marker = new BMapGL.Marker(data.points[0]);
						        bm.addOverlay(marker);
						        var label = new BMapGL.Label("转换后的百度坐标（正确）",{offset:new BMapGL.Size(10, -10)});
						        marker.setLabel(label); //添加百度label
						        bm.setCenter(data.points[0]);
						      }
						    }
						
						    setTimeout(function(){
						        var convertor = new BMapGL.Convertor();
						        var pointArr = [];
						        pointArr.push(ggPoint);
						        convertor.translate(pointArr, COORDINATES_WGS84, COORDINATES_BD09, translateCallback)
						    }, 1000);
					
					
					
					});
				}
			}
			
			
			
		
			
		},
		methods: {


			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更

				// app端监听数据变化调用方法								
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法					
			},
			// 接收逻辑层发送的数据
			receiveMsg(newValue, oldValue, ownerVm, vm) {
				// 改变当前位置经纬度/
				console.log('recieveMsg   xxxx,视图层方法被触发==================')
				this.currPoint = newValue
				console.log('视图层的currpoint:' + this.currPoint)
				console.log('newValue', newValue)
				console.log('oldValue', oldValue)
				console.log('ownerVm', ownerVm)
				
			},
			// 发送数据到逻辑层
			emitData(e, ownerVm) {
				ownerVm.callMethod('receiveRenderData', this.name)
			}
		}
	}
</script>

<style lang="less" scoped>
	.map {
		// margin-top:600rpx;
		width: 100%;
		height: 300px;
		box-sizing: border-box;
	}

	html {
		height: 100%
	}

	body {
		height: 100%;
		margin: 0px;
		padding: 0px
	}

	#container {
		height: 100%
	}
</style>
