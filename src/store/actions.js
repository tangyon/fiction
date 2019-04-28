//好在vuex官方API还提供了一个actions，这个actions也是个对象变量，
//最大的作用就是里面的Action方法 可以包含任意异步操作，
//这里面的方法是用来异步触发mutations里面的方法，
//actions里面自定义的函数接收一个context参数和要变化的形参，
//context与store实例具有相同的方法和属性，
//所以它可以执行context.commit(' '),

import axios from 'axios'

export default {
//
//	hideFooter(context) {
//		//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
//
//		console.log('context==>', context)
//		context.commit('increment', '10');
//	},

	//获取数据自动补全

	autoCompletion(context) {
		
		
		context.commit('showLoading',true)
		axios.get(`/api/book/auto-complete?query=${context.state.textName}`).then(res => {
			let nameData=res.data.keywords
//			console.log(nameData)
			context.commit('setTextNmaeArr',nameData)
			context.commit('hideLoading',false)
			
		}).catch(err => {
			console.log(err)
		})
	},
	
//	api.zhuishushenqi.com/book/fuzzy-search?query=一念&start=0&limit=2
//书籍搜索
	
	getBooksData(context) {
		
		let axiosDate = new Date()
		context.commit('showLoading',true)
		
		axios.get(`/api/book/fuzzy-search?query=${context.state.booksKey}&start=0&limit=2`).then(res => {
			
			
			let data=res.data.books
//			总数
			let total=res.data.total
//			console.log(total)
			axios.get(`/api/book/fuzzy-search?query=${context.state.booksKey}&start=0&limit=${total}`).then(res => {
			let data=res.data.books
//			console.log(data)
			context.commit('setBooksArr',data)
			
			
			let oDate = new Date()
			let time = oDate.getTime() - axiosDate.getTime()
			console.log('time',time)
			setTimeout(()=>{
					context.commit('hideLoading',false)
				},time)
			
			
		}).catch(err => {
			console.log(err)
		})
			
		}).catch(err => {
			console.log(err)
		})
	},
	
	//书籍详情
	
	bookDetails(context,id) {
		context.commit('showLoading',true)
		let axiosDate = new Date()
		axios.get(`/api/book/${id}`).then(res => {
			let nameData=res.data
			context.commit('setBookDetails',nameData)
			context.commit('setId',id)
			
			let oDate = new Date()
			let time = oDate.getTime() - axiosDate.getTime()
			console.log('time',time)
			setTimeout(()=>{
					context.commit('hideLoading',false)
				},time)
			
			
		}).catch(err => {
			console.log(err)
		})
	},
	
	//章节列表
//	http://api.zhuishushenqi.com/toc/577b477dbd86a4bd3f8bf1b2?view=chapters
	sectionList(context,id) {
//		console.log(id)
//		api.zhuishushenqi.com/book/57206c3539a913ad65d35c7b
			
		context.commit('showLoading',true)
		axios.get(`/api/toc/${id}?view=chapters`).then(res => {
//			书源id
			
//			console.log('章节id',id)
			let nameData=res.data.chapters
//			console.log('章节列表',nameData)
			context.commit('setSectionList',nameData)
			
			
			let _link=nameData[context.state.index].link
		//进行编码
			_link=encodeURIComponent(_link)
//			console.log('link=======>',_link)
			this.dispatch('sectioncontent',_link)
		}).catch(err => {
			console.log(err)
		})
	},
	
	//书源
	shuYuan(context,id) {
//		console.log(id)
//		api.zhuishushenqi.com/toc?view=summary&book=57206c3539a913ad65d35c7b



		axios.get(`/api/toc/?view=summary&book=${id}`).then(res => {
			let nameData=res.data
			let _id=nameData[1]._id
//			console.log(nameData[1])
			context.commit('setShuYuan',nameData)
			this.dispatch('sectionList',_id)
		}).catch(err => {
			console.log(err)
		})
	},

	//章节内容
	sectioncontent(context,_link) {
			context.commit('showLoading',true)
			let axiosDate = new Date()
		axios.get(`/chapter2/chapter/${_link}?k=2124b73d7e2e1945&t=1468223717`).then(res => {
//			let nameData=res.data.chapter.body
			

			let nameData=JSON.parse(res.request.responseText).chapter
			let data=nameData.cpContent ||nameData.body
			context.commit('setSectioncontent',data)
			
			let oDate = new Date()
			let time = oDate.getTime() - axiosDate.getTime()
			
			setTimeout(()=>{
					context.commit('hideLoading',false)
				},time)
			
		}).catch(err => {
			console.log(err)
		})
	},
	
	//本地数据
	
	localStorageData(){
		if(localStorage.textId){
			let data=JSON.parse(localStorage.textId)
			context.commit('setLocalStorageData',data)
		}
	},
	
	
	benDiBookDetails(context,id) {
//		console.log(id)
//		api.zhuishushenqi.com/book/57206c3539a913ad65d35c7b
		axios.get(`/api/book/${id}`).then(res => {
			let nameData=res.data
//			console.log(nameData)
			context.commit('setMyData',nameData)
			context.commit('setId',id)
			
		}).catch(err => {
			console.log(err)
		})
	},
	
}

