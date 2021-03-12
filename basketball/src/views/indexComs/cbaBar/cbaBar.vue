<template>
    <div class="cba-bar">
        <div class="left">
            <img class="logo-img" src="../../../assets/imgs/index/cba/logo.png" alt="">
        </div>
        <div class="right">
            <div class="title">
                <p class="title-name">CBA2020-201赛季</p>
                <p class="title-text">敢梦，梦想中国篮球的美好未来，让每一位中国篮球人骄傲自豪；敢当，脱胎换骨，锐意革新，为中国篮球的复兴，为中国球迷的快乐而担当。</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cbaBar',
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
 .cba-bar{
    width: 100%;
    margin-top: 80px;
    display: flex;
    justify-content: flex-start;
    /* border-bottom: 3px solid rgb(151, 148, 148); */
    margin-bottom: 50px;
    background-color: rgba(203, 206, 207, 0.938);
    padding: 15px 0;
    opacity: 0.9;

}
.left .logo-img{
    width: 60px;
    height: 60px;
    padding: 5px 10px;
    /* background-color: white; */
}

.cba-bar .right{
    flex: 1;
    padding: 5px;
}

.right .title{
    width: 100%;
    min-height: 60px;
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.title .title-name{
    font-size: 25px;
    font-weight: 800;
}

.title .title-text{
    font-size: 18px;
    font-weight: 400;
    padding-top: 20px;
    text-align: center;
    /* color: rgb(158, 151, 151); */
}

</style>