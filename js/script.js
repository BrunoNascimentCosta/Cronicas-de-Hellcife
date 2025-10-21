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