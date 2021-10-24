const pessoa = {
    nome: 'obidiel',
    idade: 80
};

for(let chave in pessoa) {
    console.log(chave);
}

const cores = ['Red','Blue','Green'];

for (let indice in cores) {
    console.log(indice,cores[indice]);
}

// for of

for(let cor of cores){
    console.log(cor);
}