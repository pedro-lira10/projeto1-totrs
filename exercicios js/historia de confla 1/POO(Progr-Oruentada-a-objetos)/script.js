class animal {
    constructor(especie,edad,color){
    this.especie = especie;
    this.edad = edad;
    this.color = color;
    this.info = `Soy ${this.especie}, tengo ${this.edad} años y soy de color ${this.color}`;
  }
  verInfo() {
    document.write(this.info + "<br>")
  }
}

let perro = new animal("perro",5,"marrón");
let gato = new animal("gato",2,"negro");
let pajaro = new animal("pajaro",1,"verde");

//document.write(perro.info + "<br>")
//document.write(gato.info + "<br>")


perro.verInfo();
gato.verInfo();
pajaro.verInfo();


//-----------POO ABSTRACCIÓN--------------------------

