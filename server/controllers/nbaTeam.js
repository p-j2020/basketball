const teamModeles = require("../models/nbaTeam/index.js");
const { success } = require('../config');


async function getList({request, response}){
    let {category_id,team_name,img_url,type_id,team_position} = request.body;
    let res = await teamModeles.getList({ category_id,team_name,img_url,type_id,team_position });
    response.body = success(res);
}

async function getTeam({request, response}){
    let {team_id} = request.body;
    let res = await teamModeles.getTeam({ team_id });
    response.body = success(res);
}



module.exports = {
    getList,
    getTeam,
}