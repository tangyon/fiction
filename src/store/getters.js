//实时监听state值的变化(最新状态)

export default{
	
// GettextNmaeArr:state=>state.textNmaeArr
   	
   	//自动补全
   	GettextNmaeArr(state){
// 		console.log(state.textNmaeArr)
   		return state.textNmaeArr
   	},
   	
// 	书籍
 	 GetBooksArr(state){
// 	 	console.log(state.booksArr)
   		return state.booksArr
   },
   
  	//书籍详情
	getBookDetails(state){
//		console.log('gett',state.bookDetails)
		return state.bookDetails
	},
//	书籍详情id
	getId(state){
		return state.id
	},
	//书源
	getShuYuan(state){
		return state.shuYuan 
	},
	
	//章节列表
	getSectionList(state){
//		console.log('章节列表',state.sectionList)
		return state.sectionList
	},
	
//	当前显示的第index章
	getIndex(state){
		

	 return state.index	
	},
	
	//章节内容
	getSectioncontent(state){
//		console.log(state.sectioncontent)
		return state.sectioncontent
	},
	//书源下标
	setShuYuanSubscript(state){
		return state.shuYuanSubscript
	},
	
	//本地数据
	
	getLocalStorageData(state){
		return state.localStorageData
	},
	
	getMyData(state){
		return state.myData
	},
	
	getLoading(state){
		console.log(state.loading)
		return state.loading
	}
}
