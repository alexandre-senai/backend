import { ProdutoInterface } from "../interfaces/ProdutoInterface";

export const usuario = [
  {
    codigo: 1,
    nome: "alexandre",
    idade: 25,
    email: "ale@gmail.com",
    senha: "123",
  }, {
    codigo: 2,
    nome: "Jose",
    idade: 25,
    email: "jo@gmail.com",
    senha: "123",
  },{
    codigo: 5,
    nome: "teste",
    idade: 25,
    email: "te@gmail.com",
    senha: "123",
  }
];

export const dadosValidos = {
  "email": "alexandre@gmail.com",
  "senha": 123
}


export const Produtos:ProdutoInterface[] = [
  {
    descricao: "LARANJINHA",
    valor: 15.85
  },

  {
    descricao: "COCA COLA",
    valor: 18.00
  },

  {
    descricao: "TUBAINA",
    valor: 20.00
  },
  {
    descricao: "SABOOR ABACAXI",
    valor: 21.00
  }

];