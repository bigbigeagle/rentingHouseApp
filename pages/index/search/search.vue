<template>
	<view>
		<view class="searchResults" v-show="!show">
			<h3 class="searchR ">搜索结果</h3>
		</view>
		<view class="city" v-show="show">
			<city-select></city-select>
		</view>
		<!-- 绑定自定义事件，判断当前点击的是第几个搜索结果 -->
		<view class="Media shadow" v-for="(item,index) in allData"  :key = 'index' >
			<view class="Media-figure">
				<image class="" :src="item.photosPath[0]" mode="widthFix"  @click="clickResult" :data-resultindex="index"></image>
			</view>
			
			<view class="Media-body"  @click="clickResult" :data-resultindex="index">
				<h3>{{item.title}}</h3>
				<p class="" >{{item.content}}</p>
			</view>
		</view>

	
		<view class=" shadow" style="text-align: center; border-radius : 30rpx 30rpx 30rpx 30rpx ; margin: 20rpx;">
			
			<!-- <p >没有更多结果了！ ། – _ – །</p> -->
		</view>
		<view class=""  v-show="allData[0]"><u-divider>没有更多了</u-divider> </view>
			<view class="" style="height: 15rpx;margin-bottom: 15rpx;"></view>
		
	</view>
</template>

<script>
	import {
		reqSearchTitle,
		reqSearchContent
	} from '../../../api/index.js'
	import qs from 'qs'
	import citySelect from '.././citySelect/index.vue'
	export default {
		data() {
			return {
				title: '',
				content: '',
				photosPath: [],
				resultContent: '',
				allData: [],
				show:false,
			}
		},
		components: {
			citySelect,
		},
		// 从index组件跳转过来携带的路由参数option
		onLoad: async function(option) { //option为object类型，会序列化上个页面传递的参数
			// try {
			this.option = Object.keys(option)
			// this.content = content
			console.log(this.option[0],'=======================',typeof (this.option[0]));
			if(this.option[0] == 'findHouse') {
				console.log('findHousesss')
				this.show=true
			}
			let data = {
				title: this.option[0]
			}
			// 请求搜索数据库中的title字段和content字段
			let result1 = await reqSearchTitle(qs.stringify(data))
			let result2 = await reqSearchContent(qs.stringify(data))
			console.log(result2, '==========result2==========================')
			// 一个数组里存放返回的所有搜索结果数据，即合并两个数组
			if (result1.data && result2.data) {

				this.allData = [...result1.data, ...result2.data]
				console.log(this.allData, '=========allData=======')
				// 对allData进行去重
				// this.unique(this.allData)
				/**
				 * 删除数组对象中重复的对象
				 * arr: 源数组   filterField: 需要删除的重复字段，注意是字符串类型
				 * 返回一个过滤好的，没有重复该字段filterField的数组
				 * */
				const filterArrObj = (arr, filterField) => {
					let newArr = arr.reduce((pre, cur) => pre.some(item => item[filterField] == cur[filterField]) ?
						pre : [...pre, cur], [])
					return newArr
				}
				this.allData = filterArrObj(this.allData, 'id')

				console.log(this.allData, '===去重完成，  allData=======')

			} else if (result1.data) {
				// result1.data是一个数组对象,包含数据库查询到的多条数据
				this.allData = result1.data
				// this.content = tem.content
				// this.title = tem.title
				// this.photosPath = tem.photosPath
				console.log(result1.data, '=======result1.data =============================')
			} else if (result2.data) {
				this.allData = result2.data
				console.log(result2.data, '=======result2.data =============================')
			} else if (result1.status == 1 || result2.status == 1) {
				console.log('result1 result2, fail')
			}



			//  else if (result1.status == 1) {
			// 	console.log('result1 fail')
			// 	// this.title = result1.message
			// }
			// if (result2.data) {
			// 	let tem = result2.data
			// 	// this.content = tem.content
			// 	// this.title = tem.title
			// 	// this.photosPath = tem.photosPath
			// 	console.log(tem, '===========result2.data =============================')
			// } else if (result2.status == 1) {
			// 	console.log(' fail')
			// 	// this.title = result2.message
			// }

		},
		onReady() {
			uni.showToast({
				title:'努力加载中..',
				icon:'loading',
				duration:250
			})
		},
		methods: {
			// 点击搜索结果
			clickResult(event) {
				let elem = event.target
				// 用户当前点击的是第几个结果
				let {
					resultindex
				} = elem.dataset
				console.log(elem,resultindex,'-------------------')
				let that = this
				// 传送当前搜索结果数据
				let all = this.allData[resultindex]
				// $emit触发时,要保证$on已经生效,才能让$on接收到$emit的数据!
				setTimeout(()=> {
					 uni.$emit('currsearch',all)
				},175)
				
				console.log(this.allData[resultindex],'yyyyyyyyyyyyyy')
				setTimeout(() => {
					uni.navigateTo({
					url:`searchDetail?`,
					
				})
				},0)
				
			// 	uni.previewImage({
			// 		urls: Array(that.photosPath[imgindex]),
			
			// 	});
			}



		}
	}
</script>

<style lang="less" scoped>
	page {}

	.shadow {
		box-shadow: 0 0 1px 1px #999;
	}

	.searchR {
		// position: relative;

		/* text-align: center; */
		height: 60rpx;
		display: flex;
		 	justify-content: center;/* 水平居中 */
		align-items: center; 	/* 垂直居中 */
		
	}

	p {
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-line;
		text-indent: 2rem;
	}

	.Media {
		height: 275rpx;
		display: flex;
		align-content: center;
		justify-content: center;
		margin: 0 15rpx 15rpx 15rpx;
		background-color: #ededed;
		/* height: 80rpx; */
		overflow: hidden;
		border-radius : 30rpx 30rpx 30rpx 30rpx ;
	}

	.Media-figure {
		margin-right: 1em;
		flex: 1;
		margin: auto;
		padding: 10rpx;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			height: 200rpx;
			width: 100%;
		}

	}

	.Media-body {
		flex: 1;
		padding: 10rpx;
	}

	/* .content ::after {
		content: '...';
		bottom: 0;
		right: 0;
		padding-left: 3rem;
	} */
</style>
