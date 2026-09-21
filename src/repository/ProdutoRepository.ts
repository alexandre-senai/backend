import { ProdutoComIdInterface } from "../interfaces/ProdutoInterface";
import { BaseRepository } from "./BaseRepository";

// Herança: ProdutoRepository estende BaseRepository<ProdutoComIdInterface>
// Polimorfismo: implementa o mesmo contrato que UsuarioRepository,
// mas com comportamento diferente para o tipo Produto
export class ProdutoRepository extends BaseRepository<ProdutoComIdInterface> {

  async buscarTodos(): Promise<ProdutoComIdInterface[]> {
    return this.executarQuery("SELECT id, descricao, valor FROM tb_produto");
  }

  async buscarPorId(id: number): Promise<ProdutoComIdInterface | null> {
    const rows = await this.executarQuery(
      "SELECT id, descricao, valor FROM tb_produto WHERE id = $1",
      [id]
    );
    return rows[0] ?? null;
  }

  // Método específico de Produto — só existe aqui
  async buscarPorDescricao(descricao: string): Promise<ProdutoComIdInterface[]> {
    return this.executarQuery(
      "SELECT id, descricao, valor FROM tb_produto WHERE descricao ILIKE $1",
      [`%${descricao}%`]
    );
  }

  async salvar(descricao: string, valor: number): Promise<ProdutoComIdInterface> {
    const rows = await this.executarQuery(
      "INSERT INTO tb_produto (descricao, valor) VALUES ($1, $2) RETURNING *",
      [descricao, valor]
    );
    return rows[0];
  }
}
