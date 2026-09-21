import jwt from "jsonwebtoken";
const SENHA = process.env.SENHA_JWT as string;

export function gerarToken(codigoUsuario: number) {
  const retorno = jwt.sign(
    {
      usuario: codigoUsuario,
    },
    SENHA,
    {
      expiresIn: "1h",
    },
  );
  return retorno;
}

export function validarToken(token: string) {
  let retorno = false;

  try {
    const dados:any = jwt.verify(token, SENHA);
    retorno = dados.usuario > 0;
  } catch (error) {
    console.log("TOKEN INVALIDO!");
  }
  return retorno;
}