<template>
	<view class="global">
		<!-- renderjs -->
		<!-- emitData接收从视图层过来的数据。如果msg改变，触发moudle='map'的script标签中的receiverMsg方法 -->
		<view :route="route" :change:route="map.query" class="renderjs" id="renderjs-view">
			<u-dropdown ref="uDropdown" @open="open" @close="close">
				<u-dropdown-item v-model="value1" title="步行" :options="options1" @change="change">
				</u-dropdown-item>
				<u-dropdown-item v-model="value2" title="公交" :options="options2" @change="change"></u-dropdown-item>
				<u-dropdown-item v-model="value2" title="自驾" :options="options3" @change="change"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view id="driving_way">

			<!-- 公交出行方案选择 -->
			<!-- <view>
						<u-picker v-model="show" mode="selector"  :range="selectorObj" range-key="cateName" @confirm="confirm" title="选择公交出行方案"></u-picker>
						<u-button @click="show = true">{{selRes}}</u-button>
					</view> -->
			<!-- 	<select>
					<option value="0" class='white'>推荐方案</option>
					<option value="1">最少时间</option>
					<option value="2">最少换乘</option>
					<option value="3">最少步行</option>
					<option value="4">不乘地铁</option>
					<option value='5'>优先地铁</option>
				</select> -->

			<!-- <text>查询</text> -->
			<!-- <button id='search' @click="map.query" type="default"
				style="display: flex;align-items: center;justify-content: center;background-color: #3195ee;color: #abb0b4;">
				<icon type="search" size="26" style="margin: 0 15rpx;" />查询
			</button> -->
			<text id='result'></text>
		</view>
		<view class="header">
			<!-- 百度地图容器 -->
			<view id="allmap" class="map"></view>

			<!-- <view id="allmap1" class="map"></view>
		</view>

		<view class="location">
			<!-- 房源的地址 -->
			<view class="houseAddr">{{houseAddr}}</view>
			<!-- 选择城市 -->
			<city-select></city-select>
			<u-button @click="getAdrress">定位</u-button>

			<view @click="map.emitData" :msg="msg" :change:msg="map.receiveMsg" class="renderjs" id="renderjs-view">
				<button class="getinfo">
					点击获取公交信息
				</button>
				<view class="routeInfo">公交信息：{{routeInfo}}</view>
			</view>

		</view>

	</view>
</template>

