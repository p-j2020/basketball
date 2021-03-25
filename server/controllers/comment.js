const commentModule = require('../models/comment');
const { success } = require('../config');

async function getComment({request, response}){
    let {} = request.body;
    let res = await commentModule.getComment();
    response.body =success(res);
}

async function addComment({request, response}){
    let {user_id,comment_title,comment_text,time} = request.body;
    let res = await commentModule.addComment({user_id,comment_title,comment_text,time});
    response.body =success(res);
}

async function getUserComment({request, response}){
    let {user_id} = request.body;
    let res = await commentModule.getUserComment({user_id});
    response.body =success(res);
}

async function checkCommentTitle({request, response}){
    let {comment_title} = request.body;
    // console.log(comment_title);
    let res = await commentModule.checkCommentTitle({comment_title});
    // console.log(res);
    response.body =success(res);
}

async function changeComment({request, response}){
    let {comment_title,comment_text,comment_id} = request.body;
    let res = await commentModule.changeComment({comment_title,comment_text,comment_id});
    response.body =success(res);
}

async function deleComment({request, response}){
    let {comment_id} = request.body;
    let res = await commentModule.deleComment({comment_id});
    response.body =success(res);
}



module.exports = {
    getComment,
    addComment,
    getUserComment,
    checkCommentTitle,
    changeComment,
    deleComment,
}
