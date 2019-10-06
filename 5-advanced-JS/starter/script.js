/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number)
 (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer 
such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor 
(Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is 
private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends 
(Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' 
instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score 
(Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel 
more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/



// keep this all code in IIFE so that data privacy is ensured if this code is used by someother programmer
// if the other programmer has same variable names, our data could be overwritten, so place in IIFE
(function(){
    
    //It is a common, not efficient way to handle final score in global variables
    // use closures instead
    //var finalScore = 0;
    
    function score(){
        var sc = 0;
        return function(correct){
            if(correct)
                sc++;
            return sc;
        }
    }

    //this is example of taking advantage of closure
    // eventhough score function is released from execution stack, keepScore function keeps track of it
    // instead of using global variable, we can use this to make score not available in global space
    var keepScore = score();

    var Question = function(question, options, correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
    
    Question.prototype.printQuestion = function(){
        
        console.log(this.question);
        for(var i=0; i< this.options.length;i++)
            console.log(i +': '+this.options[i]);
        
        // console.log(this.question + '\n 0:'+
        //     this.options[0] + '\n 1:' +
        //     this.options[1] + '\n 2:' +
        //     this.options[2]);
    }
    
    Question.prototype.checkAnswer = function(answer, keepScore){
        var parsedAnswer = parseInt(answer);
        var sc;
        if(parsedAnswer === this.correctAnswer){
            console.log('Correct Answer!');
            //finalScore++;
            sc = keepScore(true); 
        }
        else{
            console.log('Wrong answer, try again.');
            sc = keepScore(false);
        }
        
        this.showFinalScore(sc);
    };

    Question.prototype.showFinalScore = function(scr){
        console.log('Your total score is '+ scr + '\n--------------------------------');
    }
    
    // var coolestProgrammerQuest = new Question('Who is the coolest programmer?', ['Ram', 'Siva','Madhav'], 1);
    // var professionQuest = new Question('What is the best profession?', ['Doctor', 'Engineer','Teacher'], 2);
    // var handsomeQuest = new Question('Who is the most handsome man ever lived?', 
    // ['Tom Cruise', 'Hrithik Roshan', 'Dr. A.P.J. Abdul Kalam'], 2);
    
    // var questionnaire = [coolestProgrammerQuest, professionQuest, handsomeQuest];
    
    var questionnaire = [
        new Question('Who is the coolest programmer?', ['Ram', 'Siva','Madhav'], 1),
        new Question('What is the best profession?', ['Doctor', 'Engineer','Teacher'], 2),
        new Question('Who is the most handsome man ever lived?', ['Tom Cruise', 'Hrithik Roshan', 'Dr. A.P.J. Abdul Kalam'], 2)
    ];
    
    function AskQuestions() {
        var randomNum = Math.floor(Math.random()*questionnaire.length);
        var question = questionnaire[randomNum];
        question.printQuestion();
        // console.log(question.question + '\n 0:'+
        //     question.options[0] + '\n 1:' +
        //     question.options[1] + '\n 2:' +
        //     question.options[2]);
    
        var answer = window.prompt('Enter your answer (type exit if you want to stop quiz):');
    
        if(answer === 'exit'){
            console.log('Quiz stopped!');
            question.showFinalScore(keepScore(false));
            return;
        }
        
        question.checkAnswer(answer, keepScore);
        // if(answer == question.correctAnswer)
        //     console.log('Correct Answer!')
        // else
        //     console.log('Wrong answer, try again.');
        //question.showFinalScore();
        AskQuestions();
    }
    
    AskQuestions();
})();