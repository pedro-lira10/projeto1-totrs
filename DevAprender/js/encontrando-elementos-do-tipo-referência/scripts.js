// JV AUla 55 encontrando elementos (tipos referência)

const box = [
    {id:1 , number: 20},
    {id:2 , number: 25},
    {id:3 , number: 05},
    {id:4 , number: 51},
    {id:5 , number: 60},
    {id:6 , number: 50},
    {id:7 , number: 60},
]

const giga = box.find(function(giga){
    return giga.number === 50 ;
})

console.log(giga);

// JV AUla 55 encontrando elementos (tipos referência)

const cc = [
    {id:1 , nome: 'w'},
    {id:2 , nome: 'y'},
    {id:3 , number: 05},
    {id:4 , number: 51},
    {id:5 , number: 60},
    {id:6 , number: 50},
    {id:7 , number: 60},
]

const power = cc.find(function(power){
    return power.nome === 'y' ;
})

console.log(power);


const fome = [
    {id:1 , nome: 'z'},
    {id:1 , nome: 'h'},
]

console.log(food.find(food =>  food.nome === 'h'));



