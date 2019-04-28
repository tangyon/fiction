<template>
	<div class="list" background='#df0'>

		<van-row class='nvb'>
			<van-col span='3' class='nvb-text' >
				<div @click="gohome">
					返回
				</div>
			</van-col>
			<van-col span='21'>
				<van-search  v-model="textName" placeholder="请输入搜索关键词" show-action shape="round" background='#c62f2f'>
			<div slot="action" @click="getData" class="nvb-seek">搜索</div>
		</van-search>
			</van-col>
		</van-row>
		
		<div class='conter'>

			<van-list v-show='loading'>
				<van-cell v-for="(item,index) in textNameArr" :title="item" :key='index' @click='toBooksArr(item,index)' />
			</van-list>
			<van-row class='booksArr' v-show='!loading' v-for='item in booksArr'>
				<div  @click='toPathDetails(item)'class="booksList">
					<van-col span="8"><img :src="decodeURIComponent(item.cover).slice(7)"></van-col>
				<van-col span="16" class='message'>
					<h4>{{item.title}}</h4>
					<p>{{item.author}}</p>
					<p>{{item.shortIntro}}</p>
					<p>{{item.lastChapter}}</p>
					
					<van-row class="bottom">
						<van-col span='6' class='child'><span>{{item.cat}}</span></van-col>
						<van-col span='10' class='child'><span>{{item.latelyFollower}}人在读</span></van-col>
						<van-col span='8' class='child'><span>{{item.wordCount}}字</span></van-col>
					</van-row>
				</van-col>
				</div>
			</van-row>
		</div>
		
			<div class="box-loading" v-show='isLoading'>
				<van-loading type="spinner" size='50px' class='loading' />
			</div>
		
		<!--<p class="p" v-show='!loading'>没有了哦!</p>-->
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import { Search, List, cell, Row, Col, NavBar ,Loading } from 'vant';

	export default {
		name: "Seek",
		components: {
			[Search.name]: Search,
			[List.name]: List,
			[cell.name]: cell,
			[Row.name]: Row,
			[Col.name]: Col,
			[NavBar.name]: NavBar,
			[Loading.name]: Loading,
		},
		
		data() {
			return {
				loading: false,
			}
		},
		created() {

		},
		
		computed: {
				
				
				
			textName: {
				//val就是输入框当前的值
				set(val) {
					this.$store.commit('setTextName', val)
				},
				get() {
					return this.$store.state.textName;
				}
			},

			textNameArr() {
				//				if(this.$store.getters.GettextNmaeArr!=''){
				var str = this.$store.getters.GettextNmaeArr
				return str
				//				}
			},
			//书籍列表
			booksArr() {
				let data = this.$store.getters.GetBooksArr
				console.log(data[0])
				return data
			},
			isLoading(){
				console.log(this.$store.getters.getLoading)
					return this.$store.getters.getLoading
				}
		},
		methods: {
			//获取state数据  this.$store.state.名字
			//调用mutations里面的方法  this.$store.commit('方法名')
			//调用actions里面的方法  this.$store.dispatch('方法名')
			
			gohome(){
				
				this.$router.push({path:'/'})
			},
			
			//请求自动补全数据
			getData() {
				this.$store.dispatch('autoCompletion')
				this.loading = true;
				
				
			},
//			显示书籍列表并请求数据
			toBooksArr(item) {
				this.loading = false
				this.$store.commit('setbooksKey', item)
				this.$store.dispatch('getBooksData')
				
			},
			
			//跳转页面并请求书籍详情数据
			toPathDetails(item){
//										console.log('页面跳转到details')
										let id=item._id
										this.$store.dispatch('bookDetails',id)
//										console.log(item)
									this.$router.push({path:'/details'})
										
			}
			
	
		},
		
	};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.list {
		.booksArr {
			padding: 0.27027rem 0.135135rem 0rem 0.135135rem;
			
		}
		.conter {
			padding-top: 1.459459rem;
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
			h4{
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
		.bottom{
			font-size: 0.324324rem;
			text-align: center;
				
				.child{
					
					
					span{
						display: inline-block;
						padding: 0.054054rem;
						border:0.027027rem solid #ddd ;
					}
				}
		}
	}
	
	img {
		width: 100%;
	}
	
	.nvb {
		position: fixed;
		width: 100%;
		height: 1.459459rem;
		background-color: #c62f2f;
		line-height:1.459459rem ;
		
		.nvb-text{
			text-align: center;
			font-size: 0.432432rem;
			color: white;
		}
		
		.nvb-seek{
			color: white;
			font-size: 0.432432rem;
		}
	}
	.booksList{
		overflow: hidden;
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