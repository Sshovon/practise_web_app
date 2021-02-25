const mysql = require('mysql');
const dotenv = require('dotenv');
let instance= null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});


connection.connect(err =>{
    if(err) console.log(err.message);
    else console.log('db ' + connection.state );
});


class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService(); 
    }

    async getAllData(){
        try{
            const response = await new Promise ((resolve, reject)=>{
                const query = 'SELECT * FROM names;';

                connection.query(query,(err , result)=>{
                    if(err) reject(new Error(err));
                    resolve(result);

                });
            });
            //console.log(response);
            return response;
        }catch(err){
            console.log(err);
        } 
    }
}

module.exports = DbService;