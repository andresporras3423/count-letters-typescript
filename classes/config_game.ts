export class Config_game{
    questions: Number;
    letters: Number;
    whitespaces: Number;
    constructor(nQuestions: Number, nLetters: Number, nWhitespaces: Number){
          this.questions = nQuestions;
          this.letters = nLetters;
          this.whitespaces = nWhitespaces;
    }
}