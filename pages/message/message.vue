<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 70vh;" :latitude="latitude" :longitude="longitude" :markers="markers"
					:callout="callout" :enable-building='true' :enable-satellite='true'>
				</map>
			</view>
			<u-button @click=" click">定位</u-button>
			<!-- <gmap></gmap> -->
			<amap></amap>
		</view>
	</view>
</template>
<script>
	import gmap from '../../components/map.vue'
	import amap from '../../components/amap.vue'
	export default {
		data() {
			return {
				id: 1,
				title: 'map',
				latitude: 23.40800,
				longitude: 113.39481,
				markers: [{
					width: 10,
					height: 10,
					latitude: 23.40800,
					longitude: 113.39481,
					iconPath: '../../static/location.png',
					label: {
						content: '当前位置',
						color: 'green',
						textAlign: 'center',
						bgColor: 'white'
					},
					callout: {
						content: '描述...'
					}
				}, {
					width: 10,
					height: 10,
					latitude: 23.40800,
					longitude: 113.39481,
					iconPath: '../../static/houseMarker.png',
					label: {
						content: '当前位置',
						color: 'green',
						textAlign: 'center',
						bgColor: 'white'
					},
					callout: {
						content: '描述...'
					}
				}]

			}
		},
		components: {
			gmap,
			amap
		},
		onReady() {

		},
		methods: {
			async click() {
				let that = this
				console.log('定位中。。。')
				await uni.getLocation({
					// type: 'wgs84',
					type: 'gcj02',
					accuracy: 'best',
					isHightAccuracy: true,
					// altitude: true,
					success: function(res) {
						setTimeout(() => {
							console.log('当前位置的经度===============：' + res.latitude, that.markers[0]
								.latitude);
							console.log('当前位置的纬度：' + res.longitude);
							that.markers[0].longitude = res.longitude
							that.markers[0].latitude = res.latitude,
								that.markers[1].longitude = res.longitude
							that.markers[1].latitude = res.latitude
							that.longitude = res.longitude
							that.latitude = res.latitude
							// console.log(that.currPoint)
							// console.log('that   '+that)
							// uni.$emit('getPoint', that.currPoint)
							// 提示信息
							uni.showToast({
								title: "定位成功",
								icon: 'success',
								duration: 3000,
								mask: true
							})
						}, 1000)

					},
					fail: res => {
						console.log('定位失败了')
					}
				})
			},
			callout() {

			}
		}
	}
</script>
