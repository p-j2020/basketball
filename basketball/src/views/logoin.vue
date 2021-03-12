<template>
    <div class="logoin">
        <div class="logoinTab">
                <h2 class="title">登录</h2>
            <div class="inputList">
                <div class="user">
                    <img class="user-img" src="../assets/imgs/logoin/user.png" alt="">
                    <input v-model="userName" class="input user-name" type="text" placeholder="用户名">
                </div>
                <div class="password">
                    <img class="password-img" src="../assets/imgs/logoin/password.png" alt="" >
                    <input v-model="userPassword" class="input user-password" type="password" placeholder="密码">
                </div>
            </div>
            <div class="btn">
                <div class="submitBtn" @click="logoin">登录</div>
                <div class="registerBtn" @click="register">注册</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'logoin',
    data () {
        return {
            userName:'',
            userPassword:'',
            switch:false,
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
    margin:0px 250px 0 0 ;
    width: 460px;
    min-height: 300px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around; 
    border-radius: 5px;
} 
.logoinTab .title{
    font-size: 20px;
    letter-spacing: 10px;
    text-align: center;
    border-bottom: 1px solid #DCDEE2;
    padding: 3px;
}

.logoinTab .inputList{
    /* border-bottom: 1px solid #DCDEE2; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /* border:  1px solid red; */
    border-bottom: 1px solid #DCDEE2;

}

.inputList .user{
   display: flex;
   padding-bottom: 30px;
}

.user .user-img{
    width: 30px;
    height: 32px;
    margin-right: -1px;
    border-left: 1px solid #DCDEE2;
    border-top: 1px solid #DCDEE2;
    border-bottom: 1px solid #DCDEE2;
    border-radius: 5px 0 0 5px;
}

.inputList .password{
    display: flex;
    padding-bottom: 30px;

}

.password .password-img{
    width: 30px;
    height: 32px;
    margin-right: -1px;
    border-left: 1px solid #DCDEE2;
    border-top: 1px solid #DCDEE2;
    border-bottom: 1px solid #DCDEE2;
    border-radius: 5px 0 0 5px;


}
.input{
    width: 300px;
    height: 30px;
    outline: none;
    border: 1px solid #DCDEE2;
    /* text-align: center; */
}
.logoinTab .btn{
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* background-color: red; */
    /* border-bottom: 1px solid #DCDEE2; */
    margin: 0 auto;
}
.btn .submitBtn{
    border: 1px solid #DCDEE2;
    padding: 5px 10px;
    border-radius: 5px;
    letter-spacing: 5px;
    cursor: pointer;
    background-color: rgb(133, 169, 236);
}

.btn .registerBtn{
    border: 1px solid #DCDEE2;
    padding: 5px 10px;
    letter-spacing: 5px;
    border-radius: 5px;
    cursor: pointer;
    background-color: rgb(133, 169, 236);


}
</style>