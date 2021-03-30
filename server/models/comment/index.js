const db = require('../db');

const getComment = async ( ) =>{
    return await db.q('SELECT * from comment ;')
}
const addComment = async ({user_id,comment_title,comment_text,time} ) =>{
    return await db.q('INSERT INTO comment(user_id,comment_title,comment_text,time) VALUES(?,?,?,?)',[user_id,comment_title,comment_text,time])
}

const getUserComment = async ({user_id} ) =>{
    return await db.q('SELECT * from comment where user_id = ?',[user_id])
}

const checkCommentTitle = async ({comment_title} ) =>{
    return await db.q('select * from comment where comment_title = ?',[comment_title])
}

const changeComment = async ({comment_title,comment_text,comment_id} ) =>{
    return await db.q('update comment set comment_title = ?,comment_text = ? where category_id =?',[comment_title,comment_text,comment_id])
}
const deleComment = async ({comment_id} ) =>{
    return await db.q('delete from comment where category_id = ?',[comment_id])
}

module.exports ={
    getComment,
    addComment,
    getUserComment,
    checkCommentTitle,
    changeComment,
    deleComment
}