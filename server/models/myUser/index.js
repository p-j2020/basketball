const db = require('../db.js');

//获取或者检查用户和密码

const checkUser = async ({userName,userPassword}) =>{
    // console.log(userName,userPassword);
    let res = db.q('select user_id from user where user_name = ? and user_password =?',[userName,userPassword]);
    // console.log(res);
    return res;
}



const insert = async ({userName,userPassword}) =>{
    // console.log(userName,userPassword);
    let res = db.q('INSERT INTO user(user_name,user_password) VALUES (?,?)',[userName,userPassword]);
    // console.log(res);
    return res;
}

module.exports = {
    checkUser,
    insert,
}