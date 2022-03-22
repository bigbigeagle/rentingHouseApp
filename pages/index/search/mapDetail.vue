<template>
	<view>
		<view class="container">
			<!-- 百度地图 -->
			<bm></bm>
		</view>
		<!-- <view style="width: 100%; height: 200rpx; border: 1px #007AFF solid;" > mapdetail</view> -->
	</view>
</template>

<script>
	import bm from '../../../components/bm.vue'
	export default {
		data() {
			return {
				houseAddr: '',
			}
		},
		components: {
			bm,
		},
		onLoad(option) {
			option = Object.keys(option)
			this.houseAddr = option[0]
			console.log(this.houseAddr, 'ooooooo')

		},
		onReady() {
			let that = this
			setTimeout(() => {
				uni.$emit("houseAddrr",that.houseAddr)
			}, 200)
			console.log("mapdetalllllllllllllllll")
		},
		methods: {
			// b() {
			// 	// console.log("mapdetalllllllllllllllll")
			// 	let that = this
			// 	setTimeout(() => {

			// 		uni.$emit(
			// 			"houseAddrr", 
			// 				that.houseAddr

			// 		)
			// 	}, 200)

			// }
		}
	}
</script>

<style>

</style>
