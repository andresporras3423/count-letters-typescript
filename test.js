"use strict";
var Client = require('pg').Client;
var client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'count_letters',
    password: 'password',
    port: 5432,
});
client.connect();
client.query('select * from config_game', function (err, res) {
    console.log(err, res);
    client.end();
});
