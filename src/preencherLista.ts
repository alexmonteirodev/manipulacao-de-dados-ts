import { CountList } from "./countBy.js";

export default function preencherLista(
  lista: CountList,
  containerId: string
): void {
  const containerElement = document.getElementById(containerId);

  if (containerElement) {
    Object.keys(lista).forEach((eachKey) => {
      containerElement.innerHTML += `<p>${eachKey}: ${lista[eachKey]}</p>`;
    });
  }
}

//função reaproveitada que preenche itens de estatisticas.pagamento e estatisticas.status

//ex:
// if (pagamentoElement) {
//   Object.keys(data.pagamento).forEach((eachKey) => {
//     pagamentoElement.innerHTML += `<p>${eachKey}: ${data.pagamento[eachKey]}</p>`;
//   });
// }
