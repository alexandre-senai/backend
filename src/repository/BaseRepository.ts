import { bancoDados } from "../database/pool";

// Classe abstrata — define o contrato que todo Repository deve cumprir
// T representa o tipo de entidade (Produto, Usuario, etc.)
export abstract class BaseRepository<T> {

  // Métodos abstratos: cada filho OBRIGATORIAMENTE implementa os seus
  abstract buscarTodos(): Promise<T[]>;
  abstract buscarPorId(id: number): Promise<T | null>;

  // Método protegido compartilhado: filhos herdam e reutilizam
  // sem precisar reimplementar a lógica de banco de dados
  protected async executarQuery(sql: string, params: unknown[] = []): Promise<T[]> {
    const { rows } = await bancoDados.query(sql, params);
    return rows as T[];
  }
}
