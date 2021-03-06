const db = require("../db.js");

function isNull (val) {
    let nullArr = [null, undefined, "", NaN];
    return nullArr.includes(val);
}

// 查询所有
const list = async ({
	stage, grade, classId, perPageCount, curPage
}) => {
	// return await db.q("select * from user", []);
	let arr = [];
	if(!isNull(stage)){
		arr.push(["st.id", stage, "="]);
	}
	if(!isNull(grade)){
		arr.push(["g.id", grade, "="]);
	}
	if(!isNull(classId)){
		arr.push(["u.class", classId, "="]);
	}
	let sql = `select 
		u.id, u.name, u.phone, u.email, u.password,
		u.role, u.class as classId, u.grade, u.stage, 
		u.date, g.name as gradeName, r.name as roleName, st.name as stageName
		from user as u
		left join grade as g 
		on u.grade = g.id
		left join role as r
		on u.role = r.id
		left join stage as st
		on u.grade = st.id`;
	arr = arr.map(item => `${item[0]} ${item[2]} ${item[1]}`);
	sql += (arr.length ? " where " + arr.join(" AND ") : "");
	sql += ` limit ${perPageCount} offset ${(curPage - 1) * perPageCount} `;

	let totalSql = `select 
		count(*) as total
		from user as u
		left join grade as g 
		on u.grade = g.id
		left join role as r
		on u.role = r.id
		left join stage as st
		on u.grade = st.id
	`;
	totalSql += (arr.length ? " where " + arr.join(" AND ") : "");
	let list = await db.q(sql);
	let total = await db.q(totalSql);
	let totalCount = total[0].total;
	let pageCount = Math.ceil(totalCount/perPageCount);
	return {
		list,
		total: totalCount,
		pageCount,
		limit: +perPageCount,
		page: +curPage,
	}

}
// 添加用户
// const add = async (userObj) => {
// 	return await db.q("insert into user (username, phone) values (?,?)", [userObj.username, userObj.phone]);
// }

// 添加用户
const add = async ({ username, phone, email, password, role, classId, grade, stage, date }) => {
	console.log({ username, phone, email, password, role, classId, grade, stage, date })
	return await db.q("insert into user (name, phone, email, password, role, class, grade, stage, date) values (?,?,?,?,?,?,?,?,?)", [username, phone, email, password, role, classId, grade, stage, date]);
}

// 删除用户
const del = async (id) => {
	return await db.q("delete from user where id = ?", [id]);
};

// 修改用户
const edit = async ({id, username, phone, email, password, role, classId, stage, grade, date}) => {
	return await db.q("update user set name = ?, phone = ?, email = ?, password = ?, role = ?, class = ?, stage = ?, grade = ?, date = ?  where id = ?", 
	[username, phone, email, password, role, classId, stage, grade, date, id]);
};

// 详情
const detail = async (id) => {
	console.log(id);
	return await db.q("select * from user where id = ?", [id]);
}

// 登录--根据用户名或邮箱以及密码查找用户
const login = async ({phone, password, email}) => {
	// let whereCause = "";
	// if(phone){
	// 	whereCause = `phone = '${phone}' and password = '${password}'`;
	// }else{
	// 	whereCause = `email = '${email}' and password = '${password}'`;
	// }
	// return await db.q("select * from user where " + whereCause);

	let keywords = phone || email;
	return await db.q(`select * from user where (phone = '${keywords}' or email = '${keywords}') and password = '${password}'`);
}

module.exports = {
	list,
	add,
	del,
	edit,
	detail,
	login,
}
