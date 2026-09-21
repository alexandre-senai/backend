// Interface base — define o contrato mínimo de um produto
export interface ProdutoInterface {
  descricao: string;
  valor: number;
}

// Herança de interface: ProdutoComId "é um" Produto, mas com id adicional
// Usado em retornos do banco de dados
export interface ProdutoComIdInterface extends ProdutoInterface {
  id: number;
}
