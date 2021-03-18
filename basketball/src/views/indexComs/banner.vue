<template>
    <div class="banner">
        <template>
            <el-carousel indicator-position="outside" height='900px'>
                <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
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
    width: 100%;
    height: 900px;
    /* margin-top: 80px; */
    /* border: 1px solid black; */
    background: white;
}
.el-carousel__item h3 {
    color: #475669;
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