import { Request, Response } from "express";
import { LoginInterface } from "../interfaces/LoginInterface";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {

  async login(requisicao: Request, resposta: Response) {
    const email = requisicao.query.email as string;
    const senha = requisicao.query.senha as string;

    if(!email || !senha){
      return  resposta.status(200).json("FALTA PARAMETROS");
    }

    // LoginInterface garante o contrato de dados enviados ao service
    const dados: LoginInterface = { email, senha };

    const resultado = await authService.login(dados);
    return resposta.status(200).json(resultado);
  }

  async teste(requisicao: Request, resposta: Response) {
    return resposta.status(500).json({ mensagem: "deu erro no email" });
  }

  async testedois(requisicao: Request, resposta: Response) {
    const { codigo } = requisicao.params;

    const dados = [
      { id: 1, t: "olaa" },
      { id: 2, t: "olaas" }
    ];

    const encontrei = dados.find((i) => i.t === codigo) ?? null;
    return resposta.status(200).json({ mensagem: "ok", dados: encontrei });
  }
}
