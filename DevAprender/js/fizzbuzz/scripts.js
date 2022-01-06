// divisivel por 3 => Fizz
// divisivel por 5 => Buzz
// Divisivel poe 3 e 5 => FizzBuzz
// nâo divisivel por 3 ou 4 => entreda 
// não é um número => 'Não é um número' =>

const resultado = fizzBuzz(15);
console.log(resultado);


function fizzBuzz(entrada){
    // Abririf (entrada === '' + 'String')
    // format   return 'É Letra';
    if (typeof entrada !== 'number')
        return 'não é um número';
     if ((entrada % 3 === 0) && (entrada % 5 === 0))
        return 'FizzBuzz';
    if (entrada % 3 === 0)
        return 'Fizz';
    if (entrada % 5 === 0)
       return 'Buzz';
    
    //if (entrada !== 'String')
    //   return 'É Letra';
    return entrada;

}
