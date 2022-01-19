//let num = 5
//let num2 = 7 

//function max (num1,num2){
//    if (num > num2)
//    return num1
//}

//console.log(max)

let valorMaior = max(90,150,500,850, 30);
console.log(valorMaior);
 

function max (num1,num2,num3,num4){
    if (num1 > num2)
    if (num2 > num3)
    if (num3 > num4)
        return num1
    else return num3;
}



