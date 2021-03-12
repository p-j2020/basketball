const cbaTeammodule = require('../models/cbaTeam');
const { success } = require('../config');

async function getCbaTeamList({request, response}){
    let {} = request.body;
    let res = await cbaTeammodule.getCbaTeamList();
    response.body = success(res);
}

async function getCbaTeam({request, response}){
    let {team_id} = request.body;
    let res = await cbaTeammodule.getCbaTeam({ team_id });
    response.body = success(res);
}

module.exports = {
    getCbaTeamList,
    getCbaTeam,
}
