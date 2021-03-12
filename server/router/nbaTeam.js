const Router = require("koa-router");
let nbaTeamRouter = new Router();

let nbaTeamController = require("../controllers/nbaTeam.js");


nbaTeamRouter.get("/nbaTeam/getList",nbaTeamController.getList)
nbaTeamRouter.post("/nbaTeam/getTeam",nbaTeamController.getTeam)


module.exports = nbaTeamRouter;