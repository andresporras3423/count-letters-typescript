import { Config_game_data } from "./data/config_game_data";
import { Config_game } from "./classes/config_game";
let prompt_sync = require('prompt-sync')();

let conf_data: Config_game_data;
let conf: Config_game;
async function start_main(){
  conf_data  = new Config_game_data();
  conf = await conf_data.get_config_data();
  console.log("WELCOME");
  options();
};

function options(){
  console.log(`Please choose an option
              1) play
              2) setting
              3) game feedback
              4) exit`);
              let opt: string = prompt_sync();
              if(opt==="1") play_exam();
              else if(opt==="2") settings(); 
              else if(opt==="3") feedback();      
}

function play_exam(){
  let sols:  number = 0;
  let initial: Date = new Date();
  for(let i:number=0; i< conf.questions; i++){
    console.log(`Question N°${i+1}`);
    if(question()) sols++;
  }
  end_game(sols, initial);
}

function question(): boolean{
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
  if(correct) console.log("correct");
  else console.log("incorrect, the solution was "+sol);
  return correct;
}

function end_game(sols:number, initial:Date){
  let final: Date = new Date();
  let diff: number = Math.round((final.valueOf() - initial.valueOf())/1000);
  console.log(`Correct questions: ${sols}/${conf.questions}`);
  console.log(`Time: ${diff} seconds`);
  console.log(`Score: ${diff*(conf.questions-sols+1)}`);
}

function settings(){

}

function feedback(){

}

start_main();