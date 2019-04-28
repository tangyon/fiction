<template>
	<div class="seek">

		<van-row class="title">
			<van-col span='10' class='logo'>哦豁阅读</van-col>
			<van-col span='4' offset='6'>
				<van-icon class='search' name="search" @click="toSeek" />
			</van-col>
			<van-col span='4'>
				<van-icon class='search' name="wap-nav" @click='regards' />
			</van-col>
		</van-row>

		<ul class="seek-box">
			<li v-for="(item,index) in myData" :key='index' @click="goRead(index)">
				<van-swipe-cell :right-width="65">
					<van-row>
						<van-col span="6"><img :src="decodeURIComponent(item.cover).slice(7)"></van-col>
						<van-col span="16" class='message' offset='1'>

							<h4>{{item.title}}</h4>
							<p>{{item.author}}</p>
							<p>{{item.shortIntro}}</p>
							<p>{{item.lastChapter}}</p>

						</van-col>
					</van-row>
					<span slot="right" class="remove" @click="rem(index)">删除</span>
				</van-swipe-cell>
			</li>

		</ul>

	</div>
</template>

<script>
	import { Icon, Row, Col, SwipeCell } from 'vant';

	export default {
		name: 'Seek',
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Icon.name]: Icon,
			[SwipeCell.name]: SwipeCell,
		},
		created() {

			if(localStorage.textId) {
				let bendiData = JSON.parse(localStorage.textId)
				//  		console.log(bendiData)

				this.$store.commit('clearMyData')
				for(let ke in bendiData) {
					//  			console.log(bendiData[ke].id)
					this.$store.dispatch('benDiBookDetails', bendiData[ke].id)

				}
			}

		},
		computed: {
			myData() {
				//   		console.log(this.$store.getters.getMyData)

				return this.$store.getters.getMyData
			}
		},
		methods: {
			toSeek() {
				this.$router.push({
					path: '/seek'
				})
			},
			//点击跳转到内容页面

			goRead(index) {
				console.log(this.$store.getters.getMyData[index])
				let _id = this.$store.getters.getMyData[index]._id
				let data = JSON.parse(localStorage.textId)

				this.$store.commit('setId', _id)
				this.$store.dispatch("shuYuan", _id)
				console.log("进入", _id)

				for(let ke in data) {

					if(data[ke].id == _id) {
						console.log('进入data[ke].index', data[ke].index)
						this.$store.commit('setIndex', data[ke].index)
					}

				}
				this.$router.push({
					path: '/read'
				})

			},

			//关于
			regards() {
				this.$router.push({
					path: '/regard'
				})
			},
			//删除
			rem(index){
					let id=this.myData[index]._id
					this.myData.splice(index,1)
					let data=JSON.parse(localStorage.textId)
					for(let ke in data){
						if(data[ke].id==id){
							data.splice(ke,1)
							localStorage.setItem('textId',JSON.stringify(data))
						}
					}
			}
		}

	}
</script>

<style lang="less" scoped>
	.seek {
		.title {
			/*width: 100%;*/
			height: 1.621621rem;
			background-color: #c62f2f;
			padding: 0 0.54054rem;
			color: whitesmoke;
			line-height: 1.621621rem;
			.logo {
				font-size: 0.648648rem;
				font-weight: 900;
				letter-spacing: 0.135135rem;
				text-align: center;
				height: 1.621621rem;
			}
			.search {
				display: inline-block;
				font-size: 0.81081rem;
				text-align: center;
				line-height: 1.621621rem;
			}
		}
	}
	
	.message {
		font-size: 0.432432rem;
		padding: 0.135135rem 0.135135rem;
		p,
		h4 {
			margin-bottom: 0.27027rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap
		}
		h4 {
			width: 80%;
		}
	}
	
	.p {
		margin: 0.81081rem 0;
		font-size: 0.54054rem;
		height: 0.81081rem;
		line-height: 0.81081rem;
		text-align: center;
	}
	
	.seek-box {
		width: 100%;
		overflow: hidden;
	}
	
	img {
		width: 100%;
	}
	
	ul {
		width: 100%;
	}
	
	li {
		padding: 0.54054rem 0;
		border-bottom: 0.027027rem solid #ccc;
	}
	.remove{
		display: inline-block;
		background-color: #ec2a2a;
		line-height: 1.513513rem;
		margin: 0.54054rem 0;
		margin-left: 0.27027rem;
		width: 1.081081rem;
		color: white;
		font-size: 0.432432rem;
		text-align: center;
	}
	
</style>