import Estatisticas from "./Estatisticas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
import preencherLista from "./preencherLista.js";

async function handleData() {
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );
  if (!data) return;
  const transacoes = data.map(normalizarTransacao);
  // console.log(transacoes);
  preencherTabela(transacoes);
  preencherEstatísticas(transacoes);
}
handleData();

//preenche tabela
function preencherTabela(transacoes: Transacao[]): void {
  // indicar void pq essa função não retorna NamedNodeMap, apenas para manipular o DOM e preencher coisa na tela
  const tabela = document.querySelector("#transacoes tbody");
  if (!tabela) return;

  transacoes.forEach((transacao) => {
    tabela.innerHTML += `
    <tr>
      <td>${transacao.nome}</td>
      <td>${transacao.email}</td>
      <td>R$ ${transacao.moeda}</td>
      <td>${transacao.pagamento}</td>
      <td>${transacao.status}</td>

    </tr>
    `;
  });
}

//estatísticas total
function preencherEstatísticas(transacoes: Transacao[]): void {
  const data = new Estatisticas(transacoes);
  const totalElement = document.querySelector<HTMLElement>("#total span");

  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  //estatisticas pagamento e status
  preencherLista(data.pagamento, "pagamento");
  preencherLista(data.status, "status");

  //dia com mais venda
  const diaElement = document.querySelector("#dia span");
  if (diaElement) {
    diaElement.innerText = `${data.melhorDia[0]}`;
  }

  console.log(data);
}
