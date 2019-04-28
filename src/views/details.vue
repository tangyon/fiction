<template>
	<div class="about">
		<van-nav-bar class='nav-bac' title="书籍详情" left-text="返回" left-arrow @click-left="onClickLeft" />
		<van-row class='details'>
			<van-col span='4'><img :src="decodeURIComponent(bookDetails.cover).slice(7)" alt="" /></van-col>
			<van-col span='19' offset='1'>

				<van-row class='text'>
					<van-col span='24'>
						<h2>{{bookDetails.title}}</h2></van-col>
					<van-col span='24'>
						<span class="author">{{bookDetails.author}}</span>
						<span> | {{bookDetails.minorCate}} | </span>
						<span>{{parseInt(bookDetails.wordCount/10000)}}万字 </span>
					</van-col>
					<van-col span='24'>
						<p>{{turnoverTime}}前更新</p>
					</van-col>
				</van-row>

			</van-col>
			<van-col span='24'>
				<van-row class='bookrack'>
					<van-col span="10" offset='1'><div class="bookrack-box" @click="addBooks" ref='add'>添加书架</div></van-col>
					<van-col span="10" offset='2'><div class="bookrack-box" @click="beginReading">开始阅读</div></van-col>
					
				</van-row>
			</van-col>
			<van-col span='24'>
				<van-row class='bookrack'>
					<van-col span="4" offset='2'>
						<div class="bookrack-data">追书人数</div>
						<p>{{bookDetails.latelyFollower}}</p>
					</van-col>
					<van-col span="5" offset='3'>
						<div class="bookrack-data">读者留存率</div>
						<p>{{bookDetails.retentionRatio}}</p>
					</van-col>
					<van-col span="5" offset='3'>
						<div class="bookrack-data">日更新字数</div>
						<p>{{bookDetails.serializeWordCount}}</p>
					</van-col>
			</van-row>
			</van-col>
			
			<van-col span='24' class='genre'>
				<div  :class="[bookDetails.majorCate=='' ? '':'genre-box']">
				{{bookDetails.majorCate}}
			</div>
			</van-col>
			<van-col span='24' class='books-particulars'>
				<p>{{bookDetails.longIntro}}</p>
			</van-col>
		</van-row>
		<div class="box-loading" v-show='isLoading'>
				<van-loading type="spinner" size='50px' class='loading' />
			</div>
	</div>
</template>

