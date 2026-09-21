// Interface genérica: o tipo T representa o conteúdo de "dados"
// Assim um único contrato serve para qualquer endpoint
export interface RetornoInterface<T = null> {
  mensagem: string;
  dados?: T; // opcional — nem toda resposta precisa retornar dados
}
