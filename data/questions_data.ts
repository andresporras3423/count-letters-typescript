import { Questions } from "../classes/questions";
import { Connection } from '../connection';

export class Questions_data{
    constructor(){

    }

    async save_question(nQuestion:Questions): Promise<any>{
        let c = new Connection();
        let promise = new Promise((resolve, reject) => {
            c.client.connect();
            c.client.query(`insert into questions (question, correct, daytime) values('${nQuestion.question}', ${nQuestion.correct}, NOW())`, async (err: any, res: any) => {
                if(err) console.log(err);
                c.client.end();
                resolve(res.rows[0]);
            });
          });
          await promise;
          return true;
    }
}