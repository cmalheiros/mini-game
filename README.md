# mini-game
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mine game para distrair</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Quiz para testar os conhecimentos</h1>
        <div class="score-area">
            Pontuação: <span id="score">0</span>
        </div>
        <div id="quiz-area">
            <h2 id="question">Carregando pergunta...</h2>
            <div id="options" class="options-container">
                </div>
            <button id="next-button" class="button" disabled>Próxima Pergunta</button>
        </div>
        <div id="result-area" class="hidden">
            <h2>Quiz Finalizado!</h2>
            <p id="final-score"></p>
            <p id="message"></p>
            <button id="restart-button" class="button">Jogar Novamente</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
