let { Config_game } = require('./classes/config_game');
let { Config_game_data } = require('./data/config_game_data');
let _prompt = require('prompt-sync')();

let conf_data = new Config_game_data();
let conf: typeof Config_game;
function start_main(){
  conf = conf_data.get_config_data();
  console.log("welcome");
  options();
};

function options(){
  console.log(`Please choose an option
              1) play
              2) setting
              3) game feedback
              4) exit`);
              let variable = _prompt();
              console.log(variable);       
}

start_main();
//how to start a typescript project: https://www.youtube.com/watch?v=1UcLoOD1lRM&ab_channel=BenAwad 
// const { Client } = require('pg');

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'count_letters',
//   password: 'password',
//   port: 5432,
// })
// client.connect()
// client.query('select * from config_game', (err: any, res: any) => {
//   if(err) console.log(err);
//   else console.log(res.rows);
//   client.end()
// })