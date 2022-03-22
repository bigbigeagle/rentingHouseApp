<template>
	<view class="content w">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<!-- 搜索框 -->
		<view class="header w " >

			<view class="search">
				<u-search placeholder="搜索房源" v-model="keyword" @custom="search()" :value="keyword"></u-search>
			</view>
		</view>


		<!-- main 租房主要功能 -->
		<view class="main">
			<view class="" style="height: 80rpx;width: 100%;">
				
			</view>
			<view class="column">
				<view class="child_culumn " @click="findHouse">
					<view class="img">
						<u-image width="150rpx" height="150rpx" src="../../static/images/renting.png"></u-image>
					</view>
					<h3>我要租房</h3>
				</view>
				<view class="child_culumn">
					<view class="img">
						<u-image width="150rpx" height="150rpx" src="../../static/images/togetherRenting.png"></u-image>
					</view>
					<h3>找合租</h3>
				</view>

			</view>
			<view class="column">
				<view class="child_culumn" @click="publishHouse">
					<view class="img">
						<u-image width="150rpx" height="150rpx" src="../../static/images/publishRenting.png"></u-image>
					</view>
					<h3>发布房源</h3>
				</view>
				<view class="child_culumn">
					<view class="img">
						<u-image width="150rpx" height="150rpx" src="../../static/images/publishTR.png"></u-image>
					</view>

					<h3>发布合租</h3>
				</view>

			</view>
		</view>
 

			<!-- 城市和区域， 点击后自动获取定位 -->
			<view class="location" @click="getAdrees()">
				<!-- <city-select></city-select> -->

			</view>
	
		<!-- 地图 -->
		<view class="container">

			<!-- <bm></bm> -->
			<!-- <button @click="getAddress">定位</button> -->

		</view>
	</view>



</template>
<script>
	// import bm from '@/components/bm.vue'
	import citySelect from './citySelect/index.vue'
	export default {

		data() {
			return {
				inputValue: '搜索房源',

				currPoint: [0, 1],
				keyword: 'a'

			}
		},
		components: {
			citySelect,


		},

		onReady() {

		},
		methods: {
			// 跳转到search组件,把搜索关键词带过去 
			search() {
				if (this.keyword) {
					uni.navigateTo({
						url: `search/search?${this.keyword}`
						// `search/search?$(this.keyword)`
					})
				} else {
					uni.showToast({
						title: '请输入关键字！',
						icon:'error'
					})
				}

			},
			findHouse() {
				uni.navigateTo({
					url:`search/search?findHouse`
				})
			},
			publishHouse() {
				uni.navigateTo({
					url:'main/publish_house'
				})
			}
			
		},


	}
</script>


<style lang="less" scoped>
	page {
		background-color: #ededed;
		// box-shadow: 0 0 1px 1px #999;
		
	}
	.w {
		width: 100%;
	}

	.shadow {
		box-shadow: 0 0 1px 1px #999;
	}



	.header {
		width: 100%;
		display: flex;
		margin: 10rpx 0;
		
		align-items: center;
		justify-content: center;
		// margin: 10px;
		font-size: 60rpx;
		height: 90rpx;
		background-color: white;

		.search {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 20rpx;
			margin-right: 20rpx;

			// input {
			// 	flex: 1;
			// 	// border: 1px solid;
			// 	// width: 300rpx;
			// 	// display: inline;
			// 	// width: 150rpx;
			// 	// border: 1px solid #808080;
			// 	border-radius: 15rpx;
			// 	color: #808080;
			// 	padding-left: 10rpx;
			// 	margin: 0;
			// 	height: 70rpx;
			// 	// line-height: 18px;
			// }

		}
	}

	.main {
		display: flex;
		flex-wrap: wrap;


		.column {
			justify-content: center;
			align-items: center;
			flex-basis: 100%;
			display: flex;

			// justify-content: space-between;
			.child_culumn {
				text-align: center;
				margin: 20rpx auto;

				.img {
					padding: 15rpx;
					// border: #303133 1px solid;
					box-shadow: 0 0 1px 1px #999;
					border-radius: 30rpx 30rpx 30rpx 30rpx;
					background-color: white;
					
				}

			}
		}
	}

</style>
