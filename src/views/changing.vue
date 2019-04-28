<template>
	<div class="changing">
		<van-nav-bar class='nav-bac' title="换源" left-text="返回" left-arrow @click-left="getBack" />
		
		
		<ul class="changing-shuYuan">
			<li v-for="(item,index) in shuYuan" :key='index' @click="goRead(index)">
				<h4>
					{{item.name}}
				</h4>
				<p>
					{{item.lastChapter}}
				</p>
			</li>
			
		</ul>
		
	</div>
	
</template>

<script>
	import {  NavBar } from 'vant';
	
	export default{
		name:'Changing',
		
		components: {
			[NavBar.name]: NavBar,
			
		},
		
		computed:{
			shuYuan(){
				
				console.log(this.$store.getters.getShuYuan)
				return this.$store.getters.getShuYuan
			}
		},
		methods:{
//			返回
			getBack(){
				this.$router.go(-1)
			},
			//换源并跳转read页面
			goRead(index){
				
				console.log('书源==>',this.shuYuan[index])
				
				this.$store.commit('setShuYuanSubscript',index)
				this.$store.dispatch('sectionList',this.shuYuan[index]._id)
				this.$router.push({path:'/read'})
			}
		}
		
	}
	
	
</script>

<style lang="less" scoped>
		.changing{
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
		
		.changing-shuYuan{
			width: 100%;

			
			li{
				padding: 0.27027rem;
				
				h4{
					font-size: 0.54054rem;
				}
				
				p{
					font-size: 0.378378rem;
					color: #666;
				}
								
			}
		}
		
		}
</style>