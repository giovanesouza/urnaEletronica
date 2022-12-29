// VARIÁVEIS DE CONTROLE DE INTERFACE

let seuVotoPara = document.querySelector('.d-1-1 span');

// Variável para modificar o cargo
let cargo = document.querySelector('.d-1-2 span');

// Números da tela
let numeros = document.querySelector('.d-1-3');

// Pega as informações do candidato, partido...
let descricao = document.querySelector('.d-1-4');

// Área com instruções
let aviso = document.querySelector('.d-2');

// Foto candidato
let lateral = document.querySelector('.d-1-right');



// VARIÁVEIS DE CONTROLE DE AMBIENTE

let etapaAtual = 0; // Indica o índice do array que inicia a votação

let numero = ''; // Representa os número a serem digitados

let votoBranco = true; // Utilizada para VOTOS em BRANCO

let votos = []; // Armazena os votos


// Limpa a tela e pega as informações da ETAPA atual e coloca na tela
function comecarEtapa() {

    let etapa = etapas[etapaAtual]; // Acessa o array etapas

    let numeroHtml = ''; // Representa a quantidade de digitos a serem digitados
    numero = ''; // Reseta números digitados

    votoBranco = false; // Voto em branco fica como FALSE

    // Define a quantidade de campos para digitar os números conforme o cargo
    for (let i = 0; i < etapa.numeros; i++) {

        // Quando i = 0, insere a classe PISCA para inserção de número
        if (i === 0) {
            numeroHtml += `<div class="numero pisca"></div>`;

        } else {
            numeroHtml += `<div class="numero"></div>`;
        }

    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo; // Informa o cargo a ser votado
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml; // Define a quantidade de digitos a serem digitados conforme o cargo

}


// Esta função é executada SEMPRE que ouver uma ação
function atualizaInterface() {
    let etapa = etapas[etapaAtual]; // Acessa o array etapas

    // BUSCA O CANDIDATO
    let candidato = etapa.candidatos.filter((item) => {
        // Função recebe todos os candidatos (item)

        // VERIFICA se o número digitado confere com algum dos candidatos
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }

    });

    // Caso encontre algum candidato
    if (candidato.length > 0) {
        candidato = candidato[0];

        // EXIBE INFORMAÇÕES DO CANDIDATO NA TELA
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} </br>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';


        let fotosHtml = ''; // FOTOS do candidato

        // Percorre as fotos do candidato
        for (let i in candidato.fotos) {

            // EXIBE A FOTO CONFORME O TAMANHO
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;

            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }



        }

        lateral.innerHTML = fotosHtml;



        // CASO NÃO ENCONTRE UM CANDIDATO
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`;
    }

    // console.log('Candidato ', candidato); // Exibe os dados no console


}




// FUNÇÃO PARA PEGAR OS NÚMEROS DIGITADOS (BOTÕES)
function clicou(n) {
    // console.log(`clicou em ${n}`);

    let elNumero = document.querySelector('.numero.pisca');

    // Se houver algum campo de número piscando, permite a inserção de número
    if (elNumero !== null) {
        elNumero.innerHTML = n;

        numero = `${numero}${n}`; // Armazena os números digitados na variável numero

        elNumero.classList.remove('pisca'); // Remove a class pisca do campo que acabou de ser inserido valor

        // Verifica se há um próximo elemento de número. Se existir, add a class, SENÃO, indica que já preencheu o ÚLTIMO número
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca'); // Acessa o próximo campo de número e adiciona a classe PISCA

        } else {
            atualizaInterface(); // Verifica o número digitado, se há candidato com a numeração digitada e mostra as informações na tela
        }

    }
}


function branco() {

    // Verifica se não houve digitação de números
    if (numero === '') {

        votoBranco = true; // Ao clicar em voto branco ele fica com TRUE

        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO EM BRANCO</div>`;

    } else {
        alert('Para votar em BRANCO não pode ter digitado nenhum!')
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {

    let etapa = etapas[etapaAtual]; // Acessa o array etapas

    let votoConfirmado = false; // Utilizado para avançar p/ próximo cargo

    if (votoBranco === true) {

        votoConfirmado = true;

        // SALVA O VOTO BRANCO NA VARIÁVEL VOTOS
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });

        console.log('Confirmando como BRANCO');

        // Se o total de números digitados for = ao total de número do referente ao cargo
    } else if (numero.length === etapa.numeros) {
        
        votoConfirmado = true;
        // SALVA O VOTO DE CANDIDATO REAL NA VARIÁVEL VOTOS
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });

        console.log('Confirmando como ' + numero);
    }


    // VERIFICA SE O VOTO ESTÁ CONFIRMADO para ir para PRÓXIMA ETAPA
    if (votoConfirmado) {
        etapaAtual++; // Avança para próxima etapa

        // SE houver próxima etapa - recomeça etapa com novo candidato. SENÃO, finaliza a votação.
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();


        } else {
            // ENCERRA VOTAÇÃO
            document.querySelector('.tela').innerHTML = `<div class="aviso-gigante pisca">FIM</div>`;

            console.log(votos); // Exibe os votos no console
        }


    }


}

comecarEtapa();