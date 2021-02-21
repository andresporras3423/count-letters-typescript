export class Questions{
    question: string;
    correct: boolean;
    daytime: Date| null = null;
    constructor( nQuestion: string, nCorrect: boolean){
        this.question = nQuestion;
        this.correct = nCorrect;
    }
}