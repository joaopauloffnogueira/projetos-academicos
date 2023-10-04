
// Variaveis do Banner ==================================================

const $html = document.querySelector("html");
const $listButton = document.querySelectorAll(".app__card-button");
const $bannerImg = document.querySelector(".app__image");
const $titleBanner = document.querySelector(".app__title");
const $checkbox = document.querySelector(".toggle-checkbox");
const $startPause = document.querySelector("#start-pause");
const $textstartPause = document.querySelector("#start-pause span");
const $buttonStartPause = document.querySelector(".app__card-primary-butto-icon");
const $tempoCronometro = document.querySelector("#timer");

const $contextos = {
    "foco":{
        html: "foco",
        banner: "/imagens/foco.png",
        title: `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`,
        cronometro: 1500,
    },
    "short":{
        html: "descanso-curto",
        banner: "/imagens/descanso-curto.png",
        title: `Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!.</strong>`,
        cronometro: 900,
    },
    "long":{
        html: "descanso-longo",
        banner: "/imagens/descanso-longo.png",
        title: `Hora de voltar à superfície,<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`,
        cronometro: 300,
    }
}

// Variaveis de Musica ==================================================

const $musica = new Audio("/sons/luna-rise-part-one.mp3");
const $audioPlay = new Audio("/sons/play.wav");
const $audioPause = new Audio("/sons/pause.mp3");
const $audioBeep = new Audio("/sons/beep.mp3");

// Variaveis do Cronometro ==================================================

let $cronometroFixo = 1500;
let $cronometro = 1500;
let $tempoId = null;


// ================================================== Funções e Eventos ==================================================


// Evento de Click e Função alinhada ==================================================

$listButton.forEach(element => {
    element.addEventListener("click", (evento)=>{
        trocaContexto($contextos[evento.target.dataset.contexto], element);
    })
});
function trocaContexto(contexto, element){
    $listButton.forEach(element => {
        element.classList.remove("active");
    });
    element.classList.add("active");
    $html.setAttribute("data-contexto", contexto.html);
    $bannerImg.setAttribute("src", contexto.banner);
    $titleBanner.innerHTML = contexto.title;
    $cronometro = contexto.cronometro;
    $cronometroFixo = contexto.cronometro;
    mostrarTempo();
}


// Evento CheckBox ==================================================

$checkbox.addEventListener("change", ()=>{
    if($musica.paused){
        $musica.play();
    }else {
        $musica.pause();
    }
});

// Criação do Cronometro e Modificações no botão ==================================================

$startPause.addEventListener("click", ()=>{
    if($tempoId){
        clearInterval($tempoId);
        $tempoId = null;
        $audioPause.play();
        alteraBotao("Retornar", "/imagens/play_arrow.png");
    } else {
        tempoDecorrido();
        $audioPlay.play();
        alteraBotao("Pausar", "/imagens/pause.png");
    }
})
function iniciaCronometro(){
    if($cronometro <= 0){
        clearInterval($tempoId);
        $tempoId = null;
        $audioBeep.play();
        $cronometro = $cronometroFixo
        console.log($cronometro)
        alteraBotao("Começar", "/imagens/play_arrow.png");
        mostrarTempo();
    } else {
        $cronometro -= 1;
        mostrarTempo();
    }
}
function alteraBotao(texto, imagem) {
    $textstartPause.innerHTML = texto;
    $buttonStartPause.setAttribute("src", imagem);
}
function tempoDecorrido(){
    $tempoId = setInterval(iniciaCronometro, 1000);
}
function mostrarTempo() {
    const $tempo = new Date($cronometro * 1000);
    const $tempoFormatado = $tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    $tempoCronometro.innerHTML = `${$tempoFormatado}`;
}
mostrarTempo();



