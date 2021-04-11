<template>
    <div class="schedule">
        <div class="Schedule-list">
            <img class="btn-img" src="../assets/imgs/schedule/back.svg" alt="back" @click="add">
            <div class="box" >
                <div class="team-schedule" 
                v-for="(item,index) in scheduleBarList"
                :key="item.category_id"
                :style="{transform: `translateX(${-262 * preActive}px)`}">
                    <div class="left">
                        <img class="team-logo" :src="api+firstImgList[index]" alt="球队logo图片">
                        <p class="team-name"> {{ item.first_team_name }} </p>
                    </div>
                    <div class="center">
                        <p class="is-start" v-show="item.is_start == 0 "> 未开始 </p>
                        <p class="is-start" v-show="item.is_start == 1 "> 已结束 </p>
                        <p  class="score"> {{ item.score }} </p>
                        <p class="time"> {{ item.start_time }}</p>
                    </div>
                    <div class="right">
                        <img class="team-logo" :src="api+secondImgList[index]" alt="球队logo图片">
                        <p class="team-name"> {{ item.second_team_name}} </p>
                    </div>
                </div>  
            </div>
            <img class="btn-img" src="../assets/imgs/schedule/pre.svg" alt="pre" @click="decrement">
        </div>
        <team></team>
        <div class="teamTabe">
            <p v-show="teamScheduleList.length == 0" class="war-text">暂无数据</p>
            <div class="team-schedule" v-for="(item,index) in teamScheduleList" :key="item.category_id">
                <div class="left" >
                    <img class="team-logo" :src="api+firstTeamImgList[index]" alt="球队logo图片">
                    <p class="team-name"> {{ item.first_team_name }} </p>
                </div>
                <div class="center" >
                    <p class="is-start" v-show="item.is_start == 0 "> 未开始 </p>
                    <p class="is-start" v-show="item.is_start == 1 "> 已结束 </p>
                    <p  class="score"> {{ item.score }} </p>
                    <p class="time"> {{ item.start_time }}</p>
                </div>
                <div class="right" >
                    <img class="team-logo" :src="api+secondTeamImgList[index]" alt="球队logo图片">
                    <p class="team-name"> {{ item.second_team_name}} </p>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import team from './team.vue'
export default 
  {
    name: 'schedule',
    components: { team },
    data () {
        return {
            teamId:this.$store.state.teamId,
            typeId:this.$store.state.typeId,
            scheduleList:[],
            scheduleBarList:[],
            teamScheduleList:[],
            firstImgList:[],
            secondImgList:[],
            firstTeamImgList:[],
            secondTeamImgList:[],
            preActive:0,
            listlength:0,
            teamList:[],
        }
    },
    methods: {
        //按钮点击事件
        add(){
             if(this.preActive <= 0){
                return
            }
            this.preActive -= 1;
        },
        decrement(){
            if(this.preActive >= this.listlength-4){
                return
            }
            this.preActive += 1 ;
        },
        getAll(){
            if(this.typeId == 0){
                axios.get('/api/scheduleRouter/getCbaSchedule').then(
                    res =>{
                        this.scheduleList = res.data.data;
                        // console.log(this.scheduleList)
                        this.scheduleBarList = res.data.data.filter(val =>{
                            return val.is_start == 1;
                        })
                        this.teamScheduleList = this.scheduleList.filter(val =>{
                            return val.first_team_id == this.teamId;    
                        });
                        this.listlength = this.scheduleBarList.length;
                        axios.get('/api//cbaTeamRouter/getCbaTeamList').then(res =>{
                                this.teamList = res.data.data;
                                for(let i = 0; i<this.listlength;i++ ){
                                    for(let j = 0,length = this.teamList.length; j < length; j++){
                                        if(this.scheduleBarList[i].first_team_id == this.teamList[j].category_id){
                                            this.firstImgList.push(this.teamList[j].img_url)
                                        }
                                        if(this.scheduleBarList[i].second_team_id == this.teamList[j].category_id){
                                            this.secondImgList.push(this.teamList[j].img_url)
                                        }
                                    }
                                }
                                for(let i = 0; i<this.teamScheduleList.length;i++ ){
                                    for(let j = 0,length = this.teamList.length; j < length; j++){
                                        if(this.teamScheduleList[i].first_team_id == this.teamList[j].category_id){
                                            this.firstTeamImgList.push(this.teamList[j].img_url)
                                        }
                                        if(this.teamScheduleList[i].second_team_id == this.teamList[j].category_id){
                                            this.secondTeamImgList.push(this.teamList[j].img_url)
                                        }
                                    }
                                }
                        }).catch(console.log) 
                    }
                    ).catch(console.log)
            }else{
                axios.get('/api/scheduleRouter/getNbaSchedule').then(
                    res =>{
                        this.scheduleList = res.data.data;
                        // console.log(this.scheduleList)
                        this.scheduleBarList = res.data.data.filter(val =>{
                            return val.is_start == 1;
                        })
                        this.teamScheduleList = this.scheduleList.filter(val =>{
                            return val.first_team_id == this.teamId;    
                        });
                        this.listlength = this.scheduleBarList.length;
                        axios.get('/api/nbaTeam/getList').then(res =>{
                                this.teamList = res.data.data;
                                for(let i = 0; i<this.listlength;i++ ){
                                    for(let j = 0,length = this.teamList.length; j < length; j++){
                                        if(this.scheduleBarList[i].first_team_id == this.teamList[j].category_id){
                                            this.firstImgList.push(this.teamList[j].img_url)
                                        }
                                        if(this.scheduleBarList[i].second_team_id == this.teamList[j].category_id){
                                            this.secondImgList.push(this.teamList[j].img_url)
                                        }
                                    }
                                }
                                for(let i = 0; i<this.teamScheduleList.length;i++ ){
                                    for(let j = 0,length = this.teamList.length; j < length; j++){
                                        if(this.teamScheduleList[i].first_team_id == this.teamList[j].category_id){
                                            this.firstTeamImgList.push(this.teamList[j].img_url)
                                        }
                                        if(this.teamScheduleList[i].second_team_id == this.teamList[j].category_id){
                                            this.secondTeamImgList.push(this.teamList[j].img_url)
                                        }
                                    }
                                }
                        }).catch(console.log) 
                    }
                    ).catch(console.log)
            }
        },
    },
    created () {
        this.getAll()
    },
    watch:{
        '$store.state.typeId' :function(n,o){
            this.typeId = n;
            this.getAll()
        },
        '$store.state.teamId' :function(n,o){
            this.teamId =n;
            this.getAll()
        }
    }
}
</script>

<style scoped>
.schedule{
    background-color: rgb(138, 134, 134);
    width: 78%;
    text-align: center;
    /* border: black 1px solid; */
}

.schedule .teamTabe{
    width: 850px;
    /* padding-top: 50px; */
    /* border: 1px solid black; */
    margin:  0 auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;
}

.teamTabe .war-text{
    width: 100%;
    font-size: 20px;
    margin-top: 20px;
}

.schedule .Schedule-list{
    width: 100%;
    padding-top: 50px;
    margin:  0 auto;
    display: flex;
    /* justify-content: flex-start; */
    /* overflow: hidden; */
    padding: 20px;
    box-sizing: border-box;
}
.Schedule-list .btn-img{
    width: 50px;
}
.Schedule-list .box{
    display: flex;
    /* border: black 1px solid; */
    overflow: hidden;
    background-color: rgb(187, 185, 185);
}
.Schedule-list .team-schedule{
    background-color: white;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    font-size: 16px; 
    margin: 10px; 
}

.teamTabe .team-schedule{
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 5px;
    font-size: 16px;
    margin: 20px;
}
.team-schedule .left{
    padding: 10px;
}
.team-schedule .center{
    padding: 20px;
    width: 80px;
}
.team-schedule.right{
    padding: 10px;
}
.team-schedule .team-logo{
    width: 50px;
    height: 50px;
}
</style>