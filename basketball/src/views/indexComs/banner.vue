<template>
    <div class="banner">
        <template>
            <el-carousel indicator-position="always" height='850px'>
                <el-carousel-item v-for="item in imgs" :key="item.id">
                <img class="banner-img" :src="item.img_url" alt="轮播图片">
                </el-carousel-item>
            </el-carousel>
        </template>
    </div>
</template>

<script>
export default {
    name: 'banner',
    data () {
        return {
            imgs:[
                {id:2,img_url:require('../../assets/imgs/index/banner/img2.jpg')},
                {id:1,img_url:require('../../assets/imgs/index/banner/img1.jpg')},
                {id:3,img_url:require('../../assets/imgs/index/banner/img3.png')},
                {id:4,img_url:require('../../assets/imgs/index/banner/img5.png')},
                {id:4,img_url:require('../../assets/imgs/index/banner/img4.png')},
            ]
        }
    },
    methods: {

    },
    created () {

    }
}
</script>

<style scoped>
.banner{
    margin-top: 80px;
    width: 100%;
    /* min-height: 600px; */
    /* border: 1px solid black; */
    /* background: white; */
    /* box-sizing: border-box; */
    /* border: red 1px solid; */
}
.banner .banner-img{
    /* width: 100%;
    height: 100%; */
    /* min-height: 600px; */
    width: 100%;
    /* height: 100%; */
    /* max-width: 100%; */
    /* max-height: 100%;    */

}
.el-carousel__item h3 {
    color: #0e0f0f;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>