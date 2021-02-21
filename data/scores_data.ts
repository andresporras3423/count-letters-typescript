import { Scores } from "../classes/scores";
import { Connection } from '../connection';

export class Scores_data{
    constructor(){

    }
     async add_score(nScore:Scores): Promise<any>{
        let c = new Connection();
        let promise = new Promise((resolve, reject) => {
            c.client.connect();
            c.client.query(`insert into scores (questions, letters, seconds, corrects, daytime) values(${nScore.questions}, ${nScore.letters}, ${nScore.seconds}, ${nScore.corrects}, NOW()) RETURNING id`, async (err: any, res: any) => {
                if(err) console.log(err);
                c.client.end();
                resolve(res.rows[0]['id']);
            });
          });
        let saved_id:any = await promise;
        return saved_id;
    }
}