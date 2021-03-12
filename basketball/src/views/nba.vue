<template>
    <div class="nba">
        <my-head></my-head> 
        <nba-bar></nba-bar>
        <div class="container">
            <team-list></team-list>
            <component class="active" :is="list[optionId]"></component>
        </div>
        <my-foot></my-foot>
    </div>
</template>

<script>
import New from '../components/new.vue'
import Schedule from '../components/schedule.vue'
import Team from '../components/team.vue'
import TeamList from '../components/teamList.vue'
import nbaBar from './indexComs/nbaBar/nbaBar.vue'
import Player from '../components/player'

export default {
  components: { nbaBar, TeamList, Player, Team, Schedule, New },
    name: 'nba',
    data () {
        return {
            optionId:this.$store.state.optionId,
            typeId:this.$store.state.typeId,
            list:['Player','Team','Schedule','New']
        }
    },
    methods: {

    },
    created () {
        this.$store.dispatch("optionId",this.$route.query.category_id)
        this.$store.dispatch("typeId",this.$route.query.type_id)
        console.log(this.$route.query.type_id,'type_id');
        console.log(this.typeId,'typeid');
    },
    watch: {
        "$store.state.optionId": function (n, o) {
            console.log(n,o);
            this.optionId = n;
        },
        "$store.state.typeId": function (n, o) {
            console.log(n,o);
            this.teamId = n;
        },
        deep:  true
    }   
}
</script>

<style scoped>
.nba{
    background-image: url('../assets/imgs/index/background_img.jpg');
}
.container{
    position: relative;
    width: 80%;
    margin: 80px  auto;
    /* background-color: #8da4bd; */
    display: flex;
    justify-content: flex-start;
}
.container .active{
    margin: 0 100px 100px 100px;
    /* height: 100px; */
    /* background-color: white; */
}
</style>