<template>
	<view class="big">

		<view class="noResult" v-show="resultContent">

			<h2>{{nothing}}</h2>
		</view>
		<view class="" style="margin-bottom: 10rpx;">
			<h2> {{currData.title}} </h2>
		</view>
		<!-- 单元格，地址、发布时间 -->
		<u-cell-group>
			<u-cell-item icon="calendar" title="发布时间" :arrow="false">{{currData.pub_date}}</u-cell-item>
			<view class="" @click = 'toMap'>
				<u-cell-item icon="map" title="地址:" :arrow="true" arrow-direction="right" label="">{{currData.address}}</u-cell-item>
			</view>
			
			
		</u-cell-group>
		<p class='content'>
			{{currData.content}}
		</p></br>
		
		<view class="photos">
			<view class="searchResults" v-for="item,index in currData.photosPath" :key="index">
				<!-- <u-image width="100%" height="300rpx" :src=""></u-image> -->
				<!-- <image src="../../../static/images/renting.png"></image> -->
				<!-- 绑定自定义事件，判断当前点击的是哪张图片 -->
				<image :src="item" mode="heightFix" @click="imgPreview" :data-imgindex="index"></image>


			</view>
		</view>

	</view>
</template>

<script>
	import {
		reqSearchTitle,
		reqSearchContent
	} from '../../../api/index.js'
	import qs from 'qs'
	let tem = null
	export default {
		data() {
			return {
				// content: '',
				resultContent: '',
				// 当前搜索结果的数据
				currData: {
					title:'',
					content: '',
					address: '',
					author_id: 7,
					cash_ple: 0.00,
					mon_rent: 0.00,
					cate_id: 1,
					content: "",
					cover_img: null,
					id: 20,
					is_delete: 0,
					photos: "",
					photosPath: [],
					pub_date: "2022-03-10 22:02:40.752",
					state: "已发布",
					
				},
				nothing: '什么也没有哦'


			}
		},
		
		// 从index组件跳转过来携带的路由参数option
		async onLoad() {
			uni.showToast({
				title:'努力加载中..',
				icon:'loading',
				duration:300
			})
			// search组件传过来的当前点击的搜索结果数据
			var that = this

			// try {
				// debugger
				await uni.$on('currsearch', (data) => {
					
					console.log('监听到事件来自 search.vue ，携带搜索数据data为：' + data);
					tem = data
					 // let tem = data.msg
					// this.currData.pub_date = this.currData.pub_date
					tem.pub_date = tem.pub_date.slice(0,16)
					
					that.currData = tem
					// console.log(this.currData.pub_date, 'currData==')
					// this.photosPath = data.photosPath
					console.log(tem, 'tememememm++++++')

				})
				console.log(tem,'ressss2sssssssssssss')
				// setTimeout(()=>{
					// debugger
					// this.$nextTick(function(res){
						
					// })
					
				// },200)
				// setTimeout(()= >{
					
				// },300)
				
				// console.log(uni.$on(), 'res ===================')
			// } catch (e) {
			// 	//TODO handle the exception
			// 	console.log(Error, 'searchdetail出错了')
			// }


		},
		onReady() {
			this.currData = {...tem}
		},
		methods: {
			// 图片预览
			imgPreview(event) {
				let elem = event.target
				// 用户当前点击的是第几张图片
				let {
					imgindex
				} = elem.dataset
				// console.log(elem,imgindex)
				let that = this
				uni.previewImage({
					urls: Array(that.currData.photosPath[imgindex]),

				});
			},
			toMap() {
				// 跳转到mapdetail组件,把房源的地址传过去，方便用户查看房源与自己的位置情况
				uni.navigateTo({
					url:`./mapDetail?${this.currData.address}`
				})
			}

		}
	}
</script>

<style lang="less" scoped>
	p {
		// white-space:pre
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-line;
		text-indent: 2rem;
	}

	.big {
		padding: 15rpx;
	}
.searchResults {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	margin: 20rpx auto 0rpx auto;
	width: 330rpx;
	height: 330rpx;
}
	
	.photos {
		// display: flex;
		// flex-wrap: wrap;
		// justify-content: center;
		// align-items: center;
		// justify-content: flex-start;
		// align-content: space-between;
		
			// height: 275rpx;
			display: flex;
			align-content: center;
			justify-content: center;
			// margin: 0 15rpx 15rpx 15rpx;
			// background-color: #ededed;
			/* height: 80rpx; */
			// overflow: hidden;
			border-radius : 30rpx 0rpx 0rpx 0rpx ;
			flex-wrap: wrap;
		
		
		

		image {
			// flex-grow: 1;
			width: 100%;
			height: 100%;
			// padding: 10rpx;
			// margin: auto;
			// margin: 20rpx;
			box-shadow: 0 0 1px 1px #999;
		}

	}

	// image {
	// 	width: ;
	// 	height: ;
	// }

	pre {
		width: 750rpx;
		flex-wrap: wrap;
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;

	}
</style>
