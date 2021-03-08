export interface Product {
    id?: number;
    nome: string;
    empresa: string;
    categoria: string;
    precoCompra: number;
    precoVenda: number;
    qtdEstoque: number;
    dataVencimento?: string;
}
