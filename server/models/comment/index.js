const db = require('../db');

const getComment = async ( ) =>{
    return await db.q('SELECT * from comment ;')
}
module.exports ={
    getComment,
}