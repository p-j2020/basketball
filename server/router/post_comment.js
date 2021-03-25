const Router = require("koa-router");
const postCommentRouter = new Router();

let postCommentController = require('../controllers/post_comment');

postCommentRouter.post('/postCommentRouter/checkTable',postCommentController.checkTable);
postCommentRouter.post('/postCommentRouter/insertTableName',postCommentController.insertTableName);
postCommentRouter.post('/postCommentRouter/createTable',postCommentController.createTable);
postCommentRouter.post('/postCommentRouter/insertComment',postCommentController.insertComment);
postCommentRouter.post('/postCommentRouter/seleComment',postCommentController.seleComment);
postCommentRouter.post('/postCommentRouter/seleTableName',postCommentController.seleTableName);
postCommentRouter.post('/postCommentRouter/deleTable',postCommentController.deleTable);

postCommentRouter.post('/postCommentRouter/deleInsertComment',postCommentController.deleInsertComment);

module.exports = postCommentRouter