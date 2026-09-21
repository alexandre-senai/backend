import { BaseRepository } from "./BaseRepository";

// Tipo local para representar um usuário vindo do banco
interface UsuarioDB {
  id_usuario: number;
}

// Herança: UsuarioRepository estende BaseRepository<UsuarioDB>
// Polimorfismo: implementa buscarTodos e buscarPorId do contrato abstrato
export class UsuarioRepository extends BaseRepository<UsuarioDB> {

  async buscarTodos(): Promise<UsuarioDB[]> {
    return this.executarQuery("SELECT id_usuario FROM tb_usuario");
  }

  async buscarPorId(id: number): Promise<UsuarioDB | null> {
    // Parâmetro $1 evita SQL injection (o código antigo usava concatenação)
    const rows = await this.executarQuery(
      "SELECT id_usuario FROM tb_usuario WHERE id_usuario = $1",
      [id]
    );
    return rows[0] ?? null;
  }

  // Método específico desta classe — não existe no contrato base
  async buscarPorEmail(email: string): Promise<UsuarioDB | null> {
    const rows = await this.executarQuery(
      "SELECT id_usuario FROM tb_usuario WHERE email = $1",
      [email]
    );
    return rows[0] ?? null;
  }
}
