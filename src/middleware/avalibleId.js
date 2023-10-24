const connection = require('../config/config');
const getRndInteger = require('./getRandomInt');

const getAvalibleId = async({table, column, min, max}) => {
    let avalibleId = false;
    let id = null;
    while (!avalibleId) {
        id = getRndInteger(min, max);
        const query = `SELECT * FROM ${table} WHERE ${column} = ?`;
        const rows = await new Promise((resolve, reject) => {
            connection.query(query, [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        if (rows.length > 0) {
            avalibleId = false;
        } else {
            avalibleId = true;
        }
    }
    return id;
}

module.exports = getAvalibleId;
