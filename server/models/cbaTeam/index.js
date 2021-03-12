const db  =require('../db.js')

//获取CBA球队

const getCbaTeamList = async() =>{
    return db.q('select * from cba_team');
}

//获取某一支球队
const getCbaTeam = async({ team_id }) =>{
    return db.q('select * from cba_team where category_id =?',[team_id]);
}


module.exports = {
    getCbaTeamList,
    getCbaTeam,
}