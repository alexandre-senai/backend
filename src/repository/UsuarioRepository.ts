import { IUsuario } from "../model/iUsuario";
import { BaseRepository } from "./BaseRepository";

export class UsuarioRepository extends BaseRepository<IUsuario> {
  
  async validarNomeUsuario(nome: string): Promise<boolean | null> {
    return await this.executarSqlUnico(
      "SELECT EXISTS ( SELECT 1 FROM TB_USUARIO WHERE TX_NOME = $1 )",
      [nome]
    );
  }



  // ATIVIDADE
  async buscarTodos(): Promise<IUsuario[]> {
    return [];
  }
  async buscarPorId(id: number): Promise<IUsuario | null> {
    return null;
  }

  async salvar(dados: Omit<IUsuario, "id">): Promise<IUsuario> {
    const a = await this.executarSqlUnico<IUsuario>(
      "INSERT INTO TB_USUARIO ( ID_USUARIO, TX_NOME, ) VALUES ( $1,$2,$3)",
      [dados.id_usuario, dados.tx_email, dados.tx_nome],
    );


    if(!a) throw new Error ("Nao existe");

    return a;
  }

  async atualizar(
    id: number,
    dados: Partial<Omit<IUsuario, "id">>,
  ): Promise<IUsuario | null> {
    return null;
  }


  async deletar(id: number): Promise<boolean> {
    const a = await this.executarSql<IUsuario>(
      "delete from tb_usuario",
      [],
    );

    return a.length > 0;
  }
}
