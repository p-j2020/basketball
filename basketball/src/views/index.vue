<template>
    <div class="index">
      <my-head></my-head>
      <banner class="banner"></banner>
      <div class="container">
        <cba class="cba"></cba>
        <nba class="nba"></nba>
      </div>
      <my-foot></my-foot>
    </div>
</template>

<script>
import Banner from './indexComs/banner.vue'
import Cba from './indexComs/cba.vue'
import Nba from './indexComs/nba.vue'
import axios from 'axios'

export default {
    name: 'index',
    components:{Banner, Cba, Nba},
    data () {
        return {
          tabList :[],
        }
    },
    methods: {
      getPlayers(){
        axios.post('/api/cbaPlayerRouter/getCbaplayers',{
          team_id:2
        }).then( res =>{
          console.log(res)
          // this.tabList =res.data.data
        }).catch(console.log)
      }
    },
    created () {
      // this.getPlayers()
      // this.getNbaTeamList()
    }
}
</script>

<style scoped>
.index{
  width: 100%;
  background-image: url('../assets/imgs/index/background_img.jpg');

}
 .container{
  width: 1200px;
  min-height: 1000px;
  margin: 80px auto;
  /* background-color: silver; */
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
 }
 .container .banner{
   /* border: 1px solid red; */
   margin-bottom: 50px;
 }
  .container .cba{
   /* border: 1px solid red; */
   margin-bottom: 50px;
 }
  .container .nba{
   /* border: 1px solid red; */
   margin-bottom: 50px;
 }
</style>
