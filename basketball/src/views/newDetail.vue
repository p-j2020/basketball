<template>
    <div class="new-detail">
        <my-head></my-head>
        <div class="new-detail-head">
            新闻详情
        </div>
        <div class="container">
            <div class="left">
                <div class="team-new"
                    v-for="item in newList" :key="item.new_id"
                    v-show="item.new_id == new_id">
                    <div class="new-head">
                        <p class="title"> {{ item.new_title }} </p>
                        <p class="time"> {{ item.new_date.substr(0,10) }} </p>
                    </div>
                    <div class="img">
                        <img class="new-img" :src="api+item.new_img_url" alt="">
                    </div>
                    <div class="new-content" v-html="item.context || item.content">
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="teamNewList">
                    <p class="bar" v-show="team_id != 0">球队新闻</p>
                    <p class="bar" v-show="team_id == 0">热门新闻</p>
                    <div class="otherNews">
                        <div class="new-item"  
                            v-for="item in newList" 
                            :key="item.new_id" 
                            v-show="item.team_id == team_id && item.new_id != new_id"
                            @click="goTonewDetail(item.new_id,item.team_id)">
                            <p class="time"> {{ item.new_date.substr(0,10) }} </p>
                            <p class="title"> {{ item.new_title }} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="othersNew">
            <div class="new-item" 
                v-for="item in newList" 
                :key="item.new_id"
                v-show="item.team_id != team_id"
                @click="goTonewDetail(item.new_id,item.team_id)">
                <p class="time"> {{ item.new_date.substr(0,10) }} </p>
                <p class="title"> {{ item.new_title }} </p>
            </div>
        </div>
        <el-backtop></el-backtop>  
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'newDetail',
    data () {
        return {
            team_id:undefined,
            new_id:undefined,
            type_id:undefined,
            newList:[],
        }
    },
    methods: {
        goTonewDetail(newId,teamId){
            this.$router.push(
                {
                    path:'/newDetail',
                    query:{
                        newId:newId,
                        teamId:teamId,
                    }
                }
            )
        },
        getNews(){
            if(this.type_id == 0){
                axios.get('/api/news/cbaNews').then(
                    res =>{
                        // console.log(res.data.data,'news');
                        this.newList = res.data.data;
                    }
                ).catch(console.log)
            }else{
                axios.get('/api/news/nbaNews').then(
                    res =>{
                        // console.log(res.data.data,'news');
                        this.newList = res.data.data;
                    }
                ).catch(console.log)
            }
        },
    },
    created () {
        this.new_id = this.$route.query.newId; 
        this.team_id = this.$route.query.teamId; 
        this.type_id = this.$route.query.typeId ||this.$store.state.typeId;
        console.log(this.new_id,this.team_id,this.type_id);
        this.getNews()
    },
    watch:{
        '$store.state.typeId' :function(n,o){
            this.type_id = n;
        },
        '$store.state.teamId' :function(n,o){
            this.team_id =n;
        },
        $route:{
            handler(val,oldval){
                if(val.query.newId != this.new_id){
                    // console.log(123456);
                    this.new_id = +this.$route.query.newId;
                    this.team_id = +this.$route.query.teamId
                    this.getNews();
                }
            },
            // 深度观察监听
            deep: true
        }
        
    }
}
</script>

<style scoped>
.new-detail{
    width: 100%;
    min-height: 200px;
}
.new-detail .new-detail-head{
    width: 100%;
    height: 50px;
    font-size: 30px;
    margin-top: 80px;
    line-height: 50px;
    color: rgb(63, 61, 61);
    background: #CFD2D2;
    padding: 10px 0 10px 50px;

}
.new-detail .container{
    width: 1200px;
    min-height: 500px;
    /* background: rgb(80, 76, 76); */
    margin: 20px auto;
    display: flex;
}

.container .left{
    flex: 2;
    /* border: 1px solid black; */
}
.left .team-new{
    min-height: 200px;
    display: flex;
    flex-direction: column;
    /* background: blue; */
    padding-bottom: 20px;

    /* border-bottom: 2px solid rgb(77, 74, 74); */
}
.team-new .new-head{
    padding: 10px;
}
.new-head  .title{
    font-size: 20px;
    font-weight: 550;
}
.new-head  .time{
    font-size: 18px;
}
.img{
    height: 400px;
    overflow: hidden;
    margin: 10px;
}
.img .new-img{
    width: 100%;

}
.team-new .new-content{
    font-size: 18px;
    line-height: 2em;
    text-indent: 2em;
}
.new-detail .othersNew{
    /* width: 700px; */
    width: 1170px;
    min-height: 200px;
    /* background: rgba(112, 110, 110, 0.5); */
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    border-top: 2px solid #CFD2D2;

}

.othersNew .new-item{
    /* border: 1px solid black; */
    margin-bottom: 10px;
    /* padding: 10px 10px 10px 100px; */
    padding: 10px;
    margin-left: 70px;
    max-width: 300px;
}
.othersNew .new-item:hover{
    /* background: rgb(148, 145, 145,0.5); */
    /* border-radius: 5px; */
    cursor: pointer;
}
.othersNew .new-item:hover .title{
    /* color: rgb(110, 110, 204); */
    color: rgb(110, 110, 204);
}
.othersNew .new-item .time{
    font-size: 18px;
}
.othersNew .new-item .title{
    font-size: 20px;
    font-weight: 400;
    /* text-indent: 2em; */
}

.container .right{
    flex: 1;
}
.right .teamNewList{
    margin-top: 80px;
    border-bottom: 2px solid #CFD2D2;
    box-shadow: 0 2px 12px 0 #CFD2D2;
}
.teamNewList .bar{
    width: 100%;
    height: 30px;
    font-size: 18px;
    text-align: center;
    /* color: rgb(199, 190, 190); */
    letter-spacing: 1em;
    background: #CFD2D2;
    border-radius: 5px 5px 0px 0px;
}
.teamNewList .new-item{
    padding: 5px;
    border-left: 2px solid #CFD2D2;
    border-right: 2px solid #CFD2D2;
}
.teamNewList .new-item:hover{
    /* color: rgb(110, 110, 204); */
    color: rgb(110, 110, 204);
    cursor: pointer;
}
</style>