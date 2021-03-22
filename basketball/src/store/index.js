import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    teamId:1,
    typeId:0,
    optionId:undefined,
  },
  mutations: {
    //head 点击的是NBA还是CBA 1 || 0
    typeIdChange(state,pylod){
      state.typeId = pylod;
      // console.log(state.typeId,"typeid")
    },
    //NBA下选项的id 0-4
    optionIdChange(state,pylod){
      state.optionId = pylod;
      // console.log(state.optionId,"opid");
    },
    //球队id
   teamIdChange(state,pylod){
      state.teamId = pylod;
      console.log(state.teamId,"teamId");
    },
  },
  actions: {
    typeId(context,tean_id){
      context.commit('typeIdChange',tean_id);
    },
    optionId(context,option_id){
      context.commit('optionIdChange',option_id);
    },
    teamId(context,team_id){
      context.commit('teamIdChange',team_id);
    },
  },
  modules: {
  }
})

export default store;
