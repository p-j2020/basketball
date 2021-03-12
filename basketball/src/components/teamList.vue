<template>
    <div class="team-list">
        <ul class="lsit">
            <li 
                class="team" 
                v-for="item in teamList"
                :key="item.category_id"
                :class="{active: activeTeam == item.category_id}"
                @click="teamIdchange(item.category_id)">
                    <img class="team-img" :src="api+item.img_url" alt="图标">
                    <span class="team-name"> {{ item.team_name }} </span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'teamList',
    data () {
        return {
            typeId:1,
            teamList:[],
            httpUrl:'/cbaTeamRouter/getCbaTeam',
            // activeTeam:1,
            activeTeam:this.$store.state.teamId,
        }
    },
    methods: {
        getTeamList(){
            if(this.typeId == 0){
                this.httpUrl = '/cbaTeamRouter/getCbaTeamList';
            }else{
                this.httpUrl = '/nbaTeam/getList';
            }
            axios.get(`/api${this.httpUrl}`).then(
                res =>{
                    this.teamList =res.data.data;
                    console.log(this.teamList);
                }
            ).catch(console.log)
        },
        teamIdchange(team_id){
            // this.activeTeam = team_id;
            // console.log(this.activeTeam,'123456');
            this.activeTeam = team_id;
            console.log(this.activeTeam,"activeTeam");
            this.$store.dispatch('teamId',team_id);
        }
    },
    created () {
        this.activeTeam = this.$store.state.teamId;
        console.log(this.activeTeam,"activeTeam");
        this.typeId = this.$route.query.type_id; 
        this.getTeamList();
    },
    watch: {
        "$store.state.teamId": function (n, o) {
            // console.log(n,o);
            this.teamId = n;
        },
        deep:  true
    }  
}
</script>

<style scoped>
.team-list{
    /* margin-top: 0px; */
    /* position: fixed; */
    width: 220px;
    /* border: 1px solid black; */
    /* height: 20px; */
} 
.team-list .lsit{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    /* border: 1px solid black; */
    background-color: rgb(189, 188, 192);

}
.lsit .team{
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.lsit .team:hover{
    cursor: pointer;
}
.team .team-img{
    width: 20px;
    height: 20px;
}
.team .team-name{
    padding-left: 30px;
    /* letter-spacing: 1em; */
}
.active{
    background-color: rgb(129, 128, 131);
    border-bottom: 2px solid rgb(101, 100, 102);
}
</style>