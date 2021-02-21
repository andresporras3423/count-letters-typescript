export class Scores{
    questions: number;
    letters: number;
    seconds: number;
    corrects: number;
    daytime: Date | null = null;
    constructor( nLetters: number,nQuestions: number, nSeconds: number, nCorrects:number){
        this.questions = nQuestions;
          this.letters = nLetters;
          this.seconds = nSeconds;
          this.corrects = nCorrects;
    }
}