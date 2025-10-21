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

//  Funções de batalha
function receberAtaque(forcaAtacante, vidaAlvo, defesaAlvo, defender) {
    let dano;
    if (!defender) {
        dano = Math.floor(Math.random() * (forcaAtacante + 1));
    } else {
        const reducao = forcaAtacante * (defesaAlvo / 100);
        dano = Math.max(0, Math.floor(Math.random() * forcaAtacante - reducao));
    }
    return Math.max(0, vidaAlvo - dano);
}

function fugir(alvo, indice, nomeHeroi) {
    let fuga = Math.floor(Math.random() * 2);
    if (fuga === 0) {
        escreverComDelay("Você não conseguiu fugir.");
        return false;
    } else {
        escreverComDelay(`${nomeHeroi} foi veloz o suficiente e conseguiu fugir de ${alvo[indice].nome}!`);
        return true;
    }
}

function batalha(forca, defesa, vida, nomeHeroi, alvo, indice) {
    let batalhar = true;
    let vidaHeroiAtual = vida;

    if (alvo[indice].nome === "Code-Red, o Último Dragão Ancestral") {
        escreverComDelay(`\n ${nomeHeroi} encara Code-Red, o Último Dragão Ancestral...`);
        escreverComDelay("Code-Red ruge com fúria ancestral!");
        animacaoCarregamento("Desferindo golpe inicial");
        const golpeInicial = Math.floor(alvo[indice].forca * 1.5);
        vidaHeroiAtual = Math.max(0, vidaHeroiAtual - golpeInicial);
        escreverComDelay(`Code-Red causa ${golpeInicial} de dano! Vida de ${nomeHeroi}: ${vidaHeroiAtual}`);
        if (vidaHeroiAtual <= 0) {
            escreverComDelay(`💀 ${nomeHeroi} foi destruído pelo golpe inicial de Zarion...`);
            return "morto";
        } else {
            escreverComDelay(`${nomeHeroi} sobrevive por milagre... mas está gravemente ferido.`);
        }
    }

    while (batalhar) {
        escreverComDelay(`\nVocê está batalhando com ${alvo[indice].nome}, o que fará?`);
        console.log("[1] - Atacar");
        console.log("[2] - Fugir");
        console.log("[3] - Defender");

        const escolha = parseInt(readline.question("Escolha: "));

        if (escolha === 1) {
            animacaoCarregamento("Você prepara seu ataque");
            escreverComDelay(`Você atacou ${alvo[indice].nome}!`);
            alvo[indice].vida = receberAtaque(forca, alvo[indice].vida, alvo[indice].defesa, false);
            escreverComDelay(`${alvo[indice].nome} está com ${alvo[indice].vida} pontos de vida.`);

            if (alvo[indice].vida <= 0) {
                escreverComDelay(`Você derrotou ${alvo[indice].nome}!`);
                batalhar = false;
                break;
            }

            vidaHeroiAtual = receberAtaque(alvo[indice].forca, vidaHeroiAtual, defesa, false);
            escreverComDelay(`${nomeHeroi} está com ${vidaHeroiAtual} pontos de vida.`);

            if (vidaHeroiAtual <= 0) {
                escreverComDelay(`${nomeHeroi} foi derrotado por ${alvo[indice].nome}...`);
                batalhar = false;
                return "morto";
            }

        } else if (escolha === 2) {
            if (alvo[indice].nome === "Code-Red, o Último Dragão Ancestral") {
                escreverComDelay(`\nCode-Red não permite fuga!`);
                animacaoCarregamento("Desferindo golpe final");
                const golpeFinal = alvo[indice].forca * 3;
                vidaHeroiAtual = Math.max(0, vidaHeroiAtual - golpeFinal);
                escreverComDelay(` Code-Red causa ${golpeFinal} de dano! Vida de ${nomeHeroi}: ${vidaHeroiAtual}`);
                escreverComDelay(` ${nomeHeroi} foi destruído ao tentar fugir de Zarion...`);
                batalhar = false;
                return "morto";
            } else {
                if (fugir(alvo, indice, nomeHeroi)) {
                    batalhar = false;
                    break;
                } else {
                    escreverComDelay(`${alvo[indice].nome} impede sua fuga e contra-ataca!`);
                    vidaHeroiAtual = receberAtaque(alvo[indice].forca, vidaHeroiAtual, defesa, false);
                    escreverComDelay(`${alvo[indice].nome} ataca! Vida de ${nomeHeroi}: ${vidaHeroiAtual}`);
                    if (vidaHeroiAtual <= 0) {
                        escreverComDelay(` ${nomeHeroi} foi derrotado ao tentar fugir...`);
                        batalhar = false;
                        return "morto";
                    }
                }
            }

        } else if (escolha === 3) {
            escreverComDelay(`${nomeHeroi} se prepara para se defender...`);
            vidaHeroiAtual = receberAtaque(alvo[indice].forca, vidaHeroiAtual, defesa, true);
            escreverComDelay(`${alvo[indice].nome} ataca! Vida de ${nomeHeroi}: ${vidaHeroiAtual}`);

            if (vidaHeroiAtual <= 0) {
                escreverComDelay(`${nomeHeroi} foi derrotado mesmo tentando se defender...`);
                batalhar = false;
                return "morto";
            } else {
                const cura = Math.floor(Math.random() * 6) + 5; // cura entre 5 e 10
                vidaHeroiAtual += cura;
                escreverComDelay(`${nomeHeroi} se recupera durante a defesa e ganha ${cura} pontos de vida.`);
                escreverComDelay(` Vida atual de ${nomeHeroi}: ${vidaHeroiAtual}`);
            }

        } else {
            escreverComDelay("Opção inválida! Escolha uma opção que faça sentido.\n");
        }
    }
}

//  Introdução
let classe, vida, forca, defesa;

escreverComDelay(`Há muito tempo, no coração do Reino de Hellcife...`);
escreverComDelay(`O caos tomou conta após o desaparecimento de um grande mestre dos magos Fellype Cross!`);
escreverComDelay(`Dizem que ele foi capturado por um terrível Dragão das Sombras e levado para as montanhas de Igarasselva...`);
escreverComDelay(`Agora, o destino do Hellcife depende de um novo herói que ouse enfrentá-lo.`);
escreverComDelay(`E esse herói... é você?!`);

const nomeHeroi = readline.question("Qual é o nome do seu herói? ");

const classeHeroi = readline.question("Digite o número da classe:\n[1] - Guerreiro\n[2] - Mago\n[3] - Aventureiro: ");
switch (classeHeroi) {
    case '1': classe = "Guerreiro"; vida = 120; forca = 15; defesa = 10; break;
    case '2': classe = "Mago"; vida = 80; forca = 25; defesa = 5; break;
    case '3': classe = "Aventureiro"; vida = 100; forca = 10; defesa = 5; break;
}

escreverComDelay(`Olá, ${nomeHeroi}, você escolheu a classe: ${classe}!\nSua aventura começa agora...\n`);

let jornadaIniciar = false;
while (!jornadaIniciar) {
    const inicio = readline.question(`\nDeseja partir agora para as ruínas da PE-XV?\n[S] - Sim\n[N] - Ainda não: `).toLowerCase();
    if (inicio === 's') {
        jornadaIniciar = true;
        escreverComDelay(`\nCom determinação nos olhos, ${nomeHeroi} parte rumo às ruínas da PE-XV.`);
    } else {
        escreverComDelay(`\n${nomeHeroi} decide aguardar um pouco mais...`);
    }
}