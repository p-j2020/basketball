<template>
    <div class="nba"> 
        <nba-bar></nba-bar>
        <div class="tabeList"> 
            <div 
                class="item" 
                v-for="item in tabeList" 
                :key="item.category_id" 
                @click="goto(item.category_id)">
                <img class="team-logo" :src="api+item.img_url" alt="球队图片">
                <span class="team-name">
                    {{ item.team_name }}
                </span>
            </div>
        </div>
        <div class="video">
            <video src="../../assets/video/nba.mp4" controls='controls'></video>
        </div>
        <div class="news">
            <div class="new" 
                v-for="item in newsList" 
                :key="item.new_id"
                @click="goTonewDetail(item.new_id,item.team_id,1)">
                <div class="new-img">
                   <img class="img" :src="api+item.new_img_url" alt="新闻图片"> 
                </div>
                <div class="new-text">
                    <p class="title"> {{ item.new_title }} <span> {{ item.new_date.substr(0,10) }}</span> </p>
                    <p class="text"> {{ item.new_text }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import nbaBar from './nbaBar/nbaBar';
export default {
    name: 'nba',
    components:{nbaBar,},
    data () {
        return {
            tabeList:[],
            newsList:[],
        }
    },
    methods: {
        goTonewDetail(newId,teamId,typeId){
            this.$router.push(
                {
                    path:'/newDetail',
                    query:{
                        newId:newId,
                        teamId:teamId,
                        typeId:typeId
                    }
                }
            )
        },
        getNbaTeamList(){
            axios.get("/api/nbaTeam/getList").then(
            res =>{
                this.tabeList = res.data.data;
                // console.log(this.tabeList)
            }).catch(console.log)
        },
        getnbaNews(){
            axios.post('/api/news/NbaTeamNews',{team_id:0}).then(
                res =>{
                    // console.log(res.data.data)
                    this.newsList =res.data.data
                }
            ).catch(console.log)
        },
        goto(id){
            this.$store.dispatch('teamId',id);
            this.$router.push({
                path:'/nba',
                query:{
                    type_id: 1,
                    category_id: 1
                }
                })
        },
    },
    created () {
        this.getNbaTeamList();
        this.getnbaNews()
    }
}
</script>

<style scoped>
.nba{
    width: 1200px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* background-color: rgba(175, 179, 180, 0.938); */

}

.nba .tabeList{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 50px;
}

.tabeList .item{
    width: 80px;
    padding: 10px;
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.item .team-logo{
    width: 30px;
    height: 30px;
}

.item .team-name{

}

.nba .video{
    width: 100%;
    margin-bottom: 50px;

}
.nba .video video{
    width: 90%;
    margin-left: 5%;
}

.nba .news{
    margin-bottom: 50px;
    width: 100%;
    min-height: 100px;
    background-color:white;
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
    /* color: rgb(107, 107, 150); */
}

.new-text .text:hover{
    cursor: pointer;
    /* color: rgb(107, 107, 150); */
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