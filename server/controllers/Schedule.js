const ScheduleModels = require('../models/schedule/index');
const { success } = require('../config');

async function getCbaSchedule({request, response}){
    let {} = request.body;
    let res = await ScheduleModels.getCbaSchedule();
    response.body = success(res);
}

async function getNbaSchedule({request, response}){
    let {} = request.body;
    let res = await ScheduleModels.getNbaSchedule();
    response.body = success(res);
}

async function getCbaTeamSchedule({request, response}){
    let {team_id} = request.body;
    let res = await ScheduleModels.getCbaTeamSchedule({team_id});
    response.body = success(res);
}
async function getNbaTeamSchedule({request, response}){
    let {team_id} = request.body;
    let res = await ScheduleModels.getNbaTeamSchedule({team_id});
    response.body = success(res);
}


module.exports ={
    getCbaSchedule,
    getNbaSchedule,
    getCbaTeamSchedule,
    getNbaTeamSchedule
}