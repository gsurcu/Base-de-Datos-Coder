import knex from "knex";

const configMariaDB = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'coder16'
  }
};

const configSQLite3 = {
  client: 'better-sqlite3',
  connection: {
    filename: './database/mydb.sqlite'
  },
  useNullAsDefault: true
}

export { configMariaDB, configSQLite3 }