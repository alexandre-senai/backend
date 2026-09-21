// Classe abstrata base para todos os Services
// Centraliza comportamentos comuns: log e tratamento de erro
export abstract class BaseService {

  // Método protegido: filhos herdam e usam sem reimplementar
  protected log(contexto: string, mensagem: string): void {
    const hora = new Date().toLocaleTimeString("pt-BR");
    console.log(`[${hora}] [${contexto}] ${mensagem}`);
  }

  // "never" indica que este método SEMPRE lança erro — nunca retorna
  protected erro(mensagem: string): never {
    throw new Error(mensagem);
  }
}
