import { Config_game_data } from "./data/config_game_data";
import { Scores_data } from "./data/scores_data";
import { Questions_data } from "./data/questions_data";
import { Config_game } from "./classes/config_game";
import { Scores } from "./classes/scores";
import { Questions } from "./classes/questions";

let prompt_sync = require('prompt-sync')();
let conf_data: Config_game_data;
let scores_data: Scores_data;
let questions_data: Questions_data;
let conf: Config_game;
async function start_main(){
  conf_data  = new Config_game_data();
  scores_data  = new Scores_data();
  questions_data  = new Questions_data();
  await get_conf();
  console.log("WELCOME");
  options();
};

async function get_conf(){
  conf = await conf_data.get_config_data();
}

async function options(){
  console.log(`Please choose an option
  1) play
  2) settings
  3) game feedback
  4) exit`);
              let opt: string = prompt_sync();
              if(opt==="1") play_exam();
              else if(opt==="2") settings(); 
              else if(opt==="3") await feedback(); 
              else console.log("Bye bye!");     
}

async function play_exam(){
  let sols:  number = 0;
  let initial: Date = new Date();
  for(let i:number=0; i< conf.questions; i++){
    console.log(`Question N°${i+1}`);
    if(await question()) sols++;
  }
  end_game(sols, initial);
}

async function question(): Promise<Boolean>{
  let alphabet: string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  let subAlphabet: string[] =[];
  let sol:number=0;
  let word:string="";
  [...Array(5).keys()].forEach(()=>{
    let numb:number = Math.round(Math.random()*(alphabet.length-1));
    subAlphabet.push(alphabet[numb]);
    alphabet.splice(numb,1);
  });
  [...Array(conf.letters).keys()].forEach((j)=>{
    let numb:number = Math.round(Math.random()*4);
    if(numb===0) sol++;
    word+=subAlphabet[numb];
    for(let k:number=0;k<conf.whitespaces;k++) word+=" ";
    if((j+1)%conf.letters_x==0){
      word+="\n";
      for(let k:number=0;k<conf.whitespaces;k++) word+="\n";
    }
  });
  console.log(`Find how many ${subAlphabet[0]}'s`);
  console.log(word);
  let answer: number = parseInt(prompt_sync());
  let correct:boolean= answer===sol;
  let nQuestion:Questions = new Questions(subAlphabet[0], correct);
  let x = await questions_data.save_question(nQuestion);
  if(correct) console.log("correct");
  else console.log("incorrect, the solution was "+sol);
  return correct;
}


async function end_game(sols:number, initial:Date){
  let final: Date = new Date();
  let diff: number = Math.round((final.valueOf() - initial.valueOf())/1000);
  let idScore:number = parseInt(await save_final_score(sols, diff));
  let position:number = parseInt(await get_position(idScore));
  console.log(`Correct questions: ${sols}/${conf.questions}`);
  console.log(`Time: ${diff} seconds`);
  console.log(`Score: ${diff*(conf.questions-sols+1)}`);
  console.log(`Position: ${position}`);
  options();
}

async function save_final_score(sols:number, diff:number): Promise<any>{
    let nScore:Scores = new Scores(conf.letters, conf.questions,  diff, sols);
    let idCreated:number = parseInt(await scores_data.add_score(nScore));
    return idCreated;
}

async function get_position(id:number): Promise<any>{
  let position:number = parseInt(await scores_data.get_score_position(id));
  return position;
}

async function settings(){
  console.log("SETTINGS");
  console.log("1) Change N° of questions");
  console.log("2) Change N° of letters");
  console.log("3) Change N° of whitespaces");
  console.log("4) Show current settings");
  console.log("5) Main menu");
  let opt: string = prompt_sync();
  if(opt=='1') await update_settings('questions');
  else if(opt=='2') await update_settings('letters');
  else if(opt=='3') await update_settings('whitespaces');
  else if(opt=='4') show_current_settings();
  else {
    options();
    return;
  }
  console.log("press any key to go back to SETTINGS menu...");
  prompt_sync();
  settings();
}

async function update_settings(sett:string){
  console.log(`how many ${sett}?: `);
  let nValue: string = prompt_sync();
  await conf_data.update_setting(BigInt(nValue), sett);
  await get_conf();
}

function show_current_settings(){
  console.log('CURRENT SETTINGS');
  console.log(`Questions: ${conf.questions}`);
  console.log(`Letters: ${conf.letters}`);
  console.log(`Whitespaces: ${conf.whitespaces}`);
}

async function feedback(){
  console.log("FEEDBACK MENU");
  console.log("1) Top scores for current settings");
  console.log("2) Recent scores for current settings");
  console.log("3) Most errors");
  console.log("4) Most corrects");
  console.log("5) Recent errors");
  console.log("6) Recent corrects");
  console.log("7) Back to the main menu");
  let opt: string = prompt_sync();
  if(opt==="1") await show_top_scores();
  else if(opt==="2") await show_top_recents(); 
  else if(opt==="3") feedback();
  else if(opt==="4") feedback();
  else if(opt==="5") feedback();
  else if(opt==="6") feedback(); 
  else {
    options(); 
    return;
  }
  console.log("press any key to go back to FEEDBACK menu...");
  prompt_sync();
  feedback();
}

async function show_top_scores(){
  let list_similars: string = await scores_data.show_top_scores(conf.questions, conf.letters)+"";
  console.log(list_similars);
}

async function show_top_recents(){
  let list_recents: string = await scores_data.show_top_recents(conf.questions, conf.letters)+"";
  console.log(list_recents);
}

start_main();