const nbaPlayermodels = require('../models/nbaPlayer/index.js');
const { success } = require('../config');
// console.log(success)

async function getplayers({request, response}){
    let {team_id} =request.body;
    // console.log(request.body);
    let res = await nbaPlayermodels.getplayers({team_id});
    response.body = success(res);
}

module.exports ={
    getplayers,
}