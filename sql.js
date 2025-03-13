import mysql from 'mysql';
import config from './config.js';

const connection = mysql.createConnection(config.dbConfig);

connection.connect(err => {
    if (err){
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id:' + connection.threadId);
})


const getConnection = () => {
    return connection;
}

const getTableStructure = (tableName) => {
    const query = `SHOW FULL COLUMNS FROM ${tableName}`;
    return new Promise((res, rej) => {
        connection.query(query, (err, result) => {
            if (err) {
                rej(err);
            } else {
                let array = [];
                result.forEach(row => {
                    array.push({
                        field: row.Field,
                        type: row.Type.toUpperCase(),
                        collation: row.Collation,
                        null: row.Null === "NO" ? false : true,
                        key: row.Key === "PRI" ? true : false,
                        default: row.Default,
                        extra: row.Extra,
                        comment: row.Comment
                    });
                })

                res(array);
            }
        })
    })
}

const getTablesName = () => {
    const query = `SHOW TABLES FROM ${config.dbConfig.database}`;
    return new Promise((res, rej) => {
        connection.query(query, (err, result) => {
            if (err) {
                rej(err);
            } else {
                let tableNames = result.map(row => Object.values(row)[0]);
                res(tableNames);
            }
        })
    })
}


export default {
   getConnection, 
   getTableStructure,
   getTablesName
}