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

    async show_recents_questions(state:boolean): Promise<any>{
        let c = new Connection();
        let promise = new Promise((resolve, reject) => {
            c.client.connect();
            c.client.query(`select question, daytime from questions where correct=${state} order by daytime desc limit 10`, async (err: any, res: any) => {
                if(err) console.log(err);
                c.client.end();
                resolve(res.rows);
            });
          });
        let rows:any = await promise;
        let top_list:string="";
        for(let i:number=0; i< rows.length; i++){
            top_list+=`${i+1}) question: ${rows[i]['question']}, daytime: ${rows[i]['daytime']}\n`;   
        }
        return top_list;
    }
}