<script type="text/javascript">
	import { Search, List, cell, Row, Col, NavBar,Loading } from 'vant';

	export default {
		name: 'Details',
		components: {
			[NavBar.name]: NavBar,
			[Row.name]: Row,
			[Col.name]: Col,
			[Loading.name]: Loading,
		},
		data(){
			return {
				localStorageData:[],
				isAdd:false
				
			}
		},
		
		watch:{
			isAdd(){
				if(this.isAdd===true){
					this.$refs.add.innerHTML='移除书架'
				}
				else{
					this.$refs.add.innerHTML='添加书架'
				}
				
			}
		},
		
		updated() {
				if(localStorage.textId){
					this.localStorageData =JSON.parse(localStorage.textId)
					this.localStorageAdd()
				}
				
				
//				console.log('this.localStorageData',this.localStorageData)
		},
		computed: {
			bookDetails() {
//				console.log(this.$store.getters.getBookDetails._id)
				return this.$store.getters.getBookDetails
			},
			//本地数据
			localStorages(){
						console.log(this.$store.getters.getLocalStorage)
					return this.$store.getters.getLocalStorage		
			},
			isLoading(){
				console.log(this.$store.getters.getLoading)
					return this.$store.getters.getLoading
			},

			//更新时间
			turnoverTime() {
				let myDate = (new Date()).getTime()

				let time = this.bookDetails.updated
				//				多少秒前更新
				let a = parseInt((myDate - new Date(time).getTime()) / 1000)

				//				分钟
				let minute = 60
				//小时		
				let hour = 60 * 60
				//			
				//			天
				let day = 24 * hour
				//				周
				let week = day * 7
				//				月
				let month = day * 30
				//				年
				let year = 12 * month

				if(a >= year) {
					let n = parseInt(a / year)
					return n + '年'
				}
				if(a >= month) {
					let n = parseInt(a / month)
					return n + '月'
				}
				if(a >= week) {
					let n = parseInt(a / week)
					return n + '周'
				}
				if(a >= day) {
					let n = parseInt(a / day)
					return n + '天'
				}
				if(a >= hour) {
					let n = parseInt(a / hour)
					return n + '小时'
				}
				if(a >= minute) {
					let n = parseInt(a / minute)
					return n + '分钟'
				}

			}
		},
		methods: {
			//书籍详情
			onClickLeft() {
				this.$router.push({
					path: '/seek'
				})
			},
			
			//添加书架
			addBooks(){
				
//				
				this.isAdd=!this.isAdd
//				console.log('添加',this.bookDetails._id)
				if(this.isAdd==true){
					let id={
						id:this.bookDetails._id,
						isAdd:this.isAdd,
						index:0
					}
					this.localStorageData.push(id)
				}
				else{
					for(let key in this.localStorageData){
						if(this.$store.getters.getBookDetails._id==this.localStorageData[key].id){
							console.log(key)
							
							this.localStorageData.splice(key,1)
						}
					}
				}
				localStorage.setItem('textId',JSON.stringify(this.localStorageData))
			},
			
			localStorageAdd(){
				for(let key in this.localStorageData){
					if(this.$store.getters.getBookDetails._id==this.localStorageData[key].id){
						this.isAdd=this.localStorageData[key].isAdd
					}else{
						this.isAdd=false
						localStorage.setItem('textId',JSON.stringify(this.localStorageData))
					}
					
				}

				
			},
			
//			开始阅读
				beginReading(){
//						console.log(this.bookDetails._id,'书籍id')
						this.$store.dispatch('shuYuan',this.bookDetails._id)
						this.$store.commit('setIndex',0)
						this.$router.push({path:'/read'})
						for(let key in this.localStorageData){
						if(this.$store.getters.getBookDetails._id==this.localStorageData[key].id){
//							console.log('111111')
							return
						}
						
						}	
							this.isAdd=true
							let id={
									id:this.bookDetails._id,
									isAdd:this.isAdd,
									index:0
								}
							this.localStorageData.push(id)
							localStorage.setItem('textId',JSON.stringify(this.localStorageData))
						
					
						
				}
				
			
		},
		
	}
</script>

<style lang="less" scoped>
	.about {
		div.nav-bac.van-nav-bar.van-hairline--bottom {
			background-color: brown;
			.van-nav-bar__left,
			i {
				font-size: 0.432432rem;
				color: white;
				.van-nav-bar__text {
					color: white;
				}
			}
			.van-nav-bar__title.van-ellipsis {
				font-size: 0.54054rem;
				color: white;
			}
		}
		.details {
			padding: 0.27027rem;
			img {
				width: 100%;
			}
			.genre{
				padding: 0.27027rem 0;
				border-bottom: 0.027027rem solid #DDDDDD;
				
				div{
					width: 1.081081rem;
				height: 0.594594rem;
				}
					.genre-box{
				
				background-color: crimson;
				text-align: center;
				line-height: 0.594594rem;
				color: white;
			}
			
			}
		
		.books-particulars{
			padding: 0.27027rem 0.54054rem;
			font-size: 0.378378rem;
		}
		
			.bookrack{
				padding: 0.54054rem 0;
				border-bottom: 0.027027rem solid #DDDDDD;
				
				.bookrack-box{
					height: 0.81081rem;
					line-height: 0.81081rem;
					background-color: #b4321f;
					text-align: center;
					font-size: 0.432432rem;
					border-radius: 0.135135rem;
					color: white;
				}
				
				.bookrack-data{
					text-align: center;
					font-weight: 700;
					color: #999999;
					font-size: 0.378378rem;
				}
				p{
					text-align: center;
					padding: 0.135135rem 0 0 0;
				}
			}
			.text {
				h2 {
					margin-bottom: 10px;
					font-size: 0.54054rem;
					color: #666;
				}
				.author{
					font-weight: 900;
					color: chocolate;
				}
				span{
					font-size: 0.378378rem;
					color: #999;

				}
				p{
					margin-top: 10px;
					color: #999;
				}
			}
		}
	}
	.box-loading{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
	}
	
	.loading{
		
		left: 0;
		right: 0;
		top: 40%;
		bottom: 0;
		margin: auto;
	}
</style>