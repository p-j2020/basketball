const Router = require("koa-router");
const commentRouter = new Router();

let commentController = require('../controllers/comment');

commentRouter.get('/commentRouter/getComment',commentController.getComment);

module.exports = commentRouter
    