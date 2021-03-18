<template>
    <div class="logoin">
        <div class="logoinTab">
                <div class="btn">
                    <p class="logoin-btn">登录</p>
                    <p class="register-btn">注册</p>
                </div>
                <div class="form">
                <el-form class="user-form" ref="user" label-width="120px">
                    <el-form-item label="用户名" prop="userName">
                        <el-input type='string' v-model="user.userName" autocomplete='on'></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPassword">
                        <el-input type="password" v-model="user.userPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'logoin',
    data() {
      return {
            user:{
                userName:undefined,
                userPassword:undefined,
                checkPass:undefined
            }
      } 
    },
    methods: {
        //登录检查用户名和密码是否存在
        logoin(){
            let params  ={
                userName: this.userName,
                userPassword: this.userPassword,
            }
            axios.post('/api/myUserRouter/checkUser',params).then(
                res =>{
                    let length = res.data.data.length;   
                    if(length >=1){
                        alert(`${this.userName}欢迎进入篮球世界`);
                        this.goHome();
                    } else{
                        alert('用户名或密码输入错误，请重新输入');
                    }
                }
            ).catch(console.log)  
        },
        goHome(){
            this.$router.push({path: '/home', query: {userName: this.userName}});
        },
        // 注册
        register(){
            let params  ={
                userName: this.userName,
                userPassword: this.userPassword,
            }
            if(!this.switch){
                this.switch = true
                axios.post('/api/myUserRouter/checkUser',params).then(
                    res =>{
                        const length = res.data.data.length;
                        if(length >= 1){
                            alert('用户已存在！请重新输入。');
                            this.switch =false;
                        }else{
                            axios.post('/api/myUserRouter/insert',params).then(
                                res =>{
                                    alert('注册成功，请登录！')
                                    this.switch =false;
                                }
                            ).catch(console.log)
                        }
                    }
                ).catch(console.log)
            }else{
                alert('请勿频繁点击！');
            }
        },
    },
    created () {

    }
}
</script>

<style scoped>

.logoin{
    width: 100%;
    height: 937px;
    background: url('../assets/imgs/logoin/logoin.jpg')  no-repeat;
    background-size: cover  ;
    /* background-color: #2B2C31; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.logoinTab{
    margin:0px 280px 0 0 ;
    width: 460px;
    height: 300px;
    background-color: white; 
    border-radius: 5px;
    /* display: flex; */
    /* align-items: center; */
} 

.logoinTab .form{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    /* border: 1px solid black;  */
}





</style>