<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="@/static/haircut.png" mode="widthFix"></image>
			</view> 
		</view>
		<h1 class="title">登录</h1>
		<view class="form">
			<form ref="form" :modelValue="formData" :rules="rules">
				<view name="username">
					<input class="input" type="text" :name="formData.username" v-model="formData.username" placeholder="请输入用户名" />
				</view>
				<view name="password">
					<input class="input" type="password" :name="formData.password" v-model="formData.password" placeholder="请输入密码" />
				</view>
			</form>
			
			<view class="loginBtn" @click="submit" :class="{'active':formData.username&&formData.password}">
				<text class="btnValue">登录</text>
			</view>
			<view class="register">
			<navigator url="../register/register">
				<text>- 注册 -</text>
			</navigator>
		</view>
		<!-- <view @click="debug" style="width: 100%;height: 60rpx; background-color: #007CDC;" > debug</view> -->
		</view>


		<!-- <view class="form">
			<view class="inputWrapper">
				<input class="input" type="text" value="" v-model="username"  placeholder="请输入手机号"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" value="" v-model="password" placeholder="请输入密码"/>
			</view>
			<view class="loginBtn">
				<text class="btnValue" @click="login">登录</text>
			</view> -->

		<!-- <button  @click="submit">登录</button> -->
		

	</view>
	</view>
</template>



<script>
	import {
		mapGetters,
		mapState
	} from "vuex";
	import service from '@/api/ajax.js'
	import qs from 'qs'
	import store from '@/store/index.js'
	import axios from 'axios'
	export default {
		data() {
			return {
				formData: {
					username: 'admin',
					password: '123',
				},
				input_info: {
					username: "admin",
					password: '123'
				},
				userInfo: {
					token: '',
					username: '',
					address: '',

				},
				rules: {
					// username: {
					// 	rules: [{
					// 		required: true,
					// 		errorMessage: '请输入注册手机号码'
					// 	}, {
					// 		validateFunction: function(rule, value, data, callback) {
					// 			let usernameReg = /^1[0-9]{10}$/
					// 			if (!usernameReg.test(value)) {
					// 				callback('手机号码格式不正确，请重新填写')
					// 			}
					// 			return true
					// 		}
					// 	}]
					// }
				}
			}
		},
		onShow() {	
			let that = this
			console.log('that',that)
			// this.formData.username = 'ererere'
			uni.$on('regSuccess', (data)=> {
		
				// that.formData.username = data.username
				// that.formData.password = data.password
				console.log(that.formData+'that.formdata========')
				that.formData.password = data.password
				that.formData.username = data.username
				console.log(that.formData.username,that.formData.password)
				
				
				
				// console.log('监听到事件来自 regsiter ，携带参数 为：' + data);
			})
		},
		
		computed: {
			...mapState({
				token: (state) => state.login.token,
			}),
			
		},
		methods: {
			// 登录
			async submit() {
				//发送请求
				await this.$store.dispatch('Login', this.formData)
				// vuex映射到组件身上的token
				if (this.token) {
					this.userInfo.token = this.token
					uni.setStorage({
						key: 'token',
						data: this.userInfo,
						success: function() {
							uni.showToast({
								title: "登录成功！"
							})
							uni.$emit('getToken', {
								getToken: true
						})
								uni.switchTab({
								url: `../my`
							})

							uni.getStorage({
								key: 'token',
								success: function(res) {


									console.log('login获取token成功！本地的token：' + res.data.token)
								}
							})
						}

					})
				}

			},
			debug() {
				this.formData.username ='ttttt'
				console.log('debugging:   ',this.formData.username)
			}
			
			



			// submit() {
			// 	//         this.$refs.form.validate().then(res=>{
			// 	//             console.log('表单数据信息：', res);
			// 	// this.login(res)
			// 	//         }).catch(err =>{
			// 	//             console.log('表单错误信息：', err);
			// 	//         })
			// },

			// req(action, params) {
			// 	uni.showLoading({
			// 		title: '登录中'
			// 	})
			// 	return new Promise((resolve) => {
			// 		uniCloud.callFunction({
			// 			name: 'user-center',
			// 			data: {
			// 				action,
			// 				params
			// 			},
			// 			success: res => {
			// 				uni.hideLoading()
			// 				resolve(res.result);
			// 			},
			// 			fail: res => {
			// 				resolve(res)
			// 			}
			// 		})
			// 	})
			// },


			// login(e) {

			// 	this.req("login", {
			// 		username: this.formData.username,
			// 		password: this.formData.password
			// 	}).then(res => {
			// 		console.log(res)
			// 		uni.setStorageSync('uni_id_token', res.token)
			// 		uni.setStorageSync('uni_id_token_expired', res.tokenExpired)
			// 		uni.setStorageSync('userInfo', res.userInfo.username)
			// 		uni.switchTab({
			// 			url: '/pages/store/store'
			// 		});

			// 	})
			// 	console.log("跳转提醒")
			// },




		}
	}
</script>



<style scoped lang="less">
	.content {
		width: 100vw;
		height: 100vh;
	}

	.avatorWrapper {
		margin-top: 16px;
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.avator {
		width: 300upx;
		height: 300upx;
		overflow: hidden;
	}

	.avator .img {
		width: 100%
	}

	.title {
		margin-left: 100rpx;
		margin-top: 60rpx;
		color: #333333;
	}


	.form {
		padding: 0 100upx;
		margin-top: 40px;
	}

	.input {
		flex: 1;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		padding: 10px;
		margin: 20px;
	}

	.loginBtn {
		width: 100%;
		height: 80upx;
		background: #a3a3a3;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.loginBtn .btnValue {
		color: white;
	}

	.register {
		/* width: 40px; */
		width: 100%;
		text-align: center;
		color: white;
		// font-size: 20px;
		margin-top: 0px;
		// text {
		// 	width: 40px;

		// }
		navigator {

			height: 80upx;
			background: #2B85E4;
			border-radius: 50upx;
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.active {
		background-color: #2B85E4;
	}
</style>
