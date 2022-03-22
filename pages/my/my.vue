<template>
	<view>
		<u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1" v-if="hasToken">
				<view class="u-font-18 u-p-b-20">放学我就跑</view>
				<view class="u-font-14 u-tips-color">用户账号:admin</view>
			</view>

			<view class="u-flex-1" v-else @click="goLogin()">
				<view class="u-font-18 u-p-b-20">请登录</view>
				<view class="u-font-14 u-tips-color">用户账号:</view>
			</view>

			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view> -->
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<view class="logOut" @click="logOut">
					<u-cell-item icon="man-delete" v-if="hasToken" title="退出登录" style="color:#e2182e;"></u-cell-item>
				</view>

			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="edit-pen" v-if="hasToken" @click="getMyInfo" title="修改我的信息"></u-cell-item>
				<!-- <u-cell-item icon="photo" title="相册"></u-cell-item>
				<u-cell-item icon="coupon" title="卡券"></u-cell-item> -->
				<!-- <view class="myinfo" >
					<u-cell-item icon="heart"  title="获取我的信息"></u-cell-item>
				</view> -->

			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
				<!-- <button @click="clear">清除token</button> -->
			</u-cell-group>
		</view>


		<view class="pub_house" @click="pub_house()">
			<span> 发布我的房源</span>
		</view>
	</view>
</template>

<script>
	import {
		reqMyInfo
	} from '../../api/index.js'
	import {
		mapGetters,
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				pic: '',
				show: true,
				hasToken: false,
				myInfo: {
					id: null,
					username: '',
					email: '',

					nickname: '',
					address: '',
				}
			}
		},
		onLoad(option) {
			// 判断是否有本地token,注意this指向问题
			console.log(option, 'oooooooo')
			// debugger
			let that = this
			uni.getStorage({
				key: 'token',

				success: function(res) {

					that.hasToken = true
					// console.log('hastoken:',this.hasToken,'mytoken'+res.data.token)
				}
			})

			// 接收来自login.vue的token状态getToken

			uni.$on('getToken', function(data) {

				that.hasToken = true
				console.log(this.hasToken)
				console.log('监听到事件来自 getToken ，携带参数 getToken为：' + data.getToken);
			})
		},
		computed: {
			...mapState({
				token: (state) => state.login.token,
			}),
		},
		methods: {
			pub_house() {
				// uni.navigateTo({
				// 	url:'../pub_house/index'
				// })
				uni.navigateTo({
					url: 'pub_house/pub_house'
				})

			},
			goLogin() {
				console.log('logining')
				// debugger
				uni.navigateTo({

					url: 'login/login'
					// url:'login'
				})


			},
			logOut() {
				let that = this
				console.log(that.hasToken)
				uni.removeStorage({
					key: 'token',

					success: function(res) {

						that.hasToken = false
						this.token = ''
						console.log('清除token vuex,退出登录，success');
					}
				});


			},


			async getMyInfo() {
				// 根据拦截请求头里设置的token,获取用户信息
				let res = await reqMyInfo()
				// 存储我的信息到本地
				if (res.status == 0) {
					uni.setStorage({
						key: 'myInfo',
						data: res.data,
						success() {
							console.log('本地存储我的信息成功！')
						}
					})

				}

			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
</style>
