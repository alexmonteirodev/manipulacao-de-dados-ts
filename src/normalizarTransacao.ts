import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";

declare global {
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
    Status: TransacaoStatus;
    ["Valor (R$)"]: string;
    ["Cliente Novo"]: number;
    ["Forma de Pagamento"]: TransacaoPagamentos;
  }

  interface Transacao {
    data: string;
    email: string;
    id: number;
    nome: string;
    status: TransacaoStatus;
    moeda: string;
    valor: number | null;
    pagamento: TransacaoPagamentos;
    novo: boolean;
  }
}

export default function normalizarTransacao(transacao: TransacaoAPI) {
  return {
    data: stringToDate(transacao.Data),
    email: transacao.Email,
    id: transacao.ID,
    nome: transacao.Nome,
    status: transacao.Status,
    moeda: moedaParaNumero(transacao["Valor (R$)"]),
    valor: 0,
    pagamento: transacao["Forma de Pagamento"],
    novo: Boolean(transacao["Cliente Novo"]),
  };
}
