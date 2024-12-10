import mysql from "mysql2/promise";
    
    export const mysqlconn = await mysql.createConnection({ 
        host: "team21-rds.cobd8enwsupz.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "Monkey3750*",
        database: "team21"
    });