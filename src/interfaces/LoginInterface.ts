export interface LoginInterface {
  email: string;
  senha: string;
}

// Estende Login adicionando o token — retornado após autenticação bem-sucedida
export interface LoginRetornoInterface{
  token: string;
  mensagem: string;
}
