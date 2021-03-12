const Koa = require("koa");
const config = require("./config.js");
const userRouter = require("./router/user.js");
const dicRouter = require("./router/dictionary.js");
const scoreRouter = require("./router/score.js");
const nbaTeamRouter = require("./router/nbaTeam.js");
const cbaPlayerRouter = require("./router/cbaPlayers");
const myUserRouter = require('./router/myUser');
const cbaTeamRouter = require('./router/cbaTeam')
const newsRouter = require('./router/news')
const nbaPlayersRouter = require('./router/nbaPlayers')
const ScheduleRouter = require('./router/Schedule')

const bodyParser = require('koa-bodyparser');

const { staticDir } = require("./config");
const rewriteUrl = require("./middleware/rewrite");
 

const app = new Koa();
//app.use(ctx => {
//	console.log(ctx);
//	ctx.body = ctx;
//});

// 为了给static重写URL
app.use(rewriteUrl);

//处理静态资源
app.use(require('koa-static')(staticDir));


// 这个要写到前面，因为后面要用请求体里面的东西
app.use(bodyParser());

app.use(async (ctx, next)=> {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (ctx.method == 'OPTIONS') {
	  ctx.body = 200; 
	} else {
		// console.log(ctx);
	  await next();
	}
  });

app.use(userRouter.routes());
app.use(dicRouter.routes());
app.use(scoreRouter.routes());
app.use(nbaTeamRouter.routes());
app.use(cbaPlayerRouter.routes());
app.use(myUserRouter.routes());
app.use(cbaTeamRouter.routes());
app.use(newsRouter.routes())
app.use(nbaPlayersRouter.routes())
app.use(ScheduleRouter.routes())


// app.use(express.static('public'));
// app.get('/public/images/*', function (req, res) {
//     res.sendFile( __dirname + "/" + req.url );
//     console.log("Request for " + req.url + " received.");
// })

//处理405 方法不匹配 和 501 方法未实现
app.use(userRouter.allowedMethods());

app.listen(config.appPort, (err) => {
	console.log(`服务启动在${config.appPort}端口`);
});
