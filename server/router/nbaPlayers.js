const Router = require("koa-router");
const nbaPlayerRouter = new Router();

let nbaPlayercontroller = require('../controllers/nbaplayers');

nbaPlayerRouter.post('/nbaPlayerRouter/getNbaplayers',nbaPlayercontroller.getplayers);

module.exports = nbaPlayerRouter
    