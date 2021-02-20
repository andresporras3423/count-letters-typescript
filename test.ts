//how to start a typescript project: https://www.youtube.com/watch?v=1UcLoOD1lRM&ab_channel=BenAwad 
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'count_letters',
  password: 'password',
  port: 5432,
})
client.connect()
client.query('select * from config_game', (err: any, res: any) => {
  if(err) console.log(err);
  else console.log(res.rows);
  client.end()
})