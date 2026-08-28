class Produto { 
  constructor(nome, preco, categoria, desconto) { 
    this.nome = nome; 
    this.preco = preco; 
    this.categoria = categoria; 
    this.desconto = desconto; 
  } 
  aplicarDesconto() { 
    const precoComDesconto = this.preco - (this.preco * this.desconto / 100); 
    return precoComDesconto; 
  } 
} 

class Produtos { 
  constructor() { 
    this.produtos = []; 
    this.carregarLocalStorage(); 
  } 
  adicionarProduto(produto) { 
    this.produtos.push(produto); 
    this.salvarLocalStorage(); 
    this.exibirProdutos(); 
  } 
  excluirProduto(index) { 
    if (index >= 0 && index < this.produtos.length) { 
      this.produtos.splice(index, 1); 
      this.salvarLocalStorage(); 
      this.exibirProdutos(); 
    } 
  } 
  salvarLocalStorage() { 
    localStorage.setItem( "produtos", JSON.stringify(this.produtos) ); 
  } 
  carregarLocalStorage() { 
    const dados = localStorage.getItem("produtos"); 
    if (dados) { 
      const produtosSalvos = JSON.parse(dados); 
      this.produtos = produtosSalvos.map(p => new Produto(p.nome, p.preco, p.categoria, p.desconto));
    } 
    this.exibirProdutos();
  } 
  exibirProdutos() { 
    const resultado = document.querySelector("#resultado"); 
    resultado.innerHTML = ""; 
    this.produtos.forEach((produto, index) => { 
      resultado.innerHTML += ` 
        <div> 
          <p> <strong>Nome:</strong> ${produto.nome} </p> 
          <p> <strong>Preço:</strong> R$ ${Number(produto.preco).toFixed(2)} </p> 
          <p> <strong>Categoria:</strong> ${produto.categoria} </p> 
          <p> <strong>Desconto:</strong> ${produto.desconto}% </p> 
          <p> <strong>Preço com desconto:</strong> R$ ${produto.aplicarDesconto().toFixed(2)} </p> 
          <button onclick="produtos.excluirProduto(${index})"> Excluir </button> 
          <hr> 
        </div> 
      `; 
    }); 
  } 
} 

const produtos = new Produtos(); 
const nome = document.querySelector("#nome"); 
const preco = document.querySelector("#preco"); 
const categoria = document.querySelector("#categoria"); 
const desconto = document.querySelector("#desconto"); 
const botaoCadastrar = document.querySelector("#cadastrar"); 
const botaoExcluir = document.querySelector("#excluir"); 

botaoCadastrar.addEventListener("click", function () { 
  const produto = new Produto( 
    nome.value, 
    Number(preco.value), 
    categoria.value, 
    Number(desconto.value) 
  ); 
  
  
  produtos.adicionarProduto(produto); 
}); 

botaoExcluir.addEventListener("click", function () { 
  const nomeProduto = prompt( "Digite o nome do produto que deseja excluir:" ); 
  const produtoParaExcluir = produtos.produtos.find( 
    produto => produto.nome === nomeProduto 
  ); 

  if (produtoParaExcluir) { 
    const index = produtos.produtos.indexOf(produtoParaExcluir); 
    produtos.excluirProduto(index); 
    
    } else { 

    alert("Produto não encontrado."); 
  } 
});
