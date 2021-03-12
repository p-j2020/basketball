const Router = require("koa-router");
const myUserRouter = new Router();

const myUsercontrollers = require('../controllers/myUser');

myUserRouter.post('/myUserRouter/checkUser',myUsercontrollers.checkUser);
myUserRouter.post('/myUserRouter/insert',myUsercontrollers.insert);



module.exports = myUserRouter;

