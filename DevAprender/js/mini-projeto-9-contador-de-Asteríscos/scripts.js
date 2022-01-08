// divisivel por 3 => Fizz
// divisivel por 5 => Buzz

exibirAsteriscos(10);

function exibirAsteriscos(linhas){
//     let padra = '';
//     for(let linha = 1; linha <= linhas; linha++){
//         padrao += '*';
//         console.log(padrao);
//}
    for(let linha = 1; linha <= linhas; linha++){
        let padrao = '';
        for(let i = 0; 1 < linha; i++){
            padrao += '*';
        }
        console.log(padrao);
    }
}