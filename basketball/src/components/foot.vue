<template>
    <div class="footer">
        <div class="information">
                <div class="footer-logo">
                    <img class="logoimg"  src="../assets/imgs/index/logo.jpg" alt="logo">
                </div>
                <div class="lists">
                    <div class="left-lists">
                        <ul>
                            <li v-for=" item in dataes" :key="item.key">
                                <dl>
                                    <dt>{{ item.key }}</dt>
                                    <dd v-for="value in item.value" :key="value.name" @click="change(value.id,value.type_id)">
                                      <!-- <a href="###">{{ value }}</a> -->
						                          <!-- <router-link :to="{path: value.path}"> {{ value.name }} </router-link> -->
                                      <router-link v-show="value.id != 'more'"
                                        :to="{path: value.path} ">
                                        {{value.name}} 
                                      </router-link> 
                                      <a v-show="value.id == 'more'" :href="value.path">
                                        {{ value.name }} 
                                      </a>
                                    </dd>
                                </dl>
                            </li>
                            <!-- <li> 
                                <dl>
                                    <dt>相关链接</dt>
                                    <dd><a href="###"><img src="../assets/imgs/index/TMALL.svg" alt="天猫旗舰店"> <span>天猫旗舰店</span></a></dd>
                                    <dd><a href="###"><img src="../assets/imgs/index/JD.svg" alt="京东旗舰店"> <span>京东旗舰店</span></a></dd>
                                </dl>
                            </li> -->
                        </ul>
                    </div>
                    <div class="right-lists">
                        <!-- <div class="code">
                            <img src="../assets/imgs/index/weibo.png" alt="微博">
                            <img src="../assets/imgs/index/wechat.png" alt="微信">
                        </div>
                          <div class="other">
                            <div class="phone">
                                <p>服务热线：400-860-8800</p>
                                <p>027-87305995</p>
                            </div>
                            <p class="email">联系邮箱：kefu@niimbot.com</p> 
                        </div>  -->
                    </div>
                </div>   
            </div>
        <div class="friend-link"></div>
        <div class="copyright">
            <p>123456</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myFoot',
    data () {
        return {
            dataes:[
                {
                  key:"CBA" , 
                  value:[
                    {id: 0, type_id: 0,name:"球员",path:"/cba?type_id=0&category_id=0"},
                    {id: 1, type_id: 0,name:"球队",path:"/cba?type_id=0&category_id=1"},
                    {id: 2, type_id: 0,name:"赛程",path:"/cba?type_id=0&category_id=2"},
                    {id: 3, type_id: 0,name:"新闻",path:"/cba?type_id=0&category_id=3"}
                  ]
                },
                {
                  key:"NBA", 
                  value:[
                    {id: 0, type_id: 1,name:"球员",path:"/cba?type_id=1&category_id=0"},
                    {id: 1, type_id: 1,name:"球队",path:"/cba?type_id=1&category_id=1"},
                    {id: 2, type_id: 1,name:"赛程",path:"/cba?type_id=1&category_id=2"},
                    {id: 3, type_id: 1,name:"新闻",path:"/cba?type_id=1&category_id=3"}
                  ]
                },
                {key:"更多" , value:[
                  {id:"more", name: "NBA腾讯体育" , path: "https://sports.qq.com/", children: [] },
						      {id:"more", name: "虎扑" , path: "https://www.hupu.com/", children: [] },
						      {id:"more", name: "中国CBA" , path: "https://sports.sohu.com/s/cba", children: [] },
                  ]
                },
            ]
        }
    },
    methods: {
      change(id,type_id){
        this.$store.dispatch("optionId",id);
        this.$store.dispatch("typeId",type_id);
      }

    },
    created () {

    }
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: black;
}

ul,
li {
  list-style: none;
}

.hide {
  display: none;
}
.footer {
  width: 100%;
  padding-bottom: 20px;
  background-color: #F6F6F6;
}
.footer .information {
  width: 1200px;
  margin: 0px auto;
}
.information .footer-logo {
  display: flex;
  width: 1200px;
  padding-top: 20px;
  margin: 56px 0 64px 0;
}
.footer-logo .logoimg{
    height: 80px;
    background-size: cover; 
    border-radius: 5px;
    margin-left: 50px;
}
.information .lists {
  display: flex;
  justify-content: space-between;
}

.information .lists .left-lists {
}

.information .lists .left-lists ul {
  width: 551px;
  height: 254px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.information .lists .left-lists dt {
  font-size: 16px;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
  padding-bottom: 32px;
}

.information .lists .left-lists dd {
  padding-bottom: 16px;
  font-size: 14px;
}
.information .lists .left-lists a {
  color: #999;
}

.information .right-lists {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.information .right-lists .code img {
  width: 120px;
  height: 120px;
  margin-left: 40px;
}
.information .right-lists .other {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
}
.information .right-lists .other p {
  margin-bottom: 16px;
}
.friend-link {
  width: 100%;
  height: 20px;
  border-top: 1px solid #dbdbdb;
}
.copyright {
  width: 100%;
  height: 111px;
  padding: 32px;
  box-sizing: border-box;
}
.copyright p {
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  color: rgba(153, 153, 153, 1);
}

</style>