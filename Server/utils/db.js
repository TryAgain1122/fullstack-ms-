import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' });

const con = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,

})

con.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected")
    }
})

export default con