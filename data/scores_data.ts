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

    async get_score_position(id:number): Promise<any>{
        let c = new Connection();
        let promise = new Promise((resolve, reject) => {
            c.client.connect();
            c.client.query(`select num from 
            (select id, ROW_NUMBER() OVER(partition by questions, letters order by seconds*(questions+1-corrects)) as num 
            from scores) as sorted where id=${id}`, async (err: any, res: any) => {
                if(err) console.log(err);
                c.client.end();
                resolve(res.rows[0]['num']);
            });
          });
        let saved_id:any = await promise;
        return saved_id;
    }

    async show_top_similars(questions:number, letters:number): Promise<any>{
        let c = new Connection();
        let promise = new Promise((resolve, reject) => {
            c.client.connect();
            c.client.query(`select (seconds*(questions+1-corrects)) as score, 
            questions, corrects, seconds, daytime from scores 
            where questions=${questions} and letters=${letters}
            order by (seconds*(questions+1-corrects)), corrects limit 10`, async (err: any, res: any) => {
                if(err) console.log(err);
                c.client.end();
                resolve(res.rows);
            });
          });
        let rows:any = await promise;
        let top_list:string="";
        for(let i:number=0; i< rows.length; i++){
            top_list+=`${i+1}) score: ${rows[i]['score']}, questions: ${rows[i]['questions']}, corrects: ${rows[i]['corrects']}, seconds: ${rows[i]['seconds']}, date: ${rows[i]['date']}\n`;   
        }
        return top_list;
    }
}