<template>
    <div class="cba">
        <my-head></my-head> 
         <cba-bar></cba-bar>
        <div class="container">
           <team-list></team-list>
           <component class="active" :is="list[optionId]"></component>
        </div>
       <!-- <player></player> -->
        <!--  <team></team>
        <new></new>
        <schedule></schedule>-->
        <my-foot></my-foot> 
    </div>
</template>

<script>
import cbaBar from './indexComs/cbaBar/cbaBar.vue'
import Player from '../components/player'
import Team from '../components/team.vue'
import New from '../components/new.vue'
import Schedule from '../components/schedule.vue'
export default {
  components: { cbaBar, Team, Schedule, Player,New },
    Newme: 'cba',
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
        this.$store.dispatch("optionId",this.$route.query.category_id)
        this.$store.dispatch("typeId",this.$route.query.type_id)
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
.cba{
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
    margin: 0px 100px 100px 100px;
    /* background-color: #5789BD; */
}

</style>