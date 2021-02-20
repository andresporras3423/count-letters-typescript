const { Client } = require('pg');

export class Connection{
    client: any;
    constructor(){
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'count_letters',
            password: 'password',
            port: 5432,
          })
    }
}
