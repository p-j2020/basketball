const Router = require("koa-router");
const cbaTeamRouter = new Router();

let cbaTeamcontrollers = require('../controllers/cbaTeam');

cbaTeamRouter.get('/cbaTeamRouter/getCbaTeamList',cbaTeamcontrollers.getCbaTeamList);
cbaTeamRouter.post('/cbaTeamRouter/getCbaTeam',cbaTeamcontrollers.getCbaTeam);


module.exports = cbaTeamRouter;