<!-- 逻辑层 -->
<script>
	import citySelect from './citySelect/index.vue'
	export default {
		// props:['houseAddr'],
		data() {
			return {
				ak: 'FBZG0MCbBIrNrL8X0F56zYdgOYTs4xcG',
				currPoint: [110.370542, 23.05205],
				// [0][1]经纬度float,[2]当前房源地址(字符串),
				msg: [],
				// [0]代表下拉菜单open_index,[1]代表下拉菜单change_value
				route: [],
				routeTem: [],
				houseAddr: '',
				routeInfo: '',
				// 出行方案下拉菜单,value123代表默认选择的第几个二级菜单。
				// options123里面的value 代表的是点击的二级菜单绑定的索引，也是change事件的value参数
				value1: 0,
				value2: 0,
				value3: 0,
				options1: [{
						label: '推荐方案',
						value: 0,
					},
					{
						label: '最少时间',
						value: 1,
					},
					{
						label: '最少换乘',
						value: 2,
					}
					
				],
				options2: [{
						label: '推荐方案',
						value: 0,
					},
					{
						label: '最少时间',
						value: 1,
					},
					{
						label: '最少换乘',
						value: 2,
					},
					{
						label: '最少步行',
						value: 3,
					},
					{
						label: '不乘地铁',
						value: 4,
					},
					{
						label: '优先地铁',
						value: 5,
					}
				],
				options3: [{
						label: '推荐方案',
						value: 0,
					},
					{
						label: '最少时间',
						value: 1,
					},
					{
						label: '最少换乘',
						value: 2,
					}
				],
				selRes: "推荐方案",

			}
		},
		onLoad() {
			uni.hideTabBar()
		},
		onReady() {},
		mounted() {
			// 获取房源地址，字符串
			let that = this
			uni.$on('houseAddrr', (data) => {
				console.log('逻辑层,  $on收到房源地址: ==============================' + data)
				this.houseAddr = data
				// 获取定位
				// this.getAdrress()
				// this.currPoint = currPoint;
				// this.changeMsg()

			})
		},
		components: {
			citySelect,
		},
		methods: {
			// 触发逻辑层出入renderjs数据改变
			changeMsg() {
				// this.msg = 'msg被改变' + Math.random() * 10;
				this.msg = this.currPoint
				console.log('逻辑层的msg被改变了', '逻辑层里:msg=currPoint=', this.msg)


			},
			// 获取当前位置经纬度，并且把数据msg带给视图层
			async getAdrress() {
				let that = this
				await uni.getLocation({
					type: 'wgs84',
					// type: 'gcj02',
					// altitude: true,
					success: function(res) {
						console.log('逻辑层，当前位置的经度：' + res.latitude);
						console.log('逻辑层，当前位置的纬度：' + res.longitude);
						// msg的所有数据都需要在这里改,在其他地方改可能不会触发recieve函数，因为它检测不到msg数据变化了
						that.currPoint[0] = res.longitude
						that.currPoint[1] = res.latitude
						that.currPoint[2] = that.houseAddr
						// 通过改变msg,向视图层发送定位经纬度数据
						that.msg = that.currPoint
						uni.showToast({
							title: "定位成功",
							icon: 'success',
							duration: 1500,
							mask: true
						})


					},
					fail: res => {
						uni.showToast({
							title: "定位失败",
							icon: 'error',
							duration: 1500,
							mask: true
						})
						console.log('定位失败了')
					}

				});


			},
			// query() {
			// 	console.log('queryyyyyyyly')
			// },
			// 接收renderjs发回的数据
			receiveRenderData(val) {
				console.log('receiveRenderData=============逻辑层拿到了视图层的数据-->', val);
				this.routeInfo = val
			},
			// 选择的出行方案
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				// index是一级菜单的索引
				this.$refs.uDropdown.highlight();
				console.log('index open ', index)
				this.route = [index, 0]
				console.log('routtttttttttttt', this.route)
				this.routeTem[0] = index
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			change(value) {
				// 更多的细节，如有需要请自行根据业务逻辑进行处理
				// value是点击的二级菜单的索引值
				console.log('value change:', value)
				this.routeTem[1] = value,
					this.route = this.routeTem
				console.log('routeeeeeeeeeeeee', this.route)

				// this.$refs.uDropdown.highlight(xxx);
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
				currPoint: [113.45060254362793, 23.090403100818246],
				name: 'render-vm',
				housePoint: null,
				output: '',



			}
		},
		mounted() {
			console.log('视图层，mounted,xxxxxxxxxxxxxxxxx')

		},
		watch: {
			currPoint: {
				handler(newValue, oldValue) {
					// console.log('watch里面的currPoint:' + this.currPoint + oldValue)
					// ================百度地图==================
					// mymap(this.ak).then((mymap) => {

					// 	// 创建百度地图实例				
					// 	BMap = new BMapGL.Map("allmap");
					// 	console.log("BMap是:" + BMap)
					// 	console.log('=========================视图层watch的currPoint:==============' + this.currPoint[0])

					// 	var point = new BMapGL.Point(this.currPoint[0], this.currPoint[1]);
					// 	console.log('aaaaaaaa')
					// 	BMap.centerAndZoom(point, 5); //设置缩放级别	
					// 	BMap.setTilt(43); //设置倾斜角度
					// 	BMap.setHeading(24.5); //设置地图旋转角度		
					// 	BMap.enableScrollWheelZoom();
					// 	BMap.setMapStyleV2({
					// 		styleId: '自定义样式的id' //百度开放平台搜搜个性化地图
					// 	});
					// 	// 标记点
					// 	var point = new BMapGL.Point(this.currPoint[0], this.currPoint[1]);
					// 	var marker = new BMapGL.Marker(point); // 创建标注   
					// 	BMap.addOverlay(marker);

					// 	console.log(Map.prototype, 'bmappppp')


					// 	// // 坐标转换==========================
					// 	// var ggPoint = new BMapGL.Point(this.currPoint[0], this.currPoint[1]);

					// 	// //地图初始化
					// 	// var bm = new BMapGL.Map("allmap");
					// 	// bm.centerAndZoom(ggPoint, 15);
					// 	// bm.addControl(new BMapGL.ZoomControl());

					// 	// //添加gps marker和label
					// 	// var markergg = new BMapGL.Marker(ggPoint);
					// 	// bm.addOverlay(markergg); //添加GPS marker
					// 	// var labelgg = new BMapGL.Label("未转换的GPS坐标（错误）", {
					// 	// 	offset: new BMapGL.Size(10, -10)
					// 	// });
					// 	// markergg.setLabel(labelgg); //添加GPS label

					// 	// //坐标转换完之后的回调函数
					// 	// let translateCallback = function(data) {
					// 	// 	if (data.status === 0) {
					// 	// 		var marker = new BMapGL.Marker(data.points[0]);
					// 	// 		bm.addOverlay(marker);
					// 	// 		var label = new BMapGL.Label("转换后的百度坐标（正确）", {
					// 	// 			offset: new BMapGL.Size(10, -10)
					// 	// 		});
					// 	// 		marker.setLabel(label); //添加百度label
					// 	// 		bm.setCenter(data.points[0]);
					// 	// 	}
					// 	// }

					// 	// setTimeout(function() {
					// 	// 	var convertor = new BMapGL.Convertor();
					// 	// 	var pointArr = [];
					// 	// 	pointArr.push(ggPoint);
					// 	// 	convertor.translate(pointArr, COORDINATES_WGS84, COORDINATES_BD09,
					// 	// 		translateCallback)
					// 	// }, 1000);



					// });
				},
				deep: true
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
				// console.log('newValue', newValue)
				// console.log('oldValue', oldValue)
				// console.log('ownerVm', ownerVm)


				mymap(this.ak).then((mymap) => {

					// 创建百度地图实例				
					// BMap = new BMapGL.Map("allmap");
					// console.log("BMap是:" + BMap)
					// console.log('=========================视图层watch的currPoint:==============' + this.currPoint[0])
					let x = this.currPoint[0]
					let y = this.currPoint[1]
					// console.log(x,y,'----------------------------------')
					// var point = new BMapGL.Point(x, y);
					// console.log('aaaaaaaa')
					// BMap.centerAndZoom(point, 10); //设置缩放级别	
					// // BMap.setTilt(43); //设置倾斜角度
					// // BMap.setHeading(24.5); //设置地图旋转角度		
					// BMap.enableScrollWheelZoom();
					// // BMap.setMapStyleV2({
					// 	styleId: '自定义样式的id' //百度开放平台搜搜个性化地图
					// });
					// 标记点
					// var point = new BMapGL.Point(x, y);
					// var marker = new BMapGL.Marker(point); // 创建标注   
					// BMap.addOverlay(marker);

					console.log(Map.prototype, 'bmappppp')


					// 坐标转换==========================
					var ggPoint = new BMapGL.Point(x, y);
					console.log(ggPoint, 'pppppppppppp')
					//地图初始化
					var bm = new BMapGL.Map("allmap");
					bm.centerAndZoom(ggPoint, 16);
					bm.addControl(new BMapGL.ZoomControl());

					//添加gps marker和label
					// var markergg = new BMapGL.Marker(ggPoint);
					// bm.addOverlay(markergg); //添加GPS marker
					// var labelgg = new BMapGL.Label("未转换的GPS坐标（错误）", {
					// 	offset: new BMapGL.Size(10, -10)
					// });
					// markergg.setLabel(labelgg); //添加GPS label

					//坐标转换完之后的回调函数
					let translateCallback = function(data) {
						if (data.status === 0) {
							var marker = new BMapGL.Marker(data.points[0]);
							bm.addOverlay(marker);
							var label = new BMapGL.Label("您的当前位置", {
								offset: new BMapGL.Size(10, -10)
							});
							marker.setLabel(label); //添加百度label
							bm.setCenter(data.points[0]);
						}
					}

					setTimeout(function() {
						var convertor = new BMapGL.Convertor();
						var pointArr = [];
						pointArr.push(ggPoint);
						convertor.translate(pointArr, COORDINATES_WGS84, COORDINATES_BD09,
							translateCallback)
					}, 1000);

					console.log(this.currPoint, '视图层，currrrrrrrrrrrrrr')

					// ===========================================================================

					// var map = new BMapGL.Map('container');
					// map.centerAndZoom(new BMapGL.Point(116.331398, 39.897445), 12);
					//创建地址解析器实例
					var myGeo = new BMapGL.Geocoder();
					// 将地址解析结果显示在地图上，并调整地图视野
					let that = this
					myGeo.getPoint(this.currPoint[2], function(point) {
						if (point) {
							console.log('地址解析成功：=========', point, 'this.housepoint===========', that
								.housePoint)
							// 房源的经纬度变量housePoint:
							that.housePoint = point
							// bm.centerAndZoom(point, 16);
							//添加GPS marker
							var houseMarker = new BMapGL.Marker(point);
							bm.addOverlay(houseMarker)

							var label = new BMapGL.Label("目标房源地址", {
								offset: new BMapGL.Size(10, -10)
							});
							houseMarker.setLabel(label); //添加GPS label
							// bm.centerAndZoom(houseMarker, 16);



							// =====================公交路线====================================
							// var map = new BMapGL.Map('container');
							// bm.centerAndZoom(new BMapGL.Point(116.404, 39.915), 12);
							// var output = '从你的位置坐公交需要：';
							// var transit = new BMapGL.TransitRoute(bm, {
							// 	renderOptions: {
							// 		bm: bm
							// 	},
							// 	onSearchComplete: function(results) {
							// 		if (transit.getStatus() != BMAP_STATUS_SUCCESS) {
							// 			console.log('获取公交路线失败')
							// 			return;
							// 		}
							// 		var plan = results.getPlan(0);
							// 		output += '总时长：' + plan.getDuration(true); //获取时间
							// 		output += '总路程：' + plan.getDistance(true); //获取距离
							// 		that.output = output
							// 		console.log(output, 'outputttttttttttt')
							// 		// $('#result').css('display', 'block');
							// 		// $('#result').html(output);
							// 	},
							// });
							// var start = new BMapGL.Point(113.35132663120682, 23.09136863120682);
							// // 起始点是定位地点
							// // var start = ggPoint;
							// console.log(ggPoint, 'gggggggg')
							// var end = new BMapGL.Point(113.37956963120682, 23.0538060678661167);
							// // var end = that.housePoint
							// console.log(that.housePoint, 'housepointtttttttttttt')
							// transit.search(start, end);


						} else {
							alert('您选择的地址没有解析到结果！');
						}
						// 需要指定城市
					}, '广州市')


					// that.emitData()

				});




			},
			// 发送数据到逻辑层
			emitData(e, ownerVm) {
				ownerVm.callMethod('receiveRenderData', this.output)
			},

			query(newValue, oldValue, ownerVm, vm) {
				console.log('视图层的query,接收到逻辑层的选择器route的newvalue:', newValue)
				if (newValue[0] == 0) { // 点击的是步行方案



				} else if (newValue[0] == 1) { // 点击的是公交方案
					mymap(this.ak).then((mymap) => {
						// 百度地图API功能
						var map = new BMapGL.Map("allmap");
						map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 14);

						var start = new BMapGL.Point(116.302, 40.050) //"百度大厦";
						var end = new BMapGL.Point(116.358, 39.961); //"北京邮电大学西门";
						var routePolicy = [BMAP_TRANSIT_POLICY_RECOMMEND, BMAP_TRANSIT_POLICY_LEAST_TIME,
							BMAP_TRANSIT_POLICY_LEAST_TRANSFER, BMAP_TRANSIT_POLICY_LEAST_WALKING,
							BMAP_TRANSIT_POLICY_AVOID_SUBWAYS, BMAP_TRANSIT_POLICY_FIRST_SUBWAYS
						];
						var transit = new BMapGL.TransitRoute(map, {
							renderOptions: {
								map: map,
								panel: 'result'
							},
							policy: 0,

						});

						// $("#search").click(function() {
						// 	map.clearOverlays();
						// 	var i = $("#driving_way select").val();
						var i = newValue[1]

						// routePol只是形参
						function search(start, end, routePol) {
							transit.setPolicy(routePol);
							transit.search(start, end);
						}


						search(start, end, routePolicy[i]);

						// })


					})
				} else if (newValue[0] == 2) { //点击的是自驾方案

				}


			}
		}
	}
</script>

<style lang="less" scoped>
	// .map {
	// 	// margin-top:600rpx;
	// 	width: 100%;
	// 	height: 300px;
	// 	box-sizing: border-box;
	// }

	// html {
	// 	height: 100%
	// }

	// body {
	// 	height: 100%;
	// 	margin: 0px;
	// 	padding: 0px
	// }

	// #allmap {
	// 	height: 100%;
	// 	width: 100%;
	// }

	#driving_way {

		// position: fixed;
		top: 10rpx;
		right: 20rpx;
		width: 100%;
		height: 800rpx;
		background: #fff;
		box-shadow: 0 2rpx 6rpx 0 rgba(27, 142, 236, 0.5);
		border-radius: 7rpx;
		// z-index: 99;
		padding: 10rpx;
		overflow: scroll;


		select {
			box-shadow: 0 2rpx 6rpx 0 rgba(27, 142, 236, 0.5);

			option {
				background-color: white;
			}
		}
	}

	.white {
		background-color: white;
		color: black;
	}


	#result {
		height: 600rpx;
		overflow-y: auto;
		overflow: scroll;

		p {

			color: red;
		}
	}


	.global {
		height: 70vh;

		.map {
			width: 750rpx;
			height: 50vh;
		}
	}
</style>
