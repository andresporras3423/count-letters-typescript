import { Config_game } from "../classes/config_game";
import { Connection } from '../connection';

export class Config_game_data{
    constructor(){

    }
     async get_config_data(): Promise<Config_game>{
        let c = new Connection();
        let promise = new Promise<Array<any>>((resolve, reject) => {
            c.client.connect();
            c.client.query('select * from config_game', async (err: any, res: any) => {
                if(err) console.log(err);
                c.client.end();
                const rowData:Array<any> = res.rows;
                resolve(rowData);
            });
          });
        let resolved:Array<any> = await promise;
        let oConfigData:{ [key: string]: number } = {};
        resolved.forEach((r)=>{
            oConfigData[r.property] = r.val;
        });
        return new Config_game(oConfigData['total_letters'], oConfigData['questions'],  oConfigData['whitespaces']);
    }

    async update_setting(numb:bigint, sett:string): Promise<any>{
        let c = new Connection();
        let promise = new Promise((resolve, reject) => {
            c.client.connect();
            c.client.query(`update config_game set val=${numb} where position('${sett}' in property)>0`, async (err: any, res: any) => {
                if(err) console.log(err);
                c.client.end();
                resolve(res);
            });
          });
        await promise;
        return true;
    }
}