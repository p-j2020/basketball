<template>
    <div class="header" >
        <div class="left">
        	<img class="logoImg" src="../assets/imgs/index/logo.jpg" alt="logo">
          <p class="user" v-show="userName!=''"> 欢迎您，{{ userName }} </p>
		  <p style="cursor: pointer;" @click="goToLogoin" v-show="userName!=''">退出</p>
          <p class="logoin" v-show="userName == ''" @click="goToLogoin">登录</p>
        </div>
         <div class="right">
        	<div class="nav">
                <ul class="nav-list">
                    <!-- <li class="option1">        
                        <a class="item first" href="./index.html">首页</a>
                    </li> -->
                    <li class="option1" v-for="item in arr" :key="item.name">
                        <!-- <a class="item" :href="item.path">{{ item.name }}</a> -->
						<router-link :to="{path: item.path}"> {{ item.name }} </router-link>
                        <ul class="sub-nav-list" v-if="item.children && item.children.length">
                            <li 
                              class="option2"
                              v-for="subitem in item.children" 
                              :key="subitem.name"
                              @click="change(subitem.id,subitem.type_id)">
                              <router-link v-show="subitem.id != 'more'"
                                :to="{path: subitem.path} ">
                                {{subitem.name}} 
                              </router-link> 
							                <a v-show="subitem.id == 'more'" :href="subitem.path"> {{ subitem.name }} </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    name: 'myHead',
    data () {
		return{
			userName:'',
			arr: [
				{ name: "首 页", path: "/home", children: [], },
				{ 
					name: "CBA", 
					path: "/cba?type_id=0&category_id=1", 
					children: [
						{id: 0, type_id: 0 ,name: "球员" , path: "/cba?type_id=0&category_id=0", children: [] },
						{id: 1, type_id: 0 ,name: "球队" , path: "/cba?type_id=0&category_id=1", children: [] },
						{id: 2, type_id: 0 ,name: "赛程" , path: "/cba?type_id=0&category_id=2", children: [] },
						{id: 3, type_id: 0 ,name: "新闻" , path: "/cba?type_id=0&category_id=3", children: [] },
					], 
				},
				{
					name:"NBA",
					path:"/nba?type_id=1&category_id=1",
					children:[
						{ id: 0 ,type_id: 1, name: "球员" , path: "/nba?type_id=1&category_id=0", children: [] },
						{ id: 1 ,type_id: 1, name: "球队" , path: "/nba?type_id=1&category_id=1", children: [] },
						{ id: 2 ,type_id: 1, name: "赛程" , path: "/nba?type_id=1&category_id=2", children: [] },
						{ id: 3 ,type_id: 1, name: "新闻" , path: "/nba?type_id=1&category_id=3", children: [] },
					]
				},
				{
					name:"社区",
					path:"/comment",
					children:[ ]
				},
				{
					name:"更 多",
					path:"###",
					children:[
						{id:"more", name: "NBA腾讯体育" , path: "https://sports.qq.com/", children: [] },
						{id:"more", name: "虎扑" , path: "https://www.hupu.com/", children: [] },
						{id:"more", name: "中国CBA" , path: "https://sports.sohu.com/s/cba", children: [] },
					]
				},
				{
					name:"规 则",
					path:"/rule",
					children:[]
				},
			],
		}
    },
    methods: {
		goToLogoin(){
			this.$router.push({
			path: '/',
			query:{}})
		},
    	goTo(id){
			if(this.$route.query.categoryId == id){
			  return;
			}
			this.$router.push({
			path: '/product',
			// name: 'product',
			query:{
				categoryId: id
			}
			})
		},
    	change(id,type_id){
			this.$store.dispatch("optionId",id);
			this.$store.dispatch("typeId",type_id);
		}
	},
	created () {
		// this.userName = this.$route.query.userName;
		// this.user_name = sessionStorage.getItem('userName');
			if(!JSON.parse(window.sessionStorage.getItem('userName'))){
				return
			}else{
				const userName = JSON.parse(window.sessionStorage.getItem('userName'));
				this.userName = userName;
					// console.log(this.userName);
			}
			
	},
}
</script>

<style scoped>
.logoImg{
    /* margin-top: 20px; */
    /* width: 300px; */
    height: 80px;
    background-size: cover; 
    border-radius: 5px;
    margin-left: 50px;
}

.hide {
  display: none;
}

 .header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
  color: #242424;
  background-color: rgba(255, 255, 255, 1);

  /* border: 1px black solid; */
}

/* .header:hover {
  background-color: rgba(255, 255, 255, 1);
} */

.header .left{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.left .user{
	font-size: 22px;
	margin-left: 50px;
	padding: 0 10px 0px 10px ;
	text-align: center;
}
.left .logoin{
	font-size: 18px;
	margin-left: 50px;
	padding: 0 10px 0px 10px ;
	text-align: center;
	color: rgb(80, 189, 233);
	cursor: pointer;
}

 .header .right {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  padding-right: 20px;
}

.nav .nav-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav .nav-list .option1 {
  padding: 0 20px;
  line-height: 80px;
  position: relative;
  box-sizing: border-box;

}

.nav .nav-list .option1 a {
  height: 80px;
  color: #242424;
}

.nav .nav-list .option1:hover .item {
  color: #fc4b42;
}

.nav .nav-list .option1:hover {
  border-bottom: 2px solid #0253A4; 
}

.nav .nav-list .option1:hover .sub-nav-list {
  display: block;
  /* border: 1px solid red; */
}

.option1 .sub-nav-list {
  /* border: solid 1px black; */
  position: absolute;
  background-color: #ffffff;
  left: -50px;
  margin-top: 2px;
  line-height: 0 25px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: none;
}

.option1 .sub-nav-list .option2 {
  line-height: 50px;
  width: 220px;
  /* box-sizing: border-box; */
}

.option1 .sub-nav-list .option2 :hover {
  background-color: rgba(238, 238, 238, 1);
}

.option1 .sub-nav-list .option2 a {
  display: inline-block;
  width: 220px;
  padding-left: 50px;
  box-sizing: border-box;
  /* padding-left: 20px; */
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}

.right .search {
  padding: 0 30px;
  line-height: 80px;
}

.right .search a {
  display: block;
  line-height: 80px;
}

.right .search:hover {
  background-color: rgba(238, 238, 238, 1);
}

.right .store {
  line-height: 80px;
  padding: 0 30px;
  position: relative;
}

.right .store .store-down {
  position: absolute;
  /* border: black 1px solid; */
  left: -25px;
  line-height: 0;
  background-color: #ffffff;
  display: none;
  box-shadow: 0 0 3px rgb(82, 78, 78);
  /* display: flex;
    flex-direction: column;
    justify-content: space-around; */
}

.right .store .store-down img {
  padding: 10px;
  width: 120px;
  height: 120px;
}

.right .store .store-down .TM {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 0 10px;
  /* box-sizing: border-box; */
}

.right .store .store-down .TM:hover {
  background-color: rgba(238, 238, 238, 1);
}

.right .store .store-down .TM p {
  height: 48px;
  line-height: 48px;
}

.right .store .store-down .TM img {
  width: 20px;
  height: 20px;
}
.right .store .store-down .JD {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 0 10px;
}

.right .store .store-down .JD:hover {
  background-color: rgba(238, 238, 238, 1);
}

.right .store .store-down .JD p {
  height: 48px;
  line-height: 48px;
  /* padding-left: 10px; */
}

.right .store .store-down .JD img {
  width: 20px;
  height: 20px;
}

.right .store:hover {
  background-color: rgba(238, 238, 238, 1);
}

.right .store:hover {
  cursor: pointer;
}

.right .store:hover .store-down {
  display: block;
}

.right .lang {
  line-height: 80px;
  padding: 0 25px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
}
.right .lang .item {
  padding: 0 8px;
}

.right .lang:hover {
  background-color: rgba(238, 238, 238, 1);
}

.right .lang .arrow {
  transition: all 0.3s;
}

.right .lang:hover .arrow {
  transform: rotate(180deg);
}

.right .lang:hover ul {
  display: block;
}

.right .lang ul {
  position: absolute;
  background-color: #ffffff;
  top: 80px;
  left: -10px;
  display: none;
  box-shadow: 0 0 3px rgb(82, 78, 78);
}
.right .lang ul li {
  width: 140px;
  height: 48px;
  line-height: 48px;
  text-align: center;
}
.right .lang ul li:hover {
  background-color: rgba(238, 238, 238, 1);
}
</style>