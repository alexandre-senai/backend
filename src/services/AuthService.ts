import { dadosValidos } from "../data/Mock";
import { LoginInterface } from "../interfaces/LoginInterface";
import { RetornoInterface } from "../interfaces/Retorno";
import { gerarToken } from "../jwt/JWT";
import { UsuarioRepository } from "../repository/AuthRepository";
import { BaseService } from "./BaseService";

// Herança: AuthService estende BaseService
// Polimorfismo: mesmo método log() herdado, contexto diferente
export class AuthService extends BaseService {

  private repository = new UsuarioRepository();

  async login({ email, senha }: LoginInterface): Promise<RetornoInterface<{ token: string }>> {
     const usuario = await this.repository.buscarUsuarioPorCodigo(1);
      const token = gerarToken(usuario);

      // RetornoInterface<T> genérico: aqui T = { token: string }
      return {
        mensagem: "Login realizado com sucesso",
        dados: { token }
      };
    
  }
}
