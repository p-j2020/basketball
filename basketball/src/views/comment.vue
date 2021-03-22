<template>
    <div class="comment">
        <my-head></my-head> 
        <div class="container">
            <div class="user">
                <div class="user-box">
                    <div class="user-name">
                        {{ userName }}
                    </div>
                    <div class="user-comment" @click="dialogTableVisible = true">
                        <span >所有评论</span>
                        <span class="comment-num">12</span>
                    </div>
                    <div class="add" @click="dialogFormVisible = true">+</div>
                </div>
            </div>
            <div class="comment-list">
                <p>123456</p>
            </div>
        </div>
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog title="添加评论" :visible.sync="dialogFormVisible" center>
            <el-form :model="form" >
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input 
                        v-model="form.name" 
                        autocomplete="off" 
                        maxlength="30"
                        show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
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
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
            gridData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, 
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, 
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, 
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                name: '',
                text:'',
                dateTime:'',
            },
            formLabelWidth: '120px',
            userName:''
        }
    },
    methods: {
        getComment(){
            axios.get('/api/commentRouter/getComment').then(
                res =>{
                    console.log(res.data.data);
                }
            ).catch(console.log)
        }
    },
    created () {
        if(!JSON.parse(window.sessionStorage.getItem('userName'))){
            return
        }else{
            this.userName = JSON.parse(window.sessionStorage.getItem('userName'));
		}
        this.getComment()
    }
}
</script>

<style scoped>
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
    background: rgb(124, 65, 65);
}
</style>