import { Request, Response } from "express";
import { ProdutoInterface } from "../interfaces/ProdutoInterface";
import { RetornoInterface } from "../interfaces/Retorno";
import { ProdutoService } from "../services/ProdutoService";

const service = new ProdutoService();

export class ProdutoController {

  async buscarProduto(frontend: Request, backend: Response) {
    const { pesquisa } = frontend.query;

    if (!pesquisa || pesquisa === "") {
      // RetornoInterface<T>: aqui T = ProdutoInterface[]
      const resposta: RetornoInterface<ProdutoInterface[]> = {
        mensagem: "Produtos encontrados",
        dados: service.buscarProduto()
      };
      return backend.status(200).json(resposta);
    }

    const encontrado = service.buscarProdutoPorDescricao(String(pesquisa));

    // RetornoInterface<T>: aqui T = ProdutoInterface — mesmo contrato, tipo diferente
    const resposta: RetornoInterface<ProdutoInterface | null> = {
      mensagem: encontrado ? "Produto encontrado" : "Nenhum produto encontrado",
      dados: encontrado
    };
    return backend.status(200).json(resposta);
  }

  async salvar(frontend: Request, backend: Response) {
    const { parametros } = frontend.body;

    const dados: ProdutoInterface = {
      descricao: String(parametros?.descricao ?? ""),
      valor: Number(parametros?.valor ?? 0)
    };

    try {
      service.salvar(dados);
      const resposta: RetornoInterface = { mensagem: "Produto salvo com sucesso" };
      return backend.status(201).json(resposta);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro ao salvar produto";
      const resposta: RetornoInterface = { mensagem: msg };
      return backend.status(400).json(resposta);
    }
  }
}
