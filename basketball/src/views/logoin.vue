<template>
    <div class="logoin">
        <div class="head">
            <img class="logo-img" src="../assets/imgs/index/logo.jpg" alt="">
            <p class="title">欢迎进入篮球世界</p>
        </div>
        <div class="logoinTab">
                <div class="type">
                    <transition>
                        <p class="logoin-btn"  :class="{active:logoinActive}" @click=" logoinActive=!logoinActive ">登录</p>
                    </transition>
                    <transition>
                        <p class="register-btn"  :class="{active:!logoinActive}"  @click=" logoinActive=!logoinActive ">注册</p>
                    </transition>
                </div>
                <div class="form">
                    <el-form :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="logoin-form" aria-placeholder="请输入用户名">
                        <el-form-item label="用户名" prop="userName" >
                            <el-input type="string" v-model.trim="user.userName" autocomplete="off" clearable autofocus=true></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="userPasw">
                            <el-input type="password" v-model.trim="user.userPasw" autocomplete="off"  show-password></el-input>
                        </el-form-item>
                        <el-form-item  label="确认密码" prop="checkPasw" autocomplete="off">
                            <el-input type="password" v-model.trim="user.checkPasw" autocomplete="off"  show-password></el-input>
                        </el-form-item>
                        <el-form-item class="btn">
                            <el-button  v-show="logoinActive" type="primary" @click="login('user')" >登录</el-button>
                            <el-button  v-show="!logoinActive" type="primary" @click="register('user')">注册</el-button>
                            <el-button  @click="resetForm('user')">重置</el-button>
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
        var validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
            if(value.length >10){
                return callback(new Error('用户名长度不能超过10位'))
            }
            callback()
        };
        var validatePass1 = (rule, value, callback) => {
            if (value == '') {
                return callback(new Error('请输入密码'));
            }
            else {
            if (this.user.checkPasw !== '') {
                var reg = /^[a-zA-Z0-9_]{6,10}$/g; 
                if(reg.test(value)){
                    this.$refs.user.validateField('checkPasw');
                }else{
                    return callback(new Error('用户名只能由字母数字下划线组成,长度大于7小于11'))
                }
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } 
            else if (value !== this.user.userPasw) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
      return {
            user:{
                userName:'',
                userPasw:'',
                checkPasw:'',
            },
            logoinActive:true,
            switch:false,
            rules: {
                userName: [
                    { validator: validateName, trigger: 'blur' }
                ],
                userPasw: [
                    { validator: validatePass1, trigger: 'blur' }
                ],
                checkPasw: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
      }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        login(formName) {
            this.$refs[formName].validate( valid => {
                if (valid) {
                    let params  ={
                        userName: this.user.userName,
                        userPassword: this.user.userPasw,
                    }
                    axios.post('/api/myUserRouter/checkUser',params).then(
                        res =>{
                            let length = res.data.data.length;   
                            if(length >=1){
                                this.$message({
                                    showClose: true,
                                    message: '欢迎进入篮球世界！',
                                    type: 'success'
                                });
                                sessionStorage.setItem('userName',params.userName)
                                this.goHome();
                            } else{
                                this.$message({
                                    showClose: true,
                                    message: '该用户不存在！',
                                    type: 'error'
                                });
                            }
                        }
                    ).catch(console.log)
                } 
                // else {
                //     this.$message({
                //         showClose: true,
                //         message: '用户名或密码输入不正确，请重新输入',
                //         type: 'warning'
                //     });
                //     return false;
                // }
            });
        },
      register(formName){
          this.$refs[formName].validate( valid => {
                if (valid) {
                    let params  ={
                        userName: this.user.userName,
                        userPassword: this.user.userPasw,
                    }
                    if(!this.switch){
                        this.switch = true
                        axios.post('/api/myUserRouter/checkUser',{userName:params.userName}).then(
                            res =>{
                                const length = res.data.data.length;
                                if(length >= 1){
                                    this.$message({
                                        showClose: true,
                                        message: '用户已经存在，请重新输入！',
                                        type: 'error'
                                    });
                                    this.switch =false;
                                }else{
                                    axios.post('/api/myUserRouter/insert',params).then(
                                        res =>{
                                            this.$message({
                                                showClose: true,
                                                message: '注册成功，请登录吧！',
                                                type: 'success'
                                            });
                                            this.switch =false;
                                            this.logoinActive = true
                                        }
                                    ).catch(console.log)
                                }
                            }
                        ).catch(console.log)
                    }else{
                        this.$message({
                            showClose: true,
                            message: '处理中，请不要频繁点击！',
                            type: 'warning'
                        });
                    }
                } else {
                    console.log('error register!!');
                    return false;
                }
            });
        },
        goHome(){
            const userName = JSON.stringify(this.user.userName);
            window.sessionStorage.setItem('userName', userName);
            this.$router.push({path: '/home', query: {userName: this.user.userName}});
        },
    },
    created () {

    }
}
</script>

<style scoped>
.active{
    /* background: #5d8fc0; */
    background: linear-gradient(90deg,#a1c4fd 10%,#c2e9fb);

}
.logoin{
    width: 100%;
    height: 937px;
    background: url('../assets/imgs/logoin/logoin.jpg')  no-repeat;
    background-size: cover  ;
    /* background-color: #2B2C31; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
}

.logoin .head{
    width: 100%;
    top: 80px;
    left: 0;
    position: absolute;
    /* background: white; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.head .logo-img{
    width: 60px;
    height: 60px;
    margin-left: 20px;
    border-radius: 20px;
}

.head .title{
    font-size: 60px;
    font-weight: 700;
    letter-spacing: 5px;
    color: transparent;
    background: linear-gradient(90deg,#30cfd0 10%,#330867);
    /* background: linear-gradient(90deg,#a1c4fd 10%#c2e9fb); */
    background-clip: text;
    padding-left: 20px;
}

.logoinTab{
    /* width: 500px; */
    width: 460px;
    height: 330px;
    background: white;
    margin:0 200px 0 0;
    border-radius: 5px;
    overflow: hidden;
} 

.logoinTab .type{
    font-size: 20px;
    letter-spacing: 2em;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid black;
    /* padding: 5px; */
    line-height: 2em;
}
.type .logoin-btn{
    flex: 1;
    cursor: pointer;
}

.type .register-btn{
    flex: 1;
    cursor: pointer;


}
.logoinTab .logoin-form{
    margin-top: 30px;
    margin-right: 30px;
}
.btn{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.btn el-button{
    flex: 1;
}





</style>