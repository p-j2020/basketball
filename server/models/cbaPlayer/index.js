const db = require('../db.js');
// const cbaPlayermodels = require('../db.js');

//根据team_id获取一队的所有球员的信息
const get = async ({team_id}) =>{
    let res = await db.q("select * from cba_player where team_id = ?", [team_id]);
    // console.log(res);
    return res;
}
//根据category_id找某一位成员

module.exports = {
    get,
}
