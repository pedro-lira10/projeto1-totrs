//  while
//let num = 0;

//while (num <= 9) {
    
//    num++;
//    document.write( num + "<br>")
////
//}


// # break
//let numero = -2;

//while(numero < 30) {
    //numero++;
    //document.write(numero);
//    if (numero == 5) {
//        break;
//    }
    
//    }

//document.write('fin')


// # do .. while

//let numero = 0;


//do{
  //  document.write(numero + "<br>");

    //numero++;
//}

//while(numero > 6)


// # for

//declaramos         mais detalhes   -declarar e inicializar
//inicializamos                      -condicão 
//iteramos                           -aumento - decremento 

//let numero = 0;

//for (numero<150) {
    //numero++;
  //  document.write(numero);
    //if (numero == 10) {
   //     break;
    //}
//}

//document.write('fin')



//for (let i = 6; i>= 1; i--) {

//    document.write(i)
//}

//for(let i = 0; i < 20; i++) {

//if (i == 12);
//document.write(i + "<br>");
//}

// # continue

//for(let i = 0; i < 10; i++) {

//if (i == 7) {
//    continue;
//}
//document.write(i + "<br>");

//} 

// # sentencia for in  (Devulve indice)

//let animales = ["dog","ouriso","greeninja"];

//for (animal in animales) {
//    document.write(animal + "<br>");
//}
//document.write("<br>");

// # sentencia fro of (duvuelve valor)

//for (animal of animales) {
//    document.write(animal + "<br>");
//}

// # label

fox1 = ["shaine","roberta","Laylla"];
fox2 = ["natasia", "sky",fox1];

for (let fox in fox2) {
    if (fox == 2) {
        for (let fox of fox1){
            document.write(fox + "<br>");
        }
        }else {
            document.write(fox2[fox] + "<br>");
        }
    }


