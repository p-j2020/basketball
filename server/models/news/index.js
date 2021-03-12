const db = require('../db');


//获取cba某所有新闻 0 是首页新闻

const getCbaNews =async () =>{
    return await db.q('SELECT * from cba_news ;')
}

//获取nba所有新闻 0 是首页新闻
const getNbaNews =async () =>{
    return await db.q('SELECT * from nba_news ;')
}

//获取cba某一队的所有新闻 0 是首页新闻

const getCbaTeamNews =async ({team_id}) =>{
    // console.log(team_id)
    return await db.q('SELECT * from cba_news where team_id =?;',[team_id])
}

//获取nba某一队的所有新闻 0 是首页新闻
const getNbaTeanNews =async ({team_id}) =>{
    // console.log(team_id)
    return await db.q('SELECT * from nba_news where team_id =?;',[team_id])
}

module.exports ={
    getCbaNews,
    getNbaNews,
    getCbaTeamNews,
    getNbaTeanNews
}