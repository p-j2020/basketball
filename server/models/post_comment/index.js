const db = require('../db');

const checkTable = async ( {comment_id} ) =>{
    return await db.q('SELECT table_name from post_comment where comment_id =? ;',[comment_id]);
}

const insertTableName = async ( {comment_id,table_name} ) =>{
    return await db.q(' INSERT INTO post_comment ( comment_id,table_name ) VALUES( ?,? ) ;',[comment_id,table_name]);
}

const createTable = async ( { table_name } ) =>{
    return await db.q('create table comment_?(category_id int(10) primary key NOT NULL AUTO_INCREMENT,user_name varchar(255), comment_id int (10), comment_text varchar(255),date_time datetime);',[table_name]);
}

const insertComment = async ( { table_name,user_name,comment_id,comment_text,date_time } ) =>{
    return await db.q('INSERT INTO comment_? ( user_name,comment_id,comment_text,date_time ) VALUES( ?,?,?,?) ;',[table_name,user_name,comment_id,comment_text,date_time]);
}

const seleComment = async ( { table_name } ) =>{
    return await db.q('select * from comment_? ;',[table_name]);
}

const seleTableName = async ( { db_name, table_name } ) =>{
    return await db.q('select count(*)  from information_schema.TABLES t where t.TABLE_SCHEMA =? and t.TABLE_NAME =? ;',[db_name,table_name]);
}

const deleTable = async ( { table_name } ) =>{
    return await db.q('DROP TABLE comment_?;',[table_name]);
}

const deleInsertComment = async ( { comment_id } ) =>{
    return await db.q('delete from post_comment where comment_id = ?;',[comment_id]);
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