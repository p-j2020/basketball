<template>
    <div class="new">
        <div class="container">
            <div class="left">
                <div class="teamNew-bar">
                    球队新闻
                </div>
                <ul class="teamnewsList" >
                    <li class="teamNew"
                    v-for="item in newList"
                    :key="item.new_id">
                        <div class="team-new-box"  v-if="item.team_id == teamId ">
                           <div class="team-new-left">
                               <img class="img" :src="api+item.new_img_url" alt="新闻图片">
                           </div>
                           <div class="team-new-right">
                               <p class="new-title"> {{ item.new_title }} </p>
                               <p class="time"> {{ item.new_date.substr(0,10) }} </p>
                               <p class="new-text"> {{ item.new_text }} </p>
                           </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="right">
                <div class="new-item-bar">
                        <p>新闻</p>
                    </div>
                <ul class="newsList">
                    <li class="new-item"
                    v-for="(item) in newList" 
                    :key="item.new_id">
                        <div class="new-box" v-if="item.team_id != teamId ">
                            <p class="time"> {{ item.new_date }} </p>
                            <p class="new-title"> {{ item.new_title}} </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'new',
    data () {
        return {
            teamId:this.$store.state.teamId,
            typeId:this.$store.state.typeId,
            newList:[], 
        }
    },
    methods: {
        getNews(){
            axios.get('/api/news/cbaNews').then(
                res =>{
                    console.log(res.data.data);
                    if(this.typeId == 0){
                        this.newList = res.data.data;
                    }
                }
            ).catch(console.log)
            axios.get('/api/news/nbaNews').then(
                res =>{
                    console.log(res.data.data);
                    if(this.typeId == 1){
                        this.newList = res.data.data;
                    }
                }
            ).catch(console.log)

            // axios.post('/api/news/cbaTeamNews',{team_id:this.teamId}).then(
            //     res =>{
            //         console.log(res.data.data,'cba');
            //     }
            // ).catch(console.log)
            // axios.post('/api/news/nbaTeamNews',{team_id:this.teamId}).then(
            //     res =>{
            //         console.log(res.data.data,'nba');
            //     }
            // ).catch(console.log)
        }
    },
    created () {
        this.getNews()
    },
    watch:{
        '$store.state.typeId' :function(n,o){
            this.typeId = n;
        },
        '$store.state.teamId' :function(n,o){
            this.teamId =n;
        }
    }
}
</script>

<style scoped>
.new{
    width: 100%;
}

.new .container{
    width: 100%;
    /* border: black 1px solid; */
    min-height: 100px;
    display: flex;
    justify-content: space-between;
}

.container .left{
    flex: 2;
    /* background-color: rgb(155, 149, 149); */
}

.left .teamNew-bar{
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    background-color: white;
    padding-left: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    /* border-left: 5px solid black; */

}

.left .teamnewsList{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.teamnewsList:first-of-type{
    border-top: 5px solid rgb(104, 102, 102);
    /* color: red; */
}

.teamnewsList .teamNew{
    /* border: black 1px solid; */
    
}

.teamNew .team-new-box{
    display: flex;
}

.team-new-box .team-new-left{
         /* width: 200px; */
        height: 300px;
        display: flex;
        align-items: center;
        /* overflow: hidden; */
        border-bottom: 5px solid rgb(104, 102, 102);
}


.team-new-left .img{
    width: 250px;
    height: 250px;
    /* padding-top:10px; */
    /* overflow: hidden; */
}

.team-new-box .team-new-right{
     /* height: 300px; */
    background-color: white;
    padding: 20px;
    border-bottom: 5px rgb(104, 102, 102) solid;
    cursor: pointer;
}

.team-new-right .new-title{
    font-size: 22px;
    font-weight: 600;
    padding-top: 10px;
}

.team-new-right .time{
    width: 230px;
    height: 20px;
    /* text-align: center; */
    /* overflow: hidden; */
    /* background-color: red; */
    font-size: 20px;
    padding-top: 10px;
}

.team-new-right .new-text{
    font-size: 18px;
    padding-top: 30px;
    line-height: 2em;
    height: 135px;
    overflow: hidden;
}

.container .right{
    flex: 1;
    /* background-color: white; */
}

.right .new-item-bar{
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    background-color: white;
    padding-left: 20px;
    box-sizing: border-box;
    border-left: 5px solid rgb(104, 102, 102);
}

.right .newsList{
    padding: 0 20px 20px 20px;
}
.newsList .new-item{
    /* border: red 1px solid; */
    padding-top: 20px;
}
.new-item .new-box{
    min-height: 0px;
    /* border: solid 1px black; */
}
.new-box .new-title{
    font-size: 20px;
    font-weight: 600;
}

.new-box .time{
    font-size: 18px;
}



</style>