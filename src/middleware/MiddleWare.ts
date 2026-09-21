import { NextFunction, Request, Response } from "express";
import { validarToken } from "../jwt/JWT";

export function middleware(
  requisicao: Request,
  resposta: Response,
  proximaFuncao: NextFunction,
) {
  const authorization = requisicao.headers.authorization;

  if (!authorization) {
    console.log("nao existe autorizacao");
    return resposta.status(401).json({ mensagem: "não autorizado" });
  }

  if (validarToken(authorization)) {
    proximaFuncao();

  } else {
    console.log("autorizacao invalida");
    return resposta.status(401).json({ mensagem: "não autorizado" });
  }
}