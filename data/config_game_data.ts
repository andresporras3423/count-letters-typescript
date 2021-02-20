import { Config_game } from "../classes/config_game";
import { Connection } from '../connection';

export class Config_game_data{
    constructor(){

    }
    get_config_data(): Config_game | null{
        let c = new Connection();
        c.client.connect();
        let conf: Config_game | null = null;
        c.client.query('select * from config_game', (err: any, res: any) => {
            if(err) console.log(err);
            else conf = new Config_game(res.rows[0].val,res.rows[1].val,res.rows[2].val);
            c.client.end();
        });
        return conf;
    }
}