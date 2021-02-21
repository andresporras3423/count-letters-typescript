export class Config_game{
    questions: number;
    letters: number;
    letters_x: number;
    whitespaces: number;
    constructor( nLetters: number,nQuestions: number, nWhitespaces: number){
          this.letters = nLetters;
          this.letters_x = Math.round((2*nLetters)**0.5);
          this.questions = nQuestions;
          this.whitespaces = nWhitespaces;
    }
}