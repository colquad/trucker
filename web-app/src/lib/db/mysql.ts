import mysql from "mysql2/promise";
    
    export const mysqlconn = await mysql.createConnection({ 
        host: "",
        user: "",
        password: "",
        database: ""
    });