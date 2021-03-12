<template>
    <div class="schedule">
        <div class="Schedule-list">
            <img class="btn-img" src="../assets/imgs/schedule/back.svg" alt="back" @click="add">
            <div class="box" >
                <div class="team-schedule" 
                v-for="(item,index) in scheduleList"
                :key="item.category_id"
                :style="{transform: `translateX(${-260 * preActive}px)`}">
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
            <div class="team-schedule" v-for="item in teamScheduleList" :key="item.category_id">
                <div class="left">
                    <img class="team-logo" :src="api+firstTeamlogo" alt="球队logo图片">
                    <p class="team-name"> {{ item.first_team_name }} </p>
                </div>
                <div class="center">
                    <p class="is-start" v-show="item.is_start == 0 "> 未开始 </p>
                    <p class="is-start" v-show="item.is_start == 1 "> 已结束 </p>
                    <p  class="score"> {{ item.score }} </p>
                    <p class="time"> {{ item.start_time }}</p>
                </div>
                <div class="right">
                    <img class="team-logo" :src="api+secondTeamlogo" alt="球队logo图片">
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
            teamScheduleList:[],
            firstTeamlogo:undefined,
            secondTeamlogo:undefined,
            firstImgList:[],
            secondImgList:[],
            preActive:0,
            listlength:0,
        }
    },
    methods: {
        add(){
            if(this.preActive >= this.listlength-4){
                console.log(this.listlength);
                return
            }
            this.preActive += 4 ;
        },
        decrement(){
            if(this.preActive <= 0){
                alert("over")
                return
            }
            this.preActive -= 4;
        },
        getAll(){
            if(this.typeId == 0){
                axios.get('/api/scheduleRouter/getCbaSchedule').then(
                    res =>{
                        // console.log(res.data.data);
                        this.scheduleList = res.data.data;
                        let length = this.scheduleList.length;
                        this.listlength = this.scheduleList.length;
                        for(let i = 0 ; i < length; i++){
                            axios.post('/api/cbaTeamRouter/getCbaTeam',{team_id:this.scheduleList[i].first_team_id}).then(
                                    res =>{
                                        this.firstImgList.push(res.data.data[0].img_url)
                                    }
                                ).catch(console.log)
                            axios.post('/api/cbaTeamRouter/getCbaTeam',{team_id:this.scheduleList[i].second_team_id}).then(
                                    res =>{
                                        this.secondImgList.push(res.data.data[0].img_url)
                                    }
                                ).catch(console.log)
                            }
                            console.log(this.firstImgList);
                            console.log(this.secondImgList);
                        }
                    ).catch(console.log)
                axios.get('/api/cbaTeamRouter/getCbaTeamList').then(
                    res =>{
                        // console.log((res.data.data,'cba'));
                        this.teamList = res.data.data;
                    }
                ).catch(console.log)       
            }else{
                 axios.get('/api/scheduleRouter/getNbaSchedule').then(
                    res =>{
                        // console.log(res.data.data);
                        this.scheduleList = res.data.data;
                        const length = this.scheduleList.length;
                        this.listlength = this.scheduleList.length
                        for(let i = 0 ; i < length; i++){
                            axios.post('/api/nbaTeam/getTeam',{team_id:this.scheduleList[i].first_team_id}).then(
                                    res =>{
                                        this.firstImgList.push(res.data.data[0].img_url)
                                    }
                                ).catch(console.log)
                            axios.post('/api/nbaTeam/getTeam',{team_id:this.scheduleList[i].second_team_id}).then(
                                    res =>{
                                        this.secondImgList.push(res.data.data[0].img_url)
                                    }
                                ).catch(console.log)
                            }
                            console.log(this.firstImgList);
                            console.log(this.secondImgList);
                        }
                    ).catch(console.log)
                axios.get('/api/cbaTeamRouter/getCbaTeamList').then(
                    res =>{
                        // console.log((res.data.data,'cba'));
                        this.teamList = res.data.data;
                    }
                ).catch(console.log)      
            }
        },
        get(){
            if(this.typeId == 0){
                axios.post('/api/scheduleRouter/getCbaTeamSchedule',{team_id:this.teamId}).then(
                    res =>{
                        // console.log(res.data.data,'123');
                        this.teamScheduleList = res.data.data
                        axios.post('/api/cbaTeamRouter/getCbaTeam',{team_id:this.teamId}).then(
                            res =>{
                                this.firstTeamlogo = res.data.data[0].img_url
                                console.log(res.data.data[0].img_url,'img-url');
                            }
                        ).catch(console.log)
                        axios.post('/api/cbaTeamRouter/getCbaTeam',{team_id:this.teamScheduleList[0].second_team_id}).then(
                            res =>{
                                this.secondTeamlogo = res.data.data[0].img_url
                                console.log(res.data.data[0].img_url,'img-url');
                            }
                        ).catch(console.log)
                    }
                ).catch(console.log)
            }else{
                axios.post('/api/scheduleRouter/getNbaTeamSchedule',{team_id:this.teamId}).then(
                    res =>{
                        // console.log(res.data.data,'456s');
                        this.teamScheduleList = res.data.data
                         axios.post('/api/nbaTeam/getTeam',{team_id:this.teamId}).then(
                            res =>{
                                this.firstTeamlogo = res.data.data[0].img_url
                                console.log(res.data.data[0].img_url,'img-url');
                            }
                        ).catch(console.log)
                        axios.post('/api/nbaTeam/getTeam',{team_id:this.teamScheduleList[0].second_team_id}).then(
                            res =>{
                                this.secondTeamlogo = res.data.data[0].img_url
                                console.log(res.data.data[0].img_url,'img-url');
                            }
                        ).catch(console.log)
                    }
                ).catch(console.log)
            }
           
             
        }
    },
    created () {
        this.get()
        this.getAll()
    },
    watch:{
        '$store.state.typeId' :function(n,o){
            this.typeId = n;
        },
        '$store.state.teamId' :function(n,o){
            this.teamId =n;
            this.get()
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
    width: 90%;
    padding-top: 50px;
    /* border: 1px solid black; */
    margin:  0 auto;
    display: flex;
    justify-content: space-around;
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
    /* border: 1px solid black; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    font-size: 20px; 
    margin-left: 20px; 
}

.teamTabe .team-schedule{
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 5px;
    font-size: 20px;
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