const path = require('path'); // 核心对象
module.exports = {
//viewDir:path.resolve('./views'),
//staticDir:path.resolve('./public'),
  appPort:8000,
  staticDir:path.resolve('./images'),
  dbConfig:{
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '123456',
    database        : 'basketball', //数据库名
  },
  successCode: "0000",
  successDesc: "成功",
  success(res){
    return {
      code: "0000",
      msg: "成功",
      data: res
    }
  }
}