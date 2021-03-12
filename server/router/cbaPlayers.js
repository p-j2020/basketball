const Router = require("koa-router");
const cbaPlayerRouter = new Router();

let cbaPlayercontroller = require('../controllers/cbaPlayers');

cbaPlayerRouter.post('/cbaPlayerRouter/getCbaplayers',cbaPlayercontroller.get);

module.exports = cbaPlayerRouter
    