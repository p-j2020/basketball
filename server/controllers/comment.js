const commentModule = require('../models/comment');
const { success } = require('../config');

async function getComment({request, response}){
    let {} = request.body;
    let res = await commentModule.getComment();
    response.body =success(res);
}

module.exports = {
    getComment,
}
