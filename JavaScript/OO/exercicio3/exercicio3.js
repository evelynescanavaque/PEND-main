class Produto {

    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    vender(){
        console.log(`O produto ${this.nome} foi vendido.`);
    }

    repor(){
        console.log(`O produto ${this.nome} foi reposto.`);
    }

    alterarPreco(){
        console.log(`O preço do produto ${this.nome} foi alterado para ${this.preco}.`);
    }
}

const produto1 = new Produto("Notebook", 3000, 10);
console.log("Produto 1:", produto1);

const produto2 = new Produto("Smartphone", 2000, 20);
console.log("Produto 2:", produto2);

const produto3 = new Produto("Tablet", 1500, 15);
console.log("Produto 3:", produto3);

console.log("------------------------------------------------");
console.log("Atributos do produto 1: ");
console.log("- ", produto1.nome);
console.log("- ", produto1.preco);
console.log("- ", produto1.estoque);
console.log("------------------------------------------------");

console.log("------------------------------------------------");
console.log("Atributos do produto 2: ");
console.log("- ", produto2.nome);
console.log("- ", produto2.preco);
console.log("- ", produto2.estoque);
console.log("------------------------------------------------");

console.log("------------------------------------------------");
console.log("Atributos do produto 3: ");
console.log("- ", produto3.nome);
console.log("- ", produto3.preco);
console.log("- ", produto3.estoque);
console.log("------------------------------------------------");

produto1.vender();
produto1.repor();
produto1.alterarPreco();

produto2.repor();
produto2.vender();
produto2.alterarPreco();

produto3.alterarPreco();
produto3.vender();
produto3.repor();