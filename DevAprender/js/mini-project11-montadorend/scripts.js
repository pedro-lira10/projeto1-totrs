function local(rua,cidade,CEP) {
    this.rua = rua,
    this.cidade = cidade,
    this.CEP = CEP,
    this.exibirEndereço = function() {
        concole.log("exibirEndereço")
    }
}


const local = new local("1200",porto, 1544);
console.log(local);
