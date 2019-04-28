<template>

	<div>
		<van-nav-bar class='title' title="关于" left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="box">
			<h1>ShanaMaid</h1>
			<h2>哦豁阅读器！绿色无广告，永久免费！</h2>
			<p>BUG提交请发送邮箱: 2546922538@qq.com</p>
			<p>关于支持: star or follow or pr！</p>
	</div>
	</div>
</template>

<script>
	import { NavBar } from 'vant'

	export default {
		name: 'Regard',
		components: {
			[NavBar.name]: NavBar,
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			}
		}

	}
</script>

<style lang="less" scoped>
	.title {
		height: 1.351351rem;
		background-color: #b4321f;
		.van-nav-bar__title {
			font-size: 0.648648rem;
		}
	}
	
	.van-nav-bar__text,
	.van-nav-bar__arrow,
	.van-nav-bar__title {
		color: white;
		font-size: 0.486486rem;
		line-height: 1.351351rem;
	}
	.box{
		text-align: center;
		padding: 0.27027rem;
		
		h1,h2,p{
			padding: 0.27027rem;
		}
		p{
			font-size: 0.378378rem;
		}
	}
	
</style>