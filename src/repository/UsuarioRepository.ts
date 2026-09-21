import { IUsuario } from "../model/iUsuario";
import { BaseRepository } from "./BaseRepository";

export class UsuarioRepository extends BaseRepository<IUsuario> {

  async buscarTodos(): Promise<IUsuario[]> {
    return this.executarSql(
      "SELECT id, email, nome FROM tb_usuario ORDER BY id"
    );
  }

  async buscarPorId(id: number): Promise<IUsuario | null> {
    return this.executarSqlUnico(
      "SELECT id, email, nome FROM tb_usuario WHERE id = $1",
      [id]
    );
  }

  async salvar(dados: Omit<IUsuario, "id">): Promise<IUsuario> {
    const resultado = await this.executarSqlUnico<IUsuario>(
      "INSERT INTO tb_usuario (email, senha, nome) VALUES ($1, $2, $3) RETURNING id, email, nome",
      [dados.email, dados.senha, dados.nome]
    );
    if (!resultado) throw new Error("Falha ao inserir usuário");
    return resultado;
  }

  async atualizar(id: number, dados: Partial<Omit<IUsuario, "id">>): Promise<IUsuario | null> {
    const campos: string[] = [];
    const valores: unknown[] = [];
    let idx = 1;

    if (dados.email !== undefined) { campos.push(`email = $${idx++}`); valores.push(dados.email); }
    if (dados.nome  !== undefined) { campos.push(`nome = $${idx++}`);  valores.push(dados.nome); }
    if (dados.senha !== undefined) { campos.push(`senha = $${idx++}`); valores.push(dados.senha); }

    if (campos.length === 0) return this.buscarPorId(id);

    valores.push(id);
    return this.executarSqlUnico<IUsuario>(
      `UPDATE tb_usuario SET ${campos.join(", ")} WHERE id = $${idx} RETURNING id, email, nome`,
      valores
    );
  }

  async deletar(id: number): Promise<boolean> {
    const resultado = await this.executarSql<{ id: number }>(
      "DELETE FROM tb_usuario WHERE id = $1 RETURNING id",
      [id]
    );
    return resultado.length > 0;
  }

  // Método extra — não existe na interface base
  async buscarPorEmail(email: string): Promise<IUsuario | null> {
    return this.executarSqlUnico(
      "SELECT id, email, senha, nome FROM tb_usuario WHERE email = $1",
      [email]
    );
  }
}
