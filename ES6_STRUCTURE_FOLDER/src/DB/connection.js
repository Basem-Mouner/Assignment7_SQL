import mysql2 from"mysql2";

//__________________create database and check connection__________________________________________________
const DB = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment7_U_P",
});
export default DB;

