const myUserModel = require('../models/myUser/index');
const {success} = require('../config');


async function checkUser({request, response}){
    let {userName} = request.body;
    let res = await myUserModel.checkUser({userName});
    response.body = success(res);
}

async function insert({request, response}){
    let {userName,userPassword} = request.body;
    let res = await myUserModel.insert({userName,userPassword});
    response.body = success(res);
}
async function getUserId({request, response}){
    let {userName} = request.body;
    let res = await myUserModel.getUserId({userName});
    // console.log(res);
    response.body = success(res);
}

module.exports = {
    checkUser,
    insert,
    getUserId,
}