<template>
    <div class="nba-bar">
        <div class="logo">
            <img src="../../../assets/imgs/index/nba/logo.jpg" alt="logo">
        </div>
        <div class="title">
            <p class="title-name">NBA2020-2021赛季</p>
            <p class="title-text">This is why we play！</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'nbaBar',
    data () {
        return {

        }
    },
    methods: {

    },
    created () {

    }
}
</script>

<style scoped>
 .nba-bar{
    margin-top: 80px;
    background-color: rgba(203, 206, 207, 0.938);
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 50px;
    /* border-bottom: 3px solid rgb(151, 148, 148); */
    opacity: 0.9;

}
.nba-bar .logo{

}

.nba-bar .logo img{
    width: 55px;
    height: 80px;
    padding: 5px 10px;
    border-radius: 20px;
}
.nba-bar .title{
    text-align: center;
    /* padding-left: 40px; */
    flex: 1;
}
.title .title-name{
    font-size: 25px;
    font-weight: 800;
}

.title .title-text{
    font-size: 18px;
    font-weight: 400;
    padding-top: 20px;
}
</style>