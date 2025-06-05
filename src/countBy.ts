export interface CountList {
  [key: string]: number;
}

export default function countBy(arr: (string | number)[]) {
  return arr.reduce((acc: CountList, item) => {
    if (acc[item]) {
      acc[item] += 1;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});
}

//explicação:

// o reduce retorna um obj, no formato da interface do acc, e o proprio reduce indentifica is nomes e coloca como nome por conta da interface, ex:

// const obj = {
//   ["catao de credito"]: 30,
// };
// obj["catao de credito"] = 50;
// console.log(obj["catao de credito"]);

// o if serve para verificar o primeiro valor, porque na primeira interação, sai algo como: acc['Boleto'] = acc['Boleto'] +1, e acc['Boleto'] +1 = NaN e o if verifica que caso seja essa iteração para usar o valor de 1 ficando 1 + 1.

//obs: o nome countBy porque essa função é famosa e é o nome utilizado pelo lodash.
//obs2: resolvi criar essa function e exportar porque vou usar ela mais de uma vez.
