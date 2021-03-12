const db = require('../db.js');

//要分两种情况1：东部球员 2：西部球员

//根据team_id获取一队的所有球员的信息
const getplayers = async ({team_id}) =>{
    if(team_id <= 15){
        return await db.q("select * from nba_east_player where team_id = ?", [team_id]);
    }else{
        return await db.q("select * from nba_west_player where team_id = ?", [team_id]);
    }
    // console.log(res);
}
//根据category_id找某一位成员

module.exports = {
    getplayers,
}

//根据category_id 找某一位球员



//
// const getNbaplayers = async ({})