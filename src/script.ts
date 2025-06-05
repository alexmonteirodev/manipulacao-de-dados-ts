import fetchData from "./fetchData.js";

type TransacaoPagamentos = "Boleto" | "Cartão de Crédito";
type TransacaoStatus =
  | "Paga"
  | "Recusada pela operadora de cartão"
  | " Aguardando pagamento"
  | "Estornada";

interface TransacaoAPI {
  Data: string;
  Email: string;
  ID: number;
  Nome: string;
  Status: string;
  ["Valor (R$)"]: string;
  ["Cliente Novo"]: number;
  ["Forma de Pagamento"]: TransacaoPagamentos;
}

async function handleData() {
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json"
  );

  console.log(data);

  if (data) {
    data.forEach((item) => {
      console.log(item.Email);
    });
  }
}
handleData();
