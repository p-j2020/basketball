const Router = require("koa-router");
const commentRouter = new Router();

let commentController = require('../controllers/comment');

commentRouter.get('/commentRouter/getComment',commentController.getComment);
commentRouter.post('/commentRouter/addComment',commentController.addComment);
commentRouter.post('/commentRouter/getUserComment',commentController.getUserComment);
commentRouter.post('/commentRouter/checkCommentTitle',commentController.checkCommentTitle);
commentRouter.post('/commentRouter/changeComment',commentController.changeComment);
commentRouter.post('/commentRouter/deleComment',commentController.deleComment);

module.exports = commentRouter
    