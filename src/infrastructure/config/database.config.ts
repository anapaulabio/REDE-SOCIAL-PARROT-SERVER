import "dotenv/config";

const databaseConfig = {
    database: String(process.env.DB_DBNAME),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASS),
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    dialect: 'mysql'
};

export default databaseConfig;

module.exports = databaseConfig;