const readline = require('readline-sync');

//  Efeito de digitação
function escreverComDelay(texto, delay = 30) {
    for (let i = 0; i < texto.length; i++) {
        process.stdout.write(texto[i]);
        const inicio = Date.now();
        while (Date.now() - inicio < delay) {}
    }
    console.log();
}

//  Animação de carregamento
function animacaoCarregamento(frase, pontos = 3, tempo = 300) {
    process.stdout.write(frase);
    for (let i = 0; i < pontos; i++) {
        process.stdout.write(".");
        const inicio = Date.now();
        while (Date.now() - inicio < tempo) {}
    }
    console.log();
}
