<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<!-- <view class="u-demo-title">演示效果</view> -->
			<view class="u-demo-area">
				<city-select v-model="value" @city-change="cityChange"></city-select>
				<!-- <view class="u-demo-result-line">{{ input ? input : '' }}</view> -->
			</view>
		</view>
		<view class="u-config-wrap">
			<!-- <view class="u-config-title u-border-bottom">参数配置</view> -->
			<view class="u-config-item">
				<!-- <view class="u-item-title">状态</view> -->
				<!-- 定位和获取当前定位 -->
				
				<u-button type="primary" :plain="true" class="selCity" @click="pickCity" shape="circle">
					<!-- <view @click="getAddress()"> -->
						<u-icon name="map" color="#2979ff" size="28" v-show="control"></u-icon>
						<u-icon name="map-fill" color="#2979ff" size="28" v-show="!control"></u-icon>
						{{area}}
					<!-- </view> -->
					</u-button>
				<button class=""></button>
			</view>
		</view>
	</view>
</template>

<script>
	import citySelect from './u-city-select.vue';
	export default {
		components: {
			citySelect
		},
		data() {
			return {
				height: 20,
				bgColor: this.$u.color.bgColor,
				marginTop: 0,
				marginBottom: 0,
				value: false,
				input: '',
				area: '选择城市',
				control: true,
			};
		},
		methods: {
			cityChange(e) {
				
				this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
				// 地理全名变成简略名，例如“海珠区”
				if (this.input) {
					this.area = this.input;
					let i, j = 0,
						tem = '';
					for (i = this.input.length - 1; i > 0; i--, j++) {

						if (this.input[i] == "-") {
							// console.log(tem)
							// 得到的是反过来的字符串，需要手动反转字符串
							this.area = ''
							for (let x = tem.length - 1, y = 0; x >= 0; x--, y++) {
								this.area = this.area.concat(tem[x])
							}
							console.log(this.input,this.area)
							break;
						}
						tem = tem + this.input[i]

					}
				}
			},
			pickCity() {
				this.value = true;

			},
			// // 获取当前定位
			// getAddress(){
			// 	uni.getLocation({
			// 				    // type: 'wgs84',
			// 					type: 'gcj02',
			// 					geocode:true,//设置该参数为true可直接获取经纬度及城市信息
			// 				    success: function (res) {
			// 						console.log(res.longitude,res.latitude)
						
			// 						console.log(currLoc)
			// 						currLoc.push(res.latitude)
									
									
			// 						// that.addrDel = res;
			// 				    },
			// 					fail: function () {
			// 						console.log('失败了'),
			// 						uni.showToast({
										
			// 						    title: '获取地址失败，将导致部分功能不可用',
			// 							icon:'none'
			// 						});
			// 					}
			// 				});
			// },
		}
	};
</script>

<style scoped>
	.btn-wrap {
		margin: 100rpx 30rpx;
	}

	.selCity {
		/* width: 250rpx; */
		margin-left: 15rpx;
		margin-right: 15rpx;
		/* top: -7rpx; */
		height: 75rpx;
		line-height: 75rpx;
		
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		/* text {
			font-size: 30rpx;
			color: rgb(53, 150, 236);
			background-color: rgb(53, 150, 236);
			margin-left: 15rpx;
			margin-right: 15rpx;
			border-radius: 20rpx;

			text-align: center;
			overflow: auto
		} */

		/* width: 100rpx;
		display: inline;
		background-color: rgb(53, 150, 236);
		margin-left: 15rpx;
		margin-right: 15rpx;
		border-radius: 20rpx; */
		/* width: 100rpx; */
		/* display: inline; */


	}
</style>
