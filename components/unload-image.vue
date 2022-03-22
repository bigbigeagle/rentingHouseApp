<template>
	<view>


		<view class="">
			<u-form :model="form" ref="uForm">
				<u-form-item label="姓名" prop="name">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label="简介" prop="intro">
					<u-input v-model="form.intro" />
				</u-form-item>
			</u-form>

		</view>
		<form>
			<input type="text" value="" v-model="formData.title" placeholder="请输入标题">
			<input type="text" value="" v-model="formData.content" placeholder="请输入描述内容">

		</form>



		<u-upload ref="uUpload" :action="action" :auto-upload="false" :header="header" :name="name"
			:form-data="formData" max-count="6" :before-upload="beforeUpload"></u-upload>
		<u-button @click="sub()">提交</u-button>

	</view>
</template>

<script>
	import {
		reqPublishInfo
	} from '../api/index.js'
	import qs from 'qs'
	export default {
		data() {
			return {
				// 真实地址
				action: this.$baseURL + '/my/house/publish',
				header: {
					'Authorization': 'mytoken'
				},
				name: 'photos',
				// 绑定输入框的数据，放到请求里发送
				formData: {
					insertId: 1,
					title: '广东，测试，房屋文字信息',
					content: '超大面积，精美装修，气候适宜，环境优美，空气清新',
					cate_id: 1,
					auth_id: 7,
					state: '已发布'
				},
				form: {
					name: '',
					intro: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					intro: [{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			// index——即当前上传文件在上传列表中的索引, lists——当前所有的文件列表
			beforeUpload(index, list) {
				// let mytoken = this.formData.Authorization
				let that = this
				uni.getStorage({
					key: 'token',
					success: function(res) {
						that.header.Authorization = res.data.token
						// console.log('publisHouse,获取token成功！本地的token：' + res.data.token)

					},
					fail() {
						uni.showToast({
							title: '获取token失败，请重新登录',
							icon: 'error'
						})

					}
				})
				// console.log("header:==============", this.header)
				console.log("beforeUpload中的list:==============", list)



				return true;
			},
			async submit() {

				// 手动上传
				await this.$refs.uUpload.upload();
				// let files = [];
				// // 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				// files = this.$refs.uUpload.lists.filter(val => {
				// 	return val.progress == 100;
				// })
				// // 如果您不需要进行太多的处理，直接如下即可
				// // files = this.$refs.uUpload.lists;
				// console.log('files', files)



				// lists是一个数组,存放了多个数组元素，每个数组元素都是一个对象，,response/url/progress
				console.log('refs.uupload.lists[i]============', this.$refs.uUpload.lists)
			},
			// 上传图片的操作
			// 由于图片是多张需要发起多次请求,文字信息是单张,
			// 所以先上传文字信息,在数据库中创建一条数据,得到数据库中该数据的id,上传多张图片
			async sub() {
				// 返回插入成功的房屋数据
				let res = await reqPublishInfo(qs.stringify(this.formData))
				try {
					if (res.status == 0) {
						// 在数据库中的id
						this.formData.insertId = res.message.insertId
						console.log('res:======', res, res.message.insertId)



						// 调用submit函数,调用u-view中的api，开始上传图片（多次请求）
						this.submit()
						uni.showToast({
							title: '上传成功',
							duration: 3000

						})

						uni.redirectTo({
							url: '../pages/index/search/search',

						})

					} else {
						uni.showToast({
							title: '上传失败',
							icon: 'error',
							duration: 3000
						})
					}
				} catch (e) {
					//TODO handle the exception
					console.log('fail,文字信息上传失败')
				}

// 

			}


		}

	}
</script>
