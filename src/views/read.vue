<template>

	<div class="read" >
		<!--<van-loading type="spinner" color="white" />-->
		<div ref='body':style="{fontSize:(size/37.5)+'rem'}" class="content">
			<h4>{{title}}</h4>
			<div class="read-box" v-html="sectioncontent" @click="setting"></div>
		</div>
		<van-row class='btn'>
			<van-col span='8' offset='2'>
				<van-button type="default" @click="lastChapter">上一章</van-button>
			</van-col>
			<van-col span='8' offset='4'>
				<van-button type="default" @click="nextChapter">下一章</van-button>
			</van-col>
		</van-row>

		<div v-show="isShow" class="backtrack">
			<div class="top fixed">
				<div @click="backtrack" class="box">
					<van-icon class='icon' name="arrow-left" />
					<span class="sp">返回</span>
				</div>
				<span class="changing" @click="changing">换源</span>
			</div>

			<div class="bottom fixed">
				<van-row class='fixed-text'>
					<van-col span='4' offset='2' >
						<div@click='shot'>
							<div><van-icon name="setting-o" /></div>
							<div >设置</div>
						</div>
					</van-col>
					<!--<van-col span='5' offset='3'>
						<div>
							<div><van-icon name="add-o" /></div>
							<div>下载</div>
						</div>
						
					</van-col>-->
					<van-col span='5' offset='8'>
						<div @click="catalogue">
							<div><van-icon name="closed-eye" /></div>
							<div>目录</div>
						</div>
					</van-col>
					
				</van-row>
				

			</div>
				
		</div>
	  		<!--设置-->
 			<div v-show="isShot" class="shot">
 				<div class="font">
 					<span @click="subtract">Aa-</span>
 					<span @click="addfontSize">Aa+</span>
 				</div>
 				<div class="background">
 					<span v-for="(item,index) in color" :style="{backgroundColor: item}"
 						@click="background(item)"></span>
 					
 				</div>
 			</div>
 			<!--目录-->
 			<van-popup v-model="iscatalogue" >
 				<div class="catalog" >
				<ul>
					<li v-for="(item ,index) in sectionList" :key='index' @click="indexData(index)">
						{{item.title.slice(2)}}
					</li>
				</ul>
			</div>
 			</van-popup>
			<div class="box-loading" v-show='isLoading'>
				<van-loading type="spinner" size='50px' class='loading' />
			</div>
	</div>
</template>

<script>
	import { Popup, Button, Row, Col, Loading, Icon } from 'vant';

	export default {
		name: "Read",
		components: {
			[Popup.name]: Popup,
			[Button.name]: Button,
			[Row.name]: Row,
			[Col.name]: Col,
			[Loading.name]: Loading,
			[Icon.name]: Icon,
		},
		data() {
			return {
				isShow: false,
				isShot:false,
				color:[
					'antiquewhite',
					'bisque',
					'cadetblue',
					'gainsboro',
					'pink',
					'rosybrown'
				],
				size:16,
				iscatalogue:false,
				source :false,
				
			}
		},
		methods: {
			//			返回
			backtrack() {
				
//					console.log('离开',this.$store.getters.getId)	
					let bendidata=JSON.parse(localStorage.textId)
				for(let ke in bendidata){
					if(bendidata[ke].id==this.booksId){
						bendidata[ke].index=this.index
//						console.log(JSON.stringify(bendidata))
						localStorage.setItem('textId',JSON.stringify(bendidata))
					}
				}
				
				
//				
				this.$router.push({
					path: '/'
				})

			},
			//更换书源
			replace(index) {
				let _id = this.shuYuan[index]._id
				this.$store.dispatch('shuYuan', _id)
			},
			//			上一章
			lastChapter() {

				this.$store.commit('addIndex')
				this.links(this.index)
			},
			//			下一章
			nextChapter() {
				this.$store.commit('nextIndex')
				this.links(this.index)

			},

			links(index) {
				setTimeout(() => {
					document.body.scrollTop = 0
					document.documentElement.scrollTop = 0
				}, 500)

				let _link = this.sectionList[index].link
				_link = encodeURIComponent(_link)
				this.$store.dispatch('sectioncontent', _link)
			},

			//设置
			setting() {
				this.isShow = !this.isShow
				this.isShot=false
			},

			//换源
			changing() {
				console.log('2222')
					this.$router.push({path:'/changing'})
			},
			shot(){

				this.isShot=!this.isShot
			},
//			设置背景
			background(color){
				this.$refs.body.style.backgroundColor=color
			},
//			设置字体大小
			addfontSize(){
				if(this.size<=24){
					this.size+=2
					let size=(this.size)/37.5
					this.$refs.body.style.fontSize=size+'rem'
				}
				
			},
			subtract(){
				if(this.size>=12){
					this.size-=2
					let size=(this.size)/37.5
					this.$refs.body.style.fontSize=size+'rem'
				}
				
			},
			//
			catalogue(){
				this.iscatalogue=true
			},
			indexData(index){
				this.isShow=false
				this.$store.commit('setIndex',index)
				this.iscatalogue=false
				this.links(index)
			}
		},
		computed: {
//			书籍Id
			booksId(){
				
				return this.$store.getters.getId
			},
			
			isLoading(){

					return this.$store.getters.getLoading
			},
			//书源
			shuYuan() {
				return this.$store.getters.getShuYuan
			},

			//章节内容
			sectioncontent() {
				let str = this.$store.getters.getSectioncontent.replace(/\n/g, "<br/>")
				return str
			},
			//			章节列表
			sectionList() {
//				console.log('read章节列表', this.$store.getters.getSectionList)
				return this.$store.getters.getSectionList
			},

			//当前显示inex章
			index() {

				return this.$store.getters.getIndex 
			},
			
			title(){
//				console.log('title',this.sectionList[this.index].title)
				if(this.sectionList[this.index]){
					return  this.sectionList[this.index].title
				}

				
			}
		}

	}
