const cbaPlayermodels = require('../models/cbaPlayer/index.js');
const { success } = require('../config');
// console.log(success)

async function get({request, response}){
    let {team_id} =request.body;
    // console.log(request.body);
    let res = await cbaPlayermodels.get({team_id});
    response.body = success(res);

}

module.exports ={
    get,
}