<template>
    <div class="team">
        <div class="team-bar" v-for="item in team" :key="item.category_id">
            <div class="left">
                <img class="team-img" :src="api+item.img_url" alt="球队图片">
                <p class="team-name" v-show="typeId == 0"> {{ item.team_name }} </p>
            </div>
            <div class="cba-right" v-show="typeId == 0">
                <p class=" name city">所在城市：<span class="text"> {{ item.city}} </span> </p>
                <p class=" name gymnasium">体育馆名称：<span class="text"> {{ item.gymnasium }} </span></p>
                <p class=" name people">体育馆人数：<span class="text"> {{ item.people }} </span></p>
                <p class=" name head_coach">现任主教练：<span class="text"> {{ item.head_coach }} </span></p>
                <p class=" name champion">冠军次数：<span class="text"> {{ item.champion }} </span></p>
            </div>
            <div class="nba-right" v-show="typeId == 1" v-for="item in team" :key="item.category_id">
                <div class="left">
                    <h1 class="team-name"> {{ item.team_position}} {{ item.team_name }} 队 </h1>
                    <p class="score">常规赛 {{ item.score }} </p>
                    <div class="line"></div>
                    <p class="east_ranking" v-show="item.category_id <= 15"> 东部第{{ item.east_ranking}}名</p>
                    <p class="east_ranking" v-show="item.category_id >= 16"> 西部第{{ item.east_ranking}}名</p>
                </div>
                <div class="right">
                    <p class="head_coach">主教练： {{ item.head_coach }} </p>
                    <p class="partition">分区： {{ item.partition }} </p>
                    <p class="gymnasium">球馆名称： {{ item.gymnasium }} </p>
                </div>
            </div>
        </div>
        <player v-show="optionId == 1"></player>
    </div>
</template>

<script>
import axios from 'axios'
import player from './player.vue';
export default {
  components: { player },
    name: 'team',
    data () {
        return {
            teamId:this.$store.state.teamId,
            typeId:undefined,
            team:[],
            optionId:this.$store.state.optionId
        }
    },
    methods: {
        getTeam(){
            if(this.typeId == 0){
                this.httpUrl = '/cbaTeamRouter/getCbaTeam';
            }else{
                this.httpUrl = '/nbaTeam/getTeam';
            }
            axios.post(`/api${this.httpUrl}`,{ team_id:this.teamId }).then(
                res =>{

                    this.team = res.data.data;
                    console.log(res.data.data,'team');
                }
            ).catch(console.log)
        },
    },
    created () {
        this.typeId = this.$route.query.type_id;
        this.getTeam();
    },
    watch: {
        "$store.state.teamId": function (n, o) {
            // console.log(n,o);
            this.teamId = n;
            this.getTeam()
        },
        deep:  true
    }
}
</script>

<style scoped>
.team{
    width: 100%;
}
.team .team-bar{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: white;

}
.team-bar .left{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.left .team-img{
    width: 150px;
    height: 150px;
}

.left .team-name{
    font-size: 20px;
    font-weight: 600;
    /* letter-spacing: 20px; */
    /* background-color: rgb(8, 8, 8); */
    /* border: 1px solid black; */
    text-align: center;
}
.team-bar .cba-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding-left: 50px;
    /* border: 1px solid black; */
}

.cba-right .name{
    flex: 1;
    padding: 6px;
    font-size: 18px;
    /* font-weight: 600; */
}
.name .text{
    font-size: 16px;
    /* font-weight: 600; */
    padding-left: 5px;
}

.nba-right{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nba-right .left{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* background-color: rgb(10, 9, 9); */
}

.nba-right .left .scor{
    padding-top: 10px;
}

.nba-right .left .east_ranking{
    padding-top: 10px;

}
.nba-right .right{
    flex: 1;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: rgb(99, 97, 97);
    text-align: left;
}
.nba-right .right .partition{
    padding-top: 10px;

}
.nba-right .right .gymnasium{
    padding-top: 10px;

}
</style>    
