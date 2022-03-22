<template>
	<!-- 可以通过设置file-list参数(数组，元素为对象)，显示预置的图片。其中元素的url属性为图片路径
设置action参数为后端服务器地址，注意H5在浏览器可能会有跨域限制，让后端允许域即可 -->
	<u-upload :action="action" :file-list="fileList"></u-upload>
</template>

<script>
	export default {
		data() {
			return {
				// 演示地址，请勿直接使用
				action: 'http://www.example.com/upload',
				fileList: [{
					url: 'home.',
				}]
			}
		}
	}
</script>

<style>

</style>
