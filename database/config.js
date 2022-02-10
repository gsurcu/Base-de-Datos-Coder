import knex from "knex";
const config = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'coder16'
  }
};
export default knex(config)