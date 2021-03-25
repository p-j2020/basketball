const postCommentModule = require('../models/post_comment');
const { success } = require('../config');


async function checkTable({request, response}){
    let {comment_id} = request.body;
    let res = await postCommentModule.checkTable({comment_id});
    response.body =success(res);
}

async function insertTableName({request, response}){
    let {comment_id,table_name} = request.body;
    let res = await postCommentModule.insertTableName({comment_id,table_name});
    response.body =success(res);
}

async function createTable({request, response}){
    let {table_name} = request.body;
    let res = await postCommentModule.createTable({table_name});
    response.body =success(res);
}

async function insertComment({request, response}){
    let { table_name,user_name,comment_id,comment_text,date_time } = request.body;
    let res = await postCommentModule.insertComment({ table_name,user_name,comment_id,comment_text,date_time });
    response.body =success(res);
}

async function seleComment({request, response}){
    let { table_name } = request.body;
    let res = await postCommentModule.seleComment({ table_name });
    response.body =success(res);
}

async function seleTableName({request, response}){
    let { db_name,table_name } = request.body;
    let res = await postCommentModule.seleTableName({ db_name,table_name });
    response.body =success(res);
}

async function deleTable({request, response}){
    let { table_name } = request.body;
    let res = await postCommentModule.deleTable({ table_name });
    response.body =success(res);
}

async function deleInsertComment({request, response}){
    let { comment_id } = request.body;
    let res = await postCommentModule.deleInsertComment({ comment_id });
    response.body =success(res);
}

module.exports ={
    checkTable,
    insertTableName,
    createTable,
    insertComment,
    seleComment,
    seleTableName,
    deleTable,
    deleInsertComment
}