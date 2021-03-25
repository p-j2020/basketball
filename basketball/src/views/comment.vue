<template>
    <div class="comment">
        <my-head></my-head> 
        <div class="container">
            <div class="user">
                <div class="user-box">
                    <div class="user-name">
                        {{ userName }}
                    </div>
                    <div class="user-comment"  @click=" drawerTableVisible = true">
                        <span >我的帖子</span>
                        <span class="comment-num"> {{ myComment.length }} </span>
                    </div>
                    <div class="add" @click="dialogFormVisible = true">+</div>
                </div>
            </div>
            <div class="comment-list">
                <div class="comment-list" v-show="commentList == null">
                    <p>暂无数据</p>
                </div>
                <div class="comment-item" v-for="item in commentList" :key="item.category_id">
                    <p class="comment-title" @click="showCommentText(item.category_id)"> {{ item.comment_title }} </p>
                    <div class="comment-box" v-show="showText && comment_id == item.category_id">
                        <p class="comment-time"> {{item.time }} </p>
                        <p class="comment-text"> {{ item.comment_text }} </p>
                        <p class="head" :class="{ active:showList}"
                        @click="showCommentList(item.category_id)">评论</p>
                        <div class="allComment" >
                            <div class="allcomment-list" v-show="showList && comment_id == item.category_id">
                                <div v-show="pushedCommentList.length == 0">
                                    <p>暂无数据</p>
                                </div>
                                <div 
                                    class="comment-item" 
                                    v-for="(item,index) in pushedCommentList" 
                                    :key="item.category_id" 
                                    v-show="index >= (currentPage-1)*10 &&index <= currentPage*10">
                                    <p class="comment-item-name"> {{ item.user_name }}  <span> {{ item.date_time }} </span> </p>
                                    <p class="comment-item-text"> {{ item.comment_text }} </p>
                                </div>
                                <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    hide-on-single-page
                                    :total="pushedCommentList.length"
                                    @current-change = "current_change">
                                </el-pagination>
                                <div class="publish-comment">
                                    <el-form label-width="100px" left>
                                        <el-form-item label="发表评论">
                                            <el-input 
                                            type="textarea" 
                                            :autosize="{ minRows: 2, maxRows: 4}"
                                            v-model="textarea"
                                            maxlength="200"
                                            show-word-limit></el-input>
                                            <el-button type="primary" @click="sub_comment(item.category_id)">提交</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-drawer
            title="所有帖子"
            :visible.sync="drawerTableVisible"
            direction="rtl" 
            size="1500px">
            <el-table :data="myComment">
                <el-table-column align='center' prop="comment_title" label="标题" width="300px">
                    <!-- <template slot-scope="scope">
                        {{ scope.row.comment_title }}
                    </template> -->
                </el-table-column>
                <el-table-column  prop="comment_text" label="内容" width="600px"></el-table-column>
                <el-table-column align='center' prop="time" label="时间" width="350px"></el-table-column>
                <el-table-column align='center' label="操作" width="250px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle @click="modify(scope.$index)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="dele(scope.$index)"></el-button>
                     </template>
                </el-table-column>
            </el-table>
        </el-drawer>

        <el-dialog title="发帖" :visible.sync="dialogFormVisible" left >
            <el-form :model="form" ref="form">
                <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                    <el-input 
                        v-model="form.title" 
                        autocomplete="off" 
                        maxlength="30"
                        show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth" prop="text">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        maxlength="500"
                        show-word-limit
                        v-model="form.text">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('form')">重置</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="addComment">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改帖子" :visible.sync="dialogFormChange" left >
            <el-form :model="changeForm" >
                <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                    <el-input
                        v-model="changeForm.title"
                        autocomplete="off"
                        maxlength="30"
                        show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth" prop="text">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        maxlength="500"
                        show-word-limit
                        v-model="changeForm.text">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormChange = false">取 消</el-button>
                <el-button type="primary"  @click="changeComment">确 定</el-button>
            </div>
        </el-dialog>
        <el-backtop></el-backtop>  
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'comment',
    data () {
        return {
            textarea:'',
            dialogFormChange:false,
            showList:false,
            showText:false,
            comment_id:-1,
            drawerTableVisible: false,
            dialogFormVisible: false,
            form: {
                title: '',
                text:'',
            },
            changeForm:{
                title: '',
                text:'',
                comment_id:-1,
            },
            formLabelWidth: '120px',
            userName:'',
            commentList:[],
            myComment:[],
            userId:0,
            pushedCommentList:[],
            currentPage:1
        }
    },
    methods: {
        current_change(currentPage) {
            this.currentPage = currentPage;
        },
        sub_comment(id){
            if(this.textarea == ''){
                this.$message({
                    showClose: true,
                    message: '不能发表空评论',
                    type: 'warning'
                });
                return
            }else{
                // console.log(this.userId);
                // const table_name = 'comment_' + id
                // console.log(typeof id);
                axios.post('/api/postCommentRouter/checkTable',{ comment_id: id }).then(
                    res => {
                        // console.log(res.data.data,'comment')
                        if(res.data.data.length == 1){
                            // console.log('可以添加')
                            const dateTime = this.getTime();
                            axios.post('/api/postCommentRouter/insertComment',
                                {
                                    table_name:id,
                                    user_name:this.userName,
                                    comment_id:id,
                                    comment_text:this.textarea,
                                    date_time:dateTime
                                }).then(
                                    res => {
                                    // console.log(res.data.data,'insertComment');
                                        this.textarea= '';
                                        this.$message({
                                            showClose: true,
                                            message: '发表成功！',
                                            type: 'success'
                                        });
                                        this.getPushComent(id);
                                    }
                                ).catch(console.log)
                        }else{
                            axios.post('/api/postCommentRouter/insertTableName',{comment_id:id,table_name:`comment_${id}`}).then(
                                res => {
                                    console.log(res,'insertTableName');
                                }
                            ).catch(console.log)
                            axios.post('/api/postCommentRouter/createTable',{table_name:id}).then(
                                res => {
                                    // console.log(res,'createTable');
                                    axios.post('/api/postCommentRouter/insertComment',{
                                            table_name:id,
                                            user_name:this.userName,
                                            comment_id:id,
                                            comment_text:this.textarea
                                        }).then(
                                        res => {
                                            // console.log(res.data.data,'insertComment');
                                            this.getPushComent(id);
                                        }
                                    ).catch(console.log)
                                }
                            ).catch(console.log)
                        }
                    }
                ).catch(console.log)
                console.log(this.textarea);
            }   
        },
        getPushComent(id){
            axios.post('/api/postCommentRouter/seleTableName',{db_name:'basketball',table_name:`comment_${id}`}).then(
                    res =>{
                        console.log(res.data.data[0]['count(*)'],'seleTable');
                        if(res.data.data[0]['count(*)'] == 0){
                            this.pushedCommentList = []
                            return
                        }else{
                            axios.post('/api/postCommentRouter/seleComment',{ table_name:id}).then(
                                res =>{
                                    // console.log(res.data.data,'commen');
                                    this.pushedCommentList = res.data.data.reverse()
                                    this.pushedCommentList.forEach( item =>{
                                        // console.log(item.time);
                                        item.date_time = this.formateDate(item.date_time)
                                        // console.log(item.time);
                                    })
                                }
                            ).catch(console.log)
                        }
                    }
                ).catch(console.log)
            
        },
        changeComment(){
            let params = {
                comment_title:this.changeForm.title,
                comment_text:this.changeForm.text,
                comment_id:this.changeForm.comment_id
            }
            axios.post('/api/commentRouter/changeComment',params).then(
                res =>{
                    console.log(res);
                    if(res.data.data.changedRows == 1){
                        this.$message({
                            showClose: true,
                            message: '修改成功！',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: '未修改！',
                            type: 'error'
                        });
                    }
                }
            ).catch(console.log)
            // alert('修改成功')
            this.getMyComment()
            this.getComment()
            this.dialogFormChange = false

        },
        modify(id){
            this.dialogFormChange = true
            this.changeForm.comment_id = this.myComment[id].category_id
            this.changeForm.title = this.myComment[id].comment_title
            this.changeForm.text = this.myComment[id].comment_text
            // console.log(this.myComment[id]);
        },
        dele(id){
            // console.log(id);
            this.changeForm.comment_id = this.myComment[id].category_id
            this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(this.changeForm.comment_id);
                axios.post('/api/commentRouter/deleComment',{comment_id:this.changeForm.comment_id}).then(
                    res =>{
                        console.log(res);  
                        this.getMyComment();
                        this.getComment() 
                    }
                ).catch(console.log)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                axios.post('/api/postCommentRouter/seleTableName',{db_name:'basketball',table_name:`comment_${this.changeForm.comment_id}`}).then(
                    res =>{
                        // console.log(res.data.data[0]['count(*)'],'seleTable');
                        if(res.data.data[0]['count(*)'] == 1){
                            axios.post('/api/postCommentRouter/deleInsertComment',{comment_id:this.changeForm.comment_id}).then(
                                res => {
                                    console.log(res,'deleInsertComment');
                                }
                            ).catch(console.log)
                            axios.post('/api/postCommentRouter/deleTable',{table_name:this.changeForm.comment_id}).then(
                                res => {
                                    console.log(res,'deleTable');
                                }
                            ).catch(console.log)
                        }
                }).catch(console.log)
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        formateDate(date) {
            const arr = date.split('T');
            const d = arr[0];
            const darr = d.split('-');
            const t = arr[1];
            const tarr = t.split('.000');
            const marr = tarr[0].split(':');
            const dd =
            parseInt(darr[0]) +
            '-' +
            parseInt(darr[1]) +
            '-' +
            parseInt(darr[2]) +
            ' ' +
            parseInt(marr[0]) +
            ':' +
            parseInt(marr[1]) +
            ':' +
            parseInt(marr[2]);
            // console.log(dd);
            return dd;
        },
        getMyComment(){
                axios.post('/api/myUserRouter/getUserId',{userName:this.userName}).then(
                    res =>{
                        this.userId = res.data.data[0].user_id;
                        axios.post('/api/commentRouter/getUserComment',{user_id:this.userId}).then(
                            res =>{
                                // console.log(this.userId,'myComment');
                                this.myComment = res.data.data;
                                this.myComment.forEach( item =>{
                                    // console.log(item.time);
                                    item.time = this.formateDate(item.time)
                                })
                                // console.log(res.data.data);
                                // console.log(this.myComment,'myComment');
                            }
                        ).catch(console.log)
                    }
                ).catch(console.log)
        },
        addComment(){
            const dateTime = this.getTime();
            axios.post('/api/myUserRouter/getUserId',{userName:this.userName}).then(
                res =>{
                    this.userId = res.data.data[0].user_id;
                        axios.post('/api/commentRouter/addComment',{user_id:this.userId,comment_title:this.form.title,comment_text:this.form.text,time:dateTime}).then(
                        res =>{
                            // console.log(res.data.data,'add');
                            // console.log(this.getComment()) 
                            this.getComment()
                            this.getMyComment() 
                        }
                    ).catch(console.log)
                }
            ).catch(console.log)
              
            // location.reload()  
            this.dialogFormVisible = false;
        },
        showCommentText(id){
            if(!this.showText && id != this.comment_id){
                this.getPushComent(id);
            }
            this.showText = !this.showText
            if(this.showList == false){
                this.showList = !this.showList
            }
            this.comment_id = id;
            // console.log(id,'id');
            // console.log(this.showList,'showList');
            // console.log(this.showText,'showText');
            // console.log(this.comment_id,'comment_id');
        },
        showCommentList(id){
            this.showList = !this.showList
            this.comment_id = id;
            // console.log(id,'id');
            // console.log(this.showList,'showList');
        },
        getComment(){
            axios.get('/api/commentRouter/getComment').then(
                res =>{
                    // console.log(this.userId,'comment');
                    // console.log(res.data.data,'comment');
                    this.commentList = res.data.data
                    this.commentList.forEach( item =>{
                        // console.log(item.time);
                        item.time = this.formateDate(item.time)
                        // console.log(item.time);
                    })
                }
            ).catch(console.log)
        },
        getTime(){
            let d = new Date();
            return d.getFullYear()*10000000000+(d.getMonth()+1)*100000000+d.getDate()*1000000+d.getHours()*10000+d.getMinutes()*100+d.getSeconds()
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    created () {
        if(!JSON.parse(window.sessionStorage.getItem('userName'))){
            return
        }else{
            this.userName = JSON.parse(window.sessionStorage.getItem('userName'));
		}
        this.getComment();
        this.getMyComment();
    }
}
</script>

<style >
.el-drawer__body{
    overflow: auto; 
}
.container{
    /* margin: 100px auto; */
    margin-top: 80px;
    width: 1400px;
    min-height: 1000px;
    display: flex;
    justify-content: space-around;
}
.container .user{
    flex: 1;
    padding: 10px;
}
.user .user-box{
    text-align: center;
    margin-top: 200px;
    /* margin-left: -200px; */
    min-width: 200px;
    max-width: 445px;
    position: fixed;
    box-shadow: 0 2px 12px 0 rgba(20, 20, 20, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.user-box .user-name{
    /* border-bottom: 1px solid black; */
    line-height: 50px;
    margin: 5px;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(20, 20, 20, 0.1);
    font-size: 20px;
}

.user-box .user-comment{
    /* border-bottom: 1px solid black; */
    margin: 5px;
    border-radius: 15px;
    line-height: 50px;
    box-shadow: 0 2px 12px 0 rgba(20, 20, 20, 0.1);
}

.user-box .user-comment:hover{
    cursor: pointer;
    background: rgb(150, 146, 146,0.5);
}

.user-comment span{
    margin-left: 20px;
    font-size: 25px;
}

.user-comment .comment-num{
    color: brown;
}


.user-box .add{
    text-align: center;
    width: 50px;
    height: 50px;
    margin: 5px auto;
    line-height: 50px;
    border-radius: 50%;
    box-shadow: 0 2px 12px 0 rgba(20, 20, 20, 0.1);
    font-size: 25px;
}

.user-box .add:hover{
    cursor: pointer;
    background: rgb(150, 146, 146,0.5);

}

.container .comment-list{
    flex: 2;
}

.comment-list .comment-item{
    padding: 10px;
    /* background-color: blueviolet; */
}
.comment-item .comment-title{
    font-size: 20px;
    cursor: pointer;
}

.comment-item .comment-box{    
    padding: 20px;
}

.comment-box .comment-time{
}

.comment-box .comment-text{
    text-indent: 2em;
    line-height: 2em;
}
.comment-box .head{
    color: rgb(180, 176, 169);
    cursor: pointer;
    padding: 5px;
}
.comment-box .allComment{
}   



.comment-box .active{
    color: rgb(72, 135, 235);
}

</style>