<template>
    <div class="cba">
        <cba-bar></cba-bar>
        <div class='team-list'>
                <div class="item" v-for="item in teamList" :key="item.category_id">
                    <img class="team-logo-img" :src="api+item.img_url" alt="">
                    <span class="team-name"> {{ item.team_name }} </span>
                </div>
        </div>
        <div class="img-list">
            <div class="texts">
                <div class="text">
                    <p class="title">球员篇：甜不甜，练过才知道</p>
                    <p class="text">紧张激烈的赛场上，初中生小球员站上罚球线准备罚球。被卖西瓜老大爷的一句“别拍了，保甜”拉回现实。原来正站在西瓜摊前，摸着西瓜梦想站在球场上拍球。</p>
                </div>
                <div class="text">
                    <p class="title">教练篇：吃什么不重要，吃定战术才重要</p>
                    <p class="text">高中篮球联赛赛场上，教练拿出战术板，球员围成一圈，讲起了战术。球员一句“教练，要不咱先吃点面”拉回现实。原来教练吃饭仍心系比赛现场，在餐桌上画起了战术。</p>
                </div>
                <div class="text">
                    <p class="title">球迷篇：站起来，输赢一起扛</p>
                    <p class="text">球场环廊内5位身穿球衣的“球员”互相打气加油，拿出必胜的气势走进赛场。画风一转，镜头从小孩满脸的紧张拉开。原来他们是5位球迷，在观众席上呐喊，并且带动全场观众为赛场上的选手加油助威。</p>
                </div>
            </div>
            <div class="imgs">
                <div class="img" v-for="item in imgs" :key="item.id">
                    <img :src="item.img_url" alt="cba精彩图片">
                </div> 
            </div>  
        </div>
        <video class="video" src="../../assets/video/cba.mp4" controls='controls'></video>
        <div class="news">
            <div class="new" v-for="item in newsList" :key="item.new_id">
                <div class="new-img">
                   <img class="img" :src="api+item.new_img_url" alt="新闻图片"> 
                </div>
                <div class="new-text">
                    <p class="title"> {{ item.new_title }} <span> {{ item.new_date }}</span> </p>
                    <p class="text"> {{ item.new_text }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cbaBar from './cbaBar/cbaBar'
export default {
    name: 'cba',
    components:{cbaBar,},
    data () {
        return {
            imgs:[
                {id:1 ,img_url:require('../../assets/imgs/index/cba/img1.png')},
                {id:2 ,img_url:require('../../assets/imgs/index/cba/img2.png')},
                {id:3 ,img_url:require('../../assets/imgs/index/cba/img3.png')},
            ],
            teamList:[],
            newsList:[],
        }
    },
    methods: {
        getTeam(){
            axios.get('/api/cbaTeamRouter/getCbaTeamList').then(
                res =>{
                    this.teamList = res.data.data;
                    // console.log(this.teamList);
                }
            ).catch(console.log)
        },
        getCbaNews(){
            axios.post('/api/news/cbaTeamNews',{team_id:0}).then(
                res =>{
                    // console.log(res.data.data)
                    this.newsList =res.data.data
                    console.log(this.newsList)
                }
            ).catch(console.log)
        }
    },
    created () {
        this.getTeam();
        this.getCbaNews();
    }
}
</script>
<style scoped>
.cba{
    width: 1200px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* background-color: rgba(175, 179, 180, 0.938); */
}
.cba .team-list {
    width: 90%;
    /* border: 1px solid black; */
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    /* background-color: white; */
    margin: 0 auto;
    padding-bottom: 20px;
    /* background-color: red; */
}
.team-list .item{
    width: 70px;
    /* border: 1px solid black; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 22px;
    margin-right: 15px;
    margin-bottom: 40px;
    cursor: pointer;
}
.item .team-logo-img{
    width: 30px;
    height: 30px;
    border-radius: 5px;
    /* border: 1px solid red; */
}
.cba .img-list{
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    /* align-items: center; */
    /* border: 1px solid black; */
    border-radius: 5px;
    /* padding: 10px; */
    box-sizing: border-box;
    /* overflow: hidden; */
    margin: 10px auto;
    /* background-color: white; */
    overflow: hidden;
    /* padding-bottom: 50px; */
    background-color: white;
}
.img-list .texts{
    flex: 1;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start ;
    background-color: #CED0D1;

}

.texts .text{
    flex: 1;
    /* margin-top: 50px; */
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* background-color: white; */
}
.text .title{
    font-size: 20px;
    margin-top: 60px;
    background-color: rgb(165, 163, 163);
    border-radius: 5px 0px 0px 5px;
    font-weight: 600;
}
.text .text{
    font-size: 18px;
    text-indent: 2em;
    line-height: 2em;
}
.img-list .imgs{
    /* padding: 3px; */
    flex: 1;
    /* height: 200px; */
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    flex-wrap: wrap;
}
.imgs .img{
    border: 1px solid rgb(165, 162, 162);
    /* width: 358px;
    height: 259px; */
    overflow: hidden;
    /* background-color: red; */
    box-sizing: border-box;

}
.img img{
    width: 540px;
    height: 265px;
    transition: all 0.5s;
}
.img:hover img{
    /* width: 300px;
    height: 350px; */
    transform: scale(1.1);
}
.cba .video{
    margin-top: 50px;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 50px;
}

.cba .news{
    width: 100%;
    min-height: 100px;
    /* border: 1px solid black; */
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.news .new{
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid black;
    padding: 20px;
}

.new .new-img{
    
}
.new-img .img{
    width: 150px;
    height: 150px;
    cursor: pointer;
}

.new .new-text{
        margin-left: 10px;
}
.new-text .title{
    font-size: 20px;
    font-weight: 500;
}
.new-text .title:hover{
    cursor: pointer;
    color: rgb(107, 107, 150);
}

.new-text .text:hover{
    cursor: pointer;
    color: rgb(107, 107, 150);
}
.new-text .text{
    line-height: 2em;
    padding-top: 20px;
    width: 100%;
    height: 58px;
    text-indent:2em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>