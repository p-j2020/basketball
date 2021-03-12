const Router = require("koa-router");
const newsRouter = new Router();

let newsControllers = require('../controllers/news');

newsRouter.get('/news/cbaNews',newsControllers.getCbaNews);
newsRouter.get('/news/nbaNews',newsControllers.getNbaNews);
newsRouter.post('/news/cbaTeamNews',newsControllers.getCbaTeamNews);
newsRouter.post('/news/nbaTeamNews',newsControllers.getNbaTeamNews);



module.exports = newsRouter;
