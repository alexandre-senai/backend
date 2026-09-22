// Este arquivo mantém as funções originais para compatibilidade,
// mas agora usando parâmetros $1 para evitar SQL injection.
// Para novos recursos, use UsuarioRepository (com herança de BaseRepository).

import { bancoDados } from "../database/pool";
import { UsuarioInterface } from "../interfaces/UsuarioInterface";
import { BaseRepository } from "./BaseRepository";

export class AuthRepository extends BaseRepository<UsuarioInterface>{

async  buscarUsuario() {
  const { rows } = await bancoDados.query("SELECT id_usuario FROM tb_usuario");
  return rows;
}

async  buscarUsuarioPorCodigo(codigo: number):number {
  // CORRETO: parâmetro $1 — nunca concatenar variáveis no SQL
  const { rows } = await bancoDados.query(
    "SELECT id_usuario FROM tb_usuario WHERE id_usuario = $1",
    [codigo]
  );
  return rows[0];
}

}