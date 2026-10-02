import { criarCosmetico, descricaoCosmetico } from "./cosmetico.js";

const cosmeticos = [
  criarCosmetico("Batom Matte", "Maybelline", 29.9),
  criarCosmetico("Base Líquida", "Vult", 39.9),
  criarCosmetico("Máscara de Cílios", "Avon", 24.5),
  criarCosmetico("Hidratante Facial", "Nivea", 34.0),
  criarCosmetico("Perfume Floral", "O Boticário", 129.9),
];

export function listarCosmeticos() {
  return cosmeticos.map(descricaoCosmetico);
}

export function totalDaLista() {
  return cosmeticos.reduce((soma, c) => soma + c.preco, 0);
}