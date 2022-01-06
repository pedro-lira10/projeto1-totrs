// velocidade máxima de até 70
// a cada 5km acima do limite você ganha 1 ponto
// math.floor()
// caso pontos maior que 12 -> 'carteira suspendida'

//velox(90);

//function verificarVelox(velox) {
  //  if (velox <= 90)
    //    console.log('ok');
    //else (velox >= 91)
        //console.log('passou do limite');

//}

speedy = (100);

function verificarSpeedy(speedy) {
    const veloxmax = 100;
    const kmporpoint = 5;
    if ( speedy <= veloxmax)
        console.log('na conduta');
    else {
        const pontos = (((speedy - veloxmax) /  kmporpoint));
        if ( pontos >= 12)
            console.log('Sua CNH Roudou');
        else
           console.log('pontos', pontos);
    }
}