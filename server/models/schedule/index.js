const db = require('../db');

//获取所有赛程信息
//cba
const getCbaSchedule = async() =>{
    return db.q("select * from cba_schedule ");
}
// nba
const getNbaSchedule = async() =>{
    return db.q("select * from nba_schedule ");
}
//获取cba某一支球队的赛程
const getCbaTeamSchedule = async({team_id}) =>{
    return db.q("select * from cba_schedule where first_team_id = ?",[team_id]);
}

//获取nba某一支球队的赛程
const getNbaTeamSchedule = async({team_id}) =>{
    return db.q("select * from nba_schedule where first_team_id = ?",[team_id]);
}

module.exports ={
    getCbaSchedule,
    getNbaSchedule,
    getCbaTeamSchedule,
    getNbaTeamSchedule,
}