const db = require("../db.js");

//get 所有NBA球队
const getList = async ({}) => {
	return await db.q(`select * from nba_team`)
}

//post 获取某一队的信息
const getTeam = async ({team_id}) => {
	return await db.q(`select * from nba_team where category_id = ?`,[team_id])
}

module.exports = {
	getList,
	getTeam,
}