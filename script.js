const allQuestions = [
    {
        question: "Qual desses NÃO foi um imperador romano?",
        options: ["Augusto", "Nero", "Cleópatra", "Calígula"],
        answer: "Cleópatra",
        trick: "Cleópatra foi uma rainha egípcia, não uma imperatriz romana."
    },
    {
        question: "Em que ano a Segunda Guerra Mundial terminou?",
        options: ["1942", "1945", "1918", "1950"],
        answer: "1945",
        trick: "A Primeira Guerra Mundial terminou em 1918. Cuidado para não confundir as datas!"
    },
    {
        question: "Qual banda lançou o álbum 'Thriller'?",
        options: ["Queen", "Michael Jackson", "The Beatles", "Madonna"],
        answer: "Michael Jackson",
        trick: "Embora Michael Jackson seja um artista solo, o álbum 'Thriller' é frequentemente associado a ele como se fosse uma banda, pela sua magnitude."
    },
    {
        question: "Quem pintou a 'Mona Lisa'?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci",
        trick: "Todos são artistas famosos, mas apenas um pintou a Mona Lisa. Não se deixe levar pela fama dos outros!"
    },
    {
        question: "Qual é o nome do robô que é o melhor amigo de R2-D2 em Star Wars?",
        options: ["C-3PO", "BB-8", "K-2SO", "Wall-E"],
        answer: "C-3PO",
        trick: "BB-8 e K-2SO são outros robôs famosos de Star Wars, mas C-3PO é o parceiro clássico de R2-D2."
    },
    {
        question: "Qual país construiu a Muralha da China?",
        options: ["Japão", "Índia", "China", "Coréia"],
        answer: "China",
        trick: "Pode parecer óbvio, mas algumas pegadinhas são para testar sua atenção aos detalhes mais simples!"
    },
    {
        question: "Qual é a casa de Hogwarts à qual Harry Potter pertence?",
        options: ["Sonserina", "Lufa-Lufa", "Corvinal", "Grifinória"],
        answer: "Grifinória",
        trick: "As outras casas também são importantes em Hogwarts, mas Harry sempre foi da Grifinória."
    },
    {
        question: "Qual ator interpretou o Homem de Ferro no Universo Cinematográfico Marvel?",
        options: ["Chris Evans", "Robert Downey Jr.", "Mark Ruffalo", "Chris Hemsworth"],
        answer: "Robert Downey Jr.",
        trick: "Todos são Vingadores, mas só um deles vestiu a armadura do Homem de Ferro!"
    },
    {
        question: "Qual desses elementos químicos não é um metal alcalino?",
        options: ["Lítio", "Sódio", "Potássio", "Magnésio"],
        answer: "Magnésio",
        trick: "Lítio, Sódio e Potássio são metais alcalinos; Magnésio é um metal alcalino-terroso. Fique atento às classificações!"
    },
    {
        question: "Quem escreveu 'Dom Quixote'?",
        options: ["William Shakespeare", "Miguel de Cervantes", "Machado de Assis", "Gabriel García Márquez"],
        answer: "Miguel de Cervantes",
        trick: "Grandes autores, mas apenas um criou o Cavaleiro da Triste Figura."
    },
    {
        question: "Qual é a capital do Canadá?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        answer: "Ottawa",
        trick: "Toronto e Vancouver são cidades grandes, mas Ottawa é a capital."
    },
    {
        question: "Qual personagem da Disney é conhecido por perder seu sapatinho de cristal?",
        options: ["Branca de Neve", "Pequena Sereia", "Cinderela", "Bela Adormecida"],
        answer: "Cinderela",
        trick: "Clássico dos contos de fadas, mas é bom ter certeza da princesa!"
    },
    {
        question: "Quantos planetas existem no nosso sistema solar (considerando a definição atual da União Astronômica Internacional)?",
        options: ["7", "8", "9", "10"],
        answer: "8",
        trick: "Plutão foi reclassificado! Cuidado para não cair em definições antigas."
    },
    {
        question: "Qual a cor primária que falta: Vermelho, Azul e ...?",
        options: ["Verde", "Amarelo", "Roxo", "Laranja"],
        answer: "Amarelo",
        trick: "Parece fácil, mas um momento de distração pode levar ao erro!"
    },
    {
        question: "Qual famoso detetive reside na Baker Street, 221B?",
        options: ["Hercule Poirot", "Sherlock Holmes", "Miss Marple", "Auguste Dupin"],
        answer: "Sherlock Holmes",
        trick: "Todos são detetives clássicos, mas a Baker Street é endereço de um em particular."
    }
];

let questions = []; // Array para as perguntas aleatórias
const numberOfQuestions = 6; // Define quantas perguntas serão exibidas no quiz

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const scoreSpan = document.getElementById('score');
const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');
const finalScoreElement = document.getElementById('final-score');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

// Função para embaralhar um array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Inicializa as perguntas do quiz
function initializeQuizQuestions() {
    const shuffledAllQuestions = shuffleArray([...allQuestions]); // Cria uma cópia e embaralha
    questions = shuffledAllQuestions.slice(0, numberOfQuestions); // Pega as primeiras 'numberOfQuestions'
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';
        selectedOption = null;
        nextButton.disabled = true;

        // Embaralha as opções para que a ordem não seja sempre a mesma
        const shuffledOptions = shuffleArray([...currentQuestion.options]);

        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option');
            button.addEventListener('click', () => selectOption(button, option, currentQuestion.answer));
            optionsContainer.appendChild(button);
        });
    } else {
        showResults();
    }
}

function selectOption(button, option, correctAnswer) {
    if (selectedOption === null) { // Permite selecionar apenas uma vez
        selectedOption = option;
        const allOptions = optionsContainer.querySelectorAll('.option');
        allOptions.forEach(opt => {
            opt.classList.remove('selected');
            opt.disabled = true; // Desabilita todas as opções após a seleção
        });
        button.classList.add('selected');

        if (selectedOption === correctAnswer) {
            score++;
            scoreSpan.textContent = score;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
            // Mostra a resposta correta
            allOptions.forEach(opt => {
                if (opt.textContent === correctAnswer) {
                    opt.classList.add('correct');
                }
            });
        }
        nextButton.disabled = false;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    quizArea.classList.add('hidden');
    resultArea.classList.remove('hidden');
    finalScoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;

    let message = "";
    if (score === questions.length) {
        message = "Parabéns! Você é um verdadeiro mestre do conhecimento!";
    } else if (score >= questions.length * 0.8) { // Mais de 80%
        message = "Excelente! Você tem um conhecimento incrível.";
    } else if (score >= questions.length * 0.5) { // Mais de 50%
        message = "Muito bom! Você tem um ótimo conhecimento geral.";
    } else {
        message = "Continue estudando! Há muito para aprender.";
    }
    messageElement.textContent = message;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    quizArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    initializeQuizQuestions(); // Re-inicializa as perguntas para uma nova rodada aleatória
    loadQuestion();
}

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Iniciar o quiz ao carregar a página
initializeQuizQuestions();
loadQuestion();