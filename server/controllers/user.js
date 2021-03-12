const userModeles = require("../models/user/index.js");
let c = {
	async add({request, response}){
		let { username, phone, email, password, role, classId, stage, grade, date } = request.body;
		// console.log(request.body);
		let res = await userModeles.add({ username, phone, email, password, role, classId, stage, grade, date });
		response.body = {
			code: "0000",
			msg: "添加成功",
			data: res
		}
	},
	async edit({request, response}){
		let { id, username, phone, email, password, role, classId, stage, grade, date } = request.body;
		let res = await userModeles.edit({ id, username, phone, email, password, role, classId, stage, grade, date });
		response.body = {
			code: "0000",
			msg: "添加成功",
			data: res
		}
	},
	async detail({request, response}){
		try{
			let res = await userModeles.detail(request.query.id);
			response.body = {
				code: "0000",
				msg: "成功",
				data: res
			}
		}catch(err){

		}
	},
	async del({request, response}){
		// console.log(request.body);
		try{
			let res = await userModeles.del(request.body.id);
			response.body = {
				code: "0000",
				msg: "成功",
				data: res
			}
		}catch(err){

		}
	},
	async list({request, response}){
		let {
			stage, grade, classId, perPageCount, curPage
		} = request.query;
		let res = await userModeles.list({
			stage, grade, classId, perPageCount, curPage
		});
		response.body = {
			code: "0000",
			msg: "成功",
			data: res
		}
	},
	async regist({request, response}){
		try{
			let { username, phone, email, password, role } = request.body;
			// console.log(request.body);
			let res = await userModeles.add({ username, phone, email, password, role });
			response.body = {
				code: "0000",
				msg: "注册成功",
				data: res
			}
		}catch(err){
			response.body = {
				code: "0001",
				msg: "注册失败",
				data: err
			}
		}
		
	},
	async login({request, response}){
		try{
			let { phone, email, password } = request.body;
			let res = await userModeles.login({ phone, email, password });
			if(res && res.length){
				response.body = {
					code: "0000",
					msg: "登录成功",
					data: res
				}
			}else{
				response.body = {
					code: "0001",
					msg: "账号或密码错误",
					data: res
				}
			}
		}catch(err){
			console.log(err)
			response.body = {
				code: "0002",
				msg: "服务器异常",
				data: err
			}
		}
	}
}

module.exports = c;
