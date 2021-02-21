import { Config_game } from "../classes/config_game";
import { Connection } from '../connection';

export class Config_game_data{
    constructor(){

    }
     async get_config_data(): Promise<any>{
        let c = new Connection();
        let promise = new Promise((resolve, reject) => {
            c.client.connect();
            c.client.query('select * from config_game', async (err: any, res: any) => {
                if(err) console.log(err);
                c.client.end();
                resolve(res.rows);
            });
          });
        let resolved:any = await promise;
        return new Config_game(resolved[0].val,resolved[1].val,resolved[2].val);
    }
}