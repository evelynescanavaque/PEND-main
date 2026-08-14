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

    // exibirNaTela() {
    //     const produtoElement = document.createElement('div');
    //     produtoElement.innerHTML = `
    //         <p>Nome: ${this.nome}</p>
    //         <p>Preço: R$ ${this.preco}</p>
    //         <p>Categoria: ${this.categoria}</p>
    //         <p>Desconto: ${this.desconto}%</p>
    //         <p>Preço com desconto: R$ ${this.aplicarDesconto().toFixed(2)}</p>
    //     `;
    //     document.body.appendChild(produtoElement);
    // }
}

class Produtos {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    exibirProdutos() {
        const resultado = document.querySelector("#resultado");

        resultado.innerHTML = "";

        this.produtos.forEach(produto => {
            resultado.innerHTML += `
                <p>Nome: ${produto.nome}</p>
                <p>Preço: R$ ${produto.preco}</p>
                <p>Categoria: ${produto.categoria}</p>
                <p>Desconto: ${produto.desconto}%</p>
                <p>Preço com desconto: R$ ${produto.aplicarDesconto().toFixed(2)}</p>
                <hr>
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

botaoCadastrar.addEventListener("click", function () {
    const produto = new Produto(nome.value, preco.value, categoria.value, desconto.value);
    produtos.adicionarProduto(produto);
    produtos.exibirProdutos();
});









