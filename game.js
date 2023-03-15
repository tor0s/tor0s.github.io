const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Ի՞նչ է արժութային զամբյուղը:',
        choice1: 'Տարբեր կշիռներով մի քանի արժույթների հավաքածու է,',
        choice2: 'Կոլեկտիվ արժույթի կուրսը որոշելու գործիք է',
        choice3: 'Զամբյուղ է որտեղ կան բոլոր երկրների արժույթները',
        choice4: 'Զամբյուղ որի մեջ կան տարբեր արժեթղթեր',
        answer: 1,
    },
    {
        question: 'Արժույթի ծածկագիրը __________ է, դրանք առավելհաճախ անվանվում են ____________ հապավումով',
        choice1: 'SDR XDR ',
        choice2: 'XDR SDR ',
        choice3: 'SDR IMF',
        choice4: 'SDRi SDR',
        answer: 2,
    },
    {
        question: 'SDR զամբյուղում ներառված են տարբեր արժույթներ, որոնք պետք է համապատասխանեն ',
        choice1: 'Արտահանման չափանիշին',
        choice2: 'Ազատ օգտագործման չափանիշին',
        choice3: 'Արտահանման և ազատ օգտագործման չափանիշներին',
        choice4: 'Փոխարինելիությանն չափանիշի',
        answer: 3,
    },
    {
        question: 'SDR զամբյուղի մեջ առկա արժույթ չէ',
        choice1: 'ԱՄՆ դոլար',
        choice2: 'Ճապոնական իեն',
        choice3: 'Ռուսական ռուբլի',
        choice4: 'Չինական ռենմինբի',
        answer: 3,
    },
    {
        question: '1974 թվականի հուլիսից մինչև 1980 թվականի դեկտեմբերը ընկած ժամանակահատվածում SDR զամբյուղը բաղկացած է եղել _________ արժույթներից։',
        choice1: '16',
        choice2: '5',
        choice3: '10',
        choice4: '24',
        answer: 1,
    },
    {
        question: 'Մինչև 1981 թվականը XDR-ը _______________ էր հանդիսանում և, հետևաբար նաև, վարկի ձև',
        choice1: 'պարտքային արժեթուղթ',
        choice2: 'բաժնետոմս',
        choice3: 'ֆյուչերսային պայմանագիր',
        choice4: 'չկա ճիշտ պատասխան',
        answer: 1,
    },
    {
        question: 'Արժույթների զամբյուղը որոշում է SDR- ի արժեքը։ SDR-ի արժեքը հաստատուն չէ և կարող է փոփոխության ենթարկվել ___________',
        choice1: 'SDR-ի արժեքը հաստատուն է',
        choice2: 'ամեն տարի',
        choice3: 'հինգ տարին մեկ',
        choice4: 'ամեն օր',
        answer: 4,
    },
    {
        question: 'Հատուկ փոխառության իրավունքները դրանք',
        choice1: 'փող են',
        choice2: 'պայմանագրի տեսակ է',
        choice3: 'ծառայություն է',
        choice4: 'ակտիվներ են',
        answer: 4,
    },
    {
        question: 'SDR- ի հատկացումն',
        choice1: 'Անծախս է',
        choice2: 'Ծախսատար է',
        choice3: 'Պահանջում է ներդրումեր',
        choice4: 'չկա ճիշտ պատասխան',
        answer: 1,
    },
    {
        question: 'SDR տոկոսադրույք',
        choice1: 'XDRi',
        choice2: 'SDRi',
        choice3: 'IMFi',
        choice4: 'R',
        answer: 2,
    },
    {
        question: 'SDRi-ի արժեքը որոշվում է ',
        choice1: 'ամեն շաբաթ',
        choice2: 'ամեն տարի',
        choice3: 'ամեն օր',
        choice4: 'երկու տարին մեկ',
        answer: 1,
    },
    {
        question: 'Արժութային զամբյուղի առավելությունն այն է, որ նրա մեջ առկա փոխարժեքները  անփոփոխ են մնում որոշ չափով երկարատև ժամանակահատվածում այսինքն` կախված չէ __________ փոփոխություններից:',
        choice1: 'Գնաճի',
        choice2: 'պահանջարկի ',
        choice3: 'առաջարկի ',
        choice4: 'տվյալ արժույթի առաջարկի և պահանջարկի',
        answer: 4,
    },
    {
        question: '1960 թվականին հետպատերազմյան շրջանի ականավոր վերլուծաբաններից մեկը ամերիկաբնակ բելգիացի տնտեսագետ Ռոբերտ Թրիֆինը հրատարակեց մի աշխատություն, որը կոչվում էր',
        choice1: '<<Դրամի և Դոլարի ճգնաժամը>>',
        choice2: '<<Ոսկու և արծաթի  ճգնաժամը>> ',
        choice3: '<<Ոսկու և Դոլարի ճգնաժամը>>',
        choice4: '<<ճգնաժամը>>։',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 13

startGame = () => {
     questionCounter = 0
     score = 0
     availableQuestions = [...questions]
     getNewQuestion()
}

getNewQuestion = () =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }
    questionCounter++ 
    progressText.innerText = `Հարց ${questionCounter} / ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true


}



choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'
        

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }


        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000);
    })
})

incrementScore = num =>{
    score +=num
    scoreText.innerText = score
}

startGame()
