import countBy from "./countBy.js";

export default class Estatisticas {
  private transacoes;
  total;
  pagamento;
  status;
  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
  }

  //definir Total:
  private setTotal() {
    // no foreach o item aparecia como numer | null depois de ter feito o filtro, então criei um predicate fora, já que o TS não executa JS - filtrarValor
    const filtrado = this.transacoes.filter(filtrarValor);
    return filtrado.reduce((acc, item) => {
      return acc + item.valor;
    }, 0);
  }

  // definir pagamento:
  private setPagamento() {
    return countBy(this.transacoes.map(({ pagamento }) => pagamento));
  }

  //definir status:
  private setStatus() {
    return countBy(this.transacoes.map(({ status }) => status));
  }
}

//cópia da interface alterando o type do valor:
type TransacaoValor = Transacao & { valor: number };

//predicate para verificação:
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}
