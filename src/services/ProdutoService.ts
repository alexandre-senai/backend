import { Produtos } from "../data/Mock";
import { ProdutoInterface } from "../interfaces/ProdutoInterface";
import { BaseService } from "./BaseService";

// Herança: ProdutoService estende BaseService
// Herda os métodos log() e erro() sem precisar reimplementá-los
export class ProdutoService extends BaseService {

  buscarProduto(): ProdutoInterface[] {
    this.log("ProdutoService", "Buscando todos os produtos");
    return Produtos;
  }

  salvar(parametros: ProdutoInterface): number {
    this.log("ProdutoService", `Salvando produto: ${parametros.descricao}`);

    if (!parametros.descricao || parametros.valor <= 0) {
      // Polimorfismo de comportamento: erro() é herdado do BaseService
      this.erro("Descrição ou valor inválido");
    }

    return Produtos.push(parametros);
  }

  buscarProdutoPorDescricao(pesquisa: string): ProdutoInterface | null {
    this.log("ProdutoService", `Pesquisando por: ${pesquisa}`);

    return Produtos.find(
      (p) => p.descricao.toLowerCase() === pesquisa.toLowerCase()
    ) ?? null;
  }
}
