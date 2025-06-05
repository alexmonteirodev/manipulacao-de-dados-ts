import countBy from "./countBy.js";

export default class Estatisticas {
  private transacoes;
  total;
  pagamento;
  status;
  semana;
  melhorDia;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
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

  //definir semana para calcular melhor dia:
  private setSemana() {
    const semana = {
      ["Domingo"]: 0,
      ["Segunda-Feira"]: 0,
      ["Terça-Feira"]: 0,
      ["Quarta-Feira"]: 0,
      ["Quinta-Feira"]: 0,
      ["Sexta-Feira"]: 0,
      ["Sábado"]: 0,
    };
    for (let i = 0; i < this.transacoes.length; i++) {
      const day = this.transacoes[i].data.getDay();

      if (day === 0) semana["Domingo"] += 1;
      if (day === 1) semana["Segunda-Feira"] += 1;
      if (day === 2) semana["Terça-Feira"] += 1;
      if (day === 3) semana["Quarta-Feira"] += 1;
      if (day === 4) semana["Quinta-Feira"] += 1;
      if (day === 5) semana["Sexta-Feira"] += 1;
      if (day === 6) semana["Sábado"] += 1;
    }
    return semana;
  }

  //definir melhor dia:
  private setMelhorDia() {
    const semanaArr = Object.entries(this.semana).sort((a, b) => {
      return b[1] - a[1];
    });
    return semanaArr[0];
  }
}

//cópia da interface alterando o type do valor:
type TransacaoValor = Transacao & { valor: number };

//predicate para verificação:
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}
