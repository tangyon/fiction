

//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);

export default{
	//搜索框的val双向绑定
	setTextName(state,val){
		state.textName=val
	},
	//自动补全
	setTextNmaeArr(state,arr){
		state.textNmaeArr=arr
//		console.log(state.textNmaeArr)
	},
//	书籍数组
	setBooksArr(state,val){
		state.booksArr=val
//		console.log(state.booksArr)
	},
//	书籍关键字
	setbooksKey(state,val){
		state.booksKey=val
//		console.log(state.booksKey)
	},
	//书籍详情
	setBookDetails(state,data){
		state.bookDetails=data
//		console.log(state.bookDetails)
	},
	//书籍详情id
	setId(state,id){
		state.id=id
	},
	//书源
	setShuYuan(state,data){
		state.shuYuan=data
	},
	//章节列表
	setSectionList(state,data){
		state.sectionList=data
	},
	//章节内容
	setSectioncontent(state,data){
		state.sectioncontent=data
//		console.log(state.sectioncontent)
	},
//	上一章
	addIndex(state){
//		console.log('mutations',state.sectionList)
		if(state.inex<0){
			return state.inex=0
		}
		state.index--
	},
//	下一章
	nextIndex(state){
		if(state.inex>state.sectionList.length-1){
			return state.inex=state.sectionList.length-1
		}
		state.index++
	},
	//当前章节
	setIndex(state,index){
//		console.log("setIndex",index)
		state.index=index
	},
	
	//书源下标
	setShuYuanSubscript(state,index){
		state.shuYuanSubscript=index
	},
	
	//本地数据
	setLocalStorageData(state,data){
		state.localStorageData=data
	},
	
	setMyData(state,data){
		state.myData.push(data)
//		console.log(state.myData)
	},
	clearMyData(state){
		state.myData=[]
//		console.log('clear',state.myData)
	},
	showLoading(state,res){

		state.loading=res
	},
	hideLoading(state,res){

		state.loading=res
	}
}	
