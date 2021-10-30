let questions = [
    {
    numb: 1,
    question: "What was the first animal launched into orbit?",
    answer: "Dog",
    options: [
      "Guinea Pig",
      "Cat",
      "Dog",
      "Chimpanzee"
    ]
  },
    {
    numb: 2,
    question: "Who was the first man in space?",
    answer: "Yury Gargarin",
    options: [
      "Neil Armstrong",
      "Alexey Leonov",
      "Yury Gargarin",
      "Scott Carpenter"
    ]
  },
    {
    numb: 3,
    question: "What is the correct order of the planets from the sun?",
    answer: "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune",
    options: [ 
      "Venus, Mercury, Earth, Saturn, Mars, Jupiter, Uranus and Neptuner",
      "Venus, Mercury, Earth, Mars, Saturn, Jupiter, Uranus and Neptune",
      "Mercury, Venus, Earth, Mars, Saturn, Jupiter, Uranus and Neptune",
      "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune"
    ]
  },
    {
    numb: 4,
    question: "What percentage of the Earth's atmosphere is made up of oxygen?",
    answer: "21%",
    options: [
      "14% or under",
      "21%",
      "28%",
      "35%"
    ]
  },
    {
    numb: 5,
    question: "Complete the formula: Speed = ____/ Time",
    answer: "Distance",
    options: [
      "Mass",
      "Distance",
      "Direction",
      "Temperature"
    ]
  },
  {
    numb: 6,
    question: "In which of the four layers of Earth's atmosphere are most of our satellites in orbit?",
    answer: "Thermosphere",
    options: [
      "Tropsphere",
      "Stratosphere",
      "Mesosphere",
      "Thermosphere"
    ]
  },
  {
    numb: 7,
    question: "Which of the following terms did NASA originally want to use in reference to astronauts?",
    answer: "Mercury",
    options: [
      "Mercury",
      "Venus",
      "Aeronaut",
      "Earth"
    ]
  },
  {
    numb: 8,
    question: "How long are astronaut candidates required to tread water continuously while wearing a flight suit?",
    answer: "10 minutes",
    options: [
      "5 minutes",
      "10 minutes",
      "15 minutes",
      "20 minutes"
    ]
  },
  {
    numb: 9,
    question: "An official countdown for a shuttle launch begins at:",
    answer: "T-minus 43 hours",
    options: [
      "T-minus 43 hours",
      "T-minus 12 hours",
      "T-minus 24 hours",
      "T-minus 8 hours"
    ]
  },
  {
    numb: 10,
    question: "Which of the following phenomena cannot be observed on the surface of the Moon?",
    answer: "Twinkling of stars",
    options: [
      "Twinkling of stars",
      "Solar eclipse",
      "Motion of comets",
      "Rising and setting of the Sun"
    ]
  },
 
];
//selecting all required elements
const doc_btn = document.querySelector(".doc_btn button");
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

doc_btn.onclick = ()=>{
  window.location.href='https://github.com/'
    console.log("documentation");
}
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0); 
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult"); 
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb);
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
  let result;
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 6){ 
        let scoreTag = '<span>and Congrats!you can fly, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
        result = 1;
        console.log(result);

    }
    // else if(userScore > 1){ // if user scored more than 1
    //     let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    //     scoreText.innerHTML = scoreTag;
    // }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry you failed , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
        result = 0;
        console.log(result);

    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer;
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}