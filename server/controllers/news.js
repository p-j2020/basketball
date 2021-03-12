const newsModule = require('../models/news');
const { success } = require('../config');


async function getCbaNews({request, response}){
    let {} = request.body;
    let res = await newsModule.getCbaNews();
    response.body =success(res);
}

async function getNbaNews({request, response}){
    let {} = request.body;
    let res = await newsModule.getNbaNews();
    response.body =success(res);
}


async function getCbaTeamNews({request, response}){
    let {team_id} = request.body;
    let res = await newsModule.getCbaTeamNews({team_id});
    response.body =success(res);
}

async function getNbaTeamNews({request, response}){
    let {team_id} = request.body;
    let res = await newsModule.getNbaTeanNews({team_id});
    response.body =success(res);
}


module.exports = {
    getCbaNews,
    getNbaNews,
    getCbaTeamNews,
    getNbaTeamNews,
}