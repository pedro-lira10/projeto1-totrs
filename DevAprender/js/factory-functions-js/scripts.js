//Javascript Aula 34 - Factory Functions (Função de Fábrica)
// camelCase um DoisTresQuayto

function criarCelular(marcaCelular,tamanhoTela,capacidadeBateria){
    return{
        marcaCelular,
        tamanhoTela,
        capacidadeBateria,
        ligar() {
            console.log("Fazendo ligação...")
        }
    }
}

//Pascal case - UmDoisTresQuatro
//function Celular(marcaCelular,tamanhoTela,capacidadeBateria) {
//    this.marcaCelular = marcaCelular,
//    this.tamanhotela = tamanhoTela,
//    this.capacidadeBateria = capacidadeBateria,
//    this.ligar = function() {
//        console.log("FAZENDO LIGAÇÃO...");
//    }
//
//}

//const celular = new Celular('asus',7.5  ,5000);
//console.log(celular);


function viagem(localDes,duraçãoT,workAway) {
    this.localDes = localDes,
    this.duraçãoT = duraçãoT,
    this.workAway = workAway,
    this.Comprar = function() {
        concole.log("Comprando Passagem")
    }
}


const viagem = new viagem("portugal",1.5, 500);
console.log(viagem);