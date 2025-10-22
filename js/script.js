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

// Inimigos
const inimigos = [
    { nome: "Isalyn, a Visionária das Ideia", vida: 40, forca: 10, defesa: 5 },
    { nome: "Camilis, a Teredora de Emoções", vida: 60, forca: 12, defesa: 8 },
    { nome: "Brunor, o Guardião da Ordem", vida: 50, forca: 14, defesa: 6 },
    { nome: "Daven, o Observador Silencioso", vida: 70, forca: 16, defesa: 10 },
    { nome: "Rafara, a Comandante do Progresso", vida: 80, forca: 18, defesa: 12 },
    { nome: "Stefira, a Guardiã Serena", vida: 100, forca: 20, defesa: 15 },
    { nome: "Code-Red, o Último Dragão Ancestral", vida: 120, forca: 22, defesa: 18 }
];
// Combate contra os inimigos
let heroiVivo = true;

for (let i = 0; i < inimigos.length && heroiVivo; i++) {
    
    //  Isalyn
    if (inimigos[i].nome === "Isalyn, a Visionária das Ideia") {
        //narração 
        escreverComDelay(`\nApós deixar as ruínas da PE-XV, ${nomeHeroi} segue por uma trilha coberta de névoa que parece viva.`);
        escreverComDelay("Cada passo ecoa como se o mundo estivesse ouvindo.");
        escreverComDelay("Ao final da trilha, uma porta de pedra se abre sozinha, revelando um salão distorcido pela imaginação.");
        //dialogo de ambiente 
        escreverComDelay("Você adentra um salão coberto por névoa ilusória.");
        escreverComDelay("As paredes parecem se mover, sussurrando ideias que não são suas.");
        escreverComDelay("No centro, Isalyn surge como um pensamento distorcido, moldado pela própria imaginação.");
    }

     //  Camilis
    if (inimigos[i].nome === "Camilis, a Teredora de Emoções") {
        //narração
        escreverComDelay(`\nDeixando para trás o salão ilusório, ${nomeHeroi} atravessa um bosque onde as árvores choram em silêncio.`);
        escreverComDelay("O ar é pesado, e memórias esquecidas parecem sussurrar entre os galhos.");
        escreverComDelay("No centro do bosque, um jardim encantado floresce em meio à dor.");
        //dialogo de ambiente 
        escreverComDelay("Você chega a um jardim abandonado, onde flores murchas exalam tristeza.");
        escreverComDelay("O ar é pesado com lembranças esquecidas e sentimentos não resolvidos.");
        escreverComDelay("Camilis aparece entre os espinhos, sorrindo com melancolia e olhos que choram sem lágrimas.");
    }

    //  Brunor
    if (inimigos[i].nome === "Brunor, o Guardião da Ordem") {
        //narração
        escreverComDelay(`\n Após vencer Camilis, ${nomeHeroi} encontra uma escadaria de mármore que leva a um terminal abandonado chamado Pelópidas.`);
        escreverComDelay("Runas brilham nas paredes, e o silêncio é absoluto.");
        escreverComDelay("Ali, a ordem é lei — e qualquer desvio será julgado sem piedade.");
        //dialogo de ambiente 
        escreverComDelay(" Um portão de pedra se ergue diante de você, marcado por runas de disciplina.");
        escreverComDelay("O chão é simétrico, os ventos seguem padrões exatos.");
        escreverComDelay("Brunor está parado como uma estátua viva, pronto para julgar qualquer desvio da ordem.");
    }

    //  Daven
    if (inimigos[i].nome === "Daven, o Observador Silencioso") {
        //narração
        escreverComDelay(`\nDeixando o terminal, ${nomeHeroi} desce por uma fenda estreita até uma caverna profunda.`);
        escreverComDelay("A escuridão é total, e o som do próprio coração parece alto demais.");
        escreverComDelay("No centro da caverna, olhos brilham na escuridão, observando cada movimento.");
        //dialogo de ambiente 
        escreverComDelay("Você entra na antiga usina de Abreu e Lima, onde o silêncio é absoluto.");
        escreverComDelay("Som nenhum ecoa, mas você sente que está sendo observado.");
        escreverComDelay("Daven surge das sombras, como se já soubesse seu próximo movimento.");
    }

    //  Rafara
    if (inimigos[i].nome === "Rafara, a Comandante do Progresso") {
        //narração
        escreverComDelay(`\n Após escapar das sombras, ${nomeHeroi} emerge de um engenho subterrâneo cheio de engrenagens e vapor.`);
        escreverComDelay("O chão vibra com energia, e o tempo parece correr mais rápido ali.");
        escreverComDelay("No centro, máquinas se abrem para revelar uma comandante fria e precisa.");
        //dialogo de ambiente 
        escreverComDelay(" Você pisa em um chão metálico, com engrenagens girando ao redor.");
        escreverComDelay("Tubos fumegantes e cristais energizados iluminam o caminho com luz fria.");
        escreverComDelay("Rafara aparece com armaduras tecnológicas e olhos calculistas, pronta para otimizar sua destruição.");
    }

    //  Stefira
    if (inimigos[i].nome === "Stefira, a Guardiã Serena") {
        //narração
        escreverComDelay(`\n Após vencer Rafa, ${nomeHeroi} atravessa um portal de Cruz de Rebolça  e se vê em um campo sereno.`);
        escreverComDelay("Flores brancas dançam ao vento, e o som de água corrente acalma a alma.");
        escreverComDelay("Mas a paz aqui é protegida com força e sabedoria.");
        //dialogo de ambiente 
        escreverComDelay(" Um campo de flores brancas se estende diante de você, embalado por uma brisa suave.");
        escreverComDelay("O som de água corrente e pássaros distantes cria uma paz inquietante.");
        escreverComDelay("Stefira está no centro, em meditação, mas seus olhos revelam que ela está pronta para proteger o equilíbrio.");
    }
}
 // Code-Red
    if (inimigos[i].nome === "Code-Red, o Último Dragão Ancestral") {
        //narração
        escreverComDelay(`\n Com o campo atrás de si, ${nomeHeroi} chega ao coração das ruínas de Igarasselva.`);
        escreverComDelay("O chão treme, o céu escurece, e uma cratera se abre revelando fogo e fúria.");
        escreverComDelay("Code-Red desperta, e o mundo prende a respiração.");
        escreverComDelay("A batalha final se aproxima... mas o destino ainda guarda uma última surpresa.");
        escreverComDelay(" Uma luz dourada rasga os céus. O Mestre dos Magos, enfraquecido mas determinado, aparece flutuando sobre a cratera.");
        escreverComDelay(`“Você chegou até aqui, ${nomeHeroi}. Mas Zarion não cairá por força comum.”`);
        escreverComDelay(" Ele ergue seu cajado e canaliza sua essência mágica diretamente para o herói.");
        escreverComDelay("“Receba meu último dom. Que a sabedoria dos antigos corra em suas veias.”");
        escreverComDelay("Você foi fortalecido com magia ancestral!");
        //dialo de ambiente
        escreverComDelay("As ruínas tremem. O céu escurece. O ar se torna denso como fumaça.");
        escreverComDelay("Você desce até uma cratera ancestral, onde o chão pulsa com energia dracônica.");
        escreverComDelay("Zarion emerge das profundezas, envolto em chamas negras e ódio milenar.");

        vida += 40;
        forca += 15;
        defesa += 10;

        escreverComDelay(` Atributos finais ➜ Vida: ${vida} | Força: ${forca} | Defesa: ${defesa}`);
        //Batalha 
          escreverComDelay(`\n ${nomeHeroi} enfrenta ${inimigos[i].nome}!`);
          const resultado = batalha(forca, defesa, vida, nomeHeroi, inimigos, i);
      
          if (resultado === "morto") {
              heroiVivo = false;
              escreverComDelay(`\n A jornada de ${nomeHeroi} chegou ao fim...`);
          }
          //  Evolução após o 5º inimigo
          if (i === 4 && heroiVivo) {
              escreverComDelay(`\nApós derrotar ${inimigos[i].nome}, ${nomeHeroi} sente uma energia ancestral fluindo em seu corpo.`);
              escreverComDelay("Você foi fortalecido pela jornada!");
              vida += 20;
              forca += 5;
              defesa += 5;
              escreverComDelay(` Novos atributos → Vida: ${vida} | Força: ${forca} | Defesa: ${defesa}`);
          }
    }
    
