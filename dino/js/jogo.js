console.log("Início do Jogo");

//Objeto Dinossauro conectado com o HTMl
const dino = document.querySelector('.dino');

//Variáveis de cotrole
let dinoPositionY = 0;
let cactoPositionX = 1000;
let estaPulando = false;

//Escutando a tecla espaço
document.addEventListener('keydown', (event)=>{
    //console.log(event.code);
    if(event.code === 'Space'){
        if(!estaPulando) //Se não está pulando
            pular();
    }
});

function pular() {
    
    let intervaloPulo = setInterval(()=>{
        estaPulando = true;
        if(dinoPositionY >= 250) {
            console.log('Pulou');
            clearInterval(intervaloPulo);
            let intervaloQueda = setInterval(()=>{
                if(dinoPositionY <= 0) {
                    console.log('Caiu');
                    estaPulando = false;
                    clearInterval(intervaloQueda);
                } else {
                    dinoPositionY -=20;
                    dino.style.bottom = dinoPositionY + 'px';
                }
            }, 20);
        } else {
            dinoPositionY += 20;
            dino.style.bottom = dinoPositionY + 'px';
        }
    }, 20);
}

//Conectar com o background 
const background = document.querySelector('.background');

function criarCacto() {
    cactoPositionX = 350;
    //criação do elemento Cacto
    const cacto = document.createElement('div');
    let tempoRandom = Math.random() * 6000 + 100;
    //adicionando classe ao cacto
    cacto.classList.add('cacto');
    cacto.style.left = cactoPositionX + 'px';

    background.appendChild(cacto);

    let intervaloEsquerda = setInterval(()=>{
        if(cactoPositionX <= -60){
            clearInterval(intervaloEsquerda);
            background.removeChild(cacto);
        } else if(cactoPositionX >0 && cactoPositionX <= 60 && dinoPositionY <= 60) {
            clearTimeout(tempoCacto);
            document.body.innerHTML = '<h1> Fim de Jogo </h1>';
        } 
        else {
            cactoPositionX -= 10;
            cacto.style.left = cactoPositionX + 'px';            
        }
    },20); //tempo de 20ms que arrasta o cacto

    let tempoCacto = setTimeout(criarCacto, tempoRandom);
}
//chamando a função quando inicia o jogo
criarCacto();