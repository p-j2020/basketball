const Router = require("koa-router");
const scheduleRouter = new Router();

let scheduleController = require('../controllers/Schedule');

scheduleRouter.get('/scheduleRouter/getCbaSchedule',scheduleController.getCbaSchedule);
scheduleRouter.get('/scheduleRouter/getNbaSchedule',scheduleController.getNbaSchedule);
scheduleRouter.post('/scheduleRouter/getCbaTeamSchedule',scheduleController.getCbaTeamSchedule);
scheduleRouter.post('/scheduleRouter/getNbaTeamSchedule',scheduleController.getNbaTeamSchedule);

module.exports = scheduleRouter
    