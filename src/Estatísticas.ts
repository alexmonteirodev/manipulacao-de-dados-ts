export default class Estatisticas {
  private transacoes;
  total;
  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
  }

  private setTotal() {
    // no foreach o item aparecia como numer | null depois de ter feito o filtro, então criei um predicate fora, já que o TS não executa JS - filtrarValor
    const filtrado = this.transacoes.filter(filtrarValor);
    return filtrado.reduce((acc, item) => {
      return acc + item.valor;
    }, 0);

    console.log(filtrado);
  }
}
//cópia da interface alterando o type do valor:
type TransacaoValor = Transacao & { valor: number };

//predicate para verificação:
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}
