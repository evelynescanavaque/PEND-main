export function criarCosmetico(nome, marca, preco) {
  return { nome, marca, preco };
}

export function descricaoCosmetico(cosmetico) {
  return `${cosmetico.nome} - ${cosmetico.marca} - R$ ${cosmetico.preco.toFixed(2)}`;
}