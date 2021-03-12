// 显示球员组件
<template>
    <div class="player">
        <div class="item-bar">
            <p class="name"> 球衣号码</p>
            <p class="name" >姓名</p>
            <p class="name" v-show=" typeId == 1">英文姓名</p>
            <p class="name">位置</p>
            <p class="name">身高</p>
            <p class="name">体重</p>
            <p class="name" v-show=" typeId == 1">经验</p>
            <p class="name">生日</p>
            <p class="name">球队</p>
             <p class="name" v-show="typeId == 1">国籍</p>
        </div>
        <div class="item" v-for="item in players" :key="item.category_id">
            <p class="number"> {{ item.number }}</p>
            <p class="name" v-show="typeId == 0"> {{ item.name }} </p>
            <p class="name" v-show="typeId == 1"> {{ item.chinese_name }} </p>
            <p class="english_name" v-show="typeId == 1"> {{ item.english_name }} </p>
            <p class="play_sition"> {{ item.play_sition }} </p>
            <p class="height"> {{ item.height }} </p>
            <p class="weight"> {{ item.weight }} </p>
            <p class="experience" v-show="typeId == 1"> {{ item.experience }} </p>
            <p class="birthday"> {{ item.birthday.substring(0,10) }} </p>
            <p class="team_name"> {{ item.team_name }} </p>
            <p class="nationality" v-show="typeId == 1"> {{ item.nationality }} </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'player',
    data () {
        return {
            team_id:this.$store.state.teamId,
            players:[],
            typeId:this.$store.state.typeId,
        }
    },
    methods: {
        getplayer(){
            console.log(this.team_id)
            console.log(this.typeId)
            if(this.typeId == 0){
                axios.post('/api/cbaPlayerRouter/getCbaplayers',{team_id:this.team_id}).then(
                    res  =>{
                        this.players = res.data.data;
                    }
                ).catch(console.log)    
            }else{
                axios.post('/api/nbaPlayerRouter/getNbaplayers',{team_id:this.team_id}).then(
                    res  =>{
                        this.players = res.data.data;
                    }
                ).catch(console.log)
            }
        },
    },
    created () {
        this.getplayer();
    },
    watch: {
        "$store.state.teamId": function (n, o) {
            // console.log(n,o);
            this.team_id = n;
            this.getplayer();
        },
        "$store.state.typeId": function (n, o) {
            // console.log(n,o);
            this.typeId = n;
            this.getplayer();

        },
        // "$store.state.typeId": function (n, o) {
        //     console.log(n,o);
        //     this.teamId = n;
        // },
        deep:  true
    }   
}
</script>

<style scoped>
.player{
    width: 100%;
    background-color: rgb(189, 188, 192);   
}
.player .item{
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top:20px;
    padding-bottom:20px;
    /* box-shadow: white 0 0 0 0.5px; */
    margin: 0.5px;
}
.player .item-bar{
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:15px;
    /* box-shadow: white 0 0 0 0.5px; */
    margin: 0.5px;
    background-color: rgb(119, 118, 122);
}

.item-bar .name{
    flex: 1;
    font-size: 18px;
    font-weight: 500;
}
.player .item:hover{
    box-shadow: 0px 0px 40px rgb(0 0 0 / 10%);
    cursor: pointer;
}
.item .number{
    flex: 1;
}
.item .name{
    flex: 1;

}
.item .play_sition{
    flex: 1;

}
.item .height{
    flex: 1;

}
.item .weight{
    flex: 1;
}   
.item .experience{
    flex: 1;
}
.item .birthday{
    flex: 1;

}
.item .team_name{
    flex: 1;

}
.item .english_name{
    flex: 1;
    /* background-color: white; */
}
.item .nationality{
    flex: 1;
}
</style>