</script>

<style lang="less" scoped>
	.read {
		background-color: rgb(162, 157, 137);
		
		.content{
			padding: 0.27027rem;
		}
		.btn {
			padding: 0.54054rem 0;
		}
		.backtrack {
			
			.top {
				width: 100%;
				height: 1.351351rem;
				background-color: #191919;
				color: white;
				top: 0;
				padding: 0 0.54054rem;
				.box {
					display: inline-block;
					height: 1.351351rem;
					line-height: 1.351351rem;
				}
				.icon {
					display: inline-block;
					font-size: 0.54054rem;
					position: absolute;
					top: 0.405405rem;
				}
				.sp {
					display: inline-block;
					font-size: 0.486486rem;
					margin-left: 0.675675rem;
				}
				.changing {
					float: right;
					margin-right: 1.081081rem;
					line-height: 1.351351rem;
					font-size: 0.486486rem;
				}
			}
			.fixed {
				height: 1.351351rem;
				background-color: #191919;
				position: fixed;
				left: 0;
				width: 100%;
				
				.fixed-text{
					font-size: 0.378378rem;
				}
			}
			.bottom {
				bottom: 0;
				color: white;
				height: 1.351351rem;
				.fixed-text{
					text-align: center;
					
					.van-col{
						padding: 0.189189rem 0;
					}
				}
				
			}
		}
			
	}
	.shot{
				width: 100%;
				height: 2.162162rem;
				position: fixed;
				bottom: 1.324324rem;
				background-color: rgba(0,0,0,.5);
				animation:.5s mybox;
				color: aliceblue;
				font-size: 0.54054rem;
				padding: 0.54054rem;
				
				
				.font{
					
					span{
						display: inline-block;
						padding: 0 0.27027rem;
					}
				}
				.background{
					margin-top: 0.54054rem;
					span{
						display: inline-block;
						width: 0.81081rem;
						height: 0.81081rem;
						background-color: antiquewhite;
						border-radius: 50%;
						margin-right: 0.54054rem;
						
					}
				}
			}
			
			@keyframes mybox{
				from{transform: translateY(1.351351rem)}
				to{transform: translateY(0);}
			}
			
			.van-popup{
				
				
			}
			.catalog{
				width: 8.108108rem;
				height: 10.81081rem;
				font-size: 0.432432rem;
				padding: 0.54054rem;
				
				li{
					border-bottom: 0.027027rem solid #ddd;
					height: 0.54054rem;
					line-height: 0.54054rem;
					width: 100%;
					padding: 0.27027rem 0;
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