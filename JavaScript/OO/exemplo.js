//clase- modelo para começar a trabalhar 
class carro{

     // definem o comportamento do objeto que será criado. Ele funciona como um formulario de cadastro, onde você define o que será preenchido.
    constructor(marca, modelo, ano, cor){

        //atributos- caracteristicas do obj que irá ser representado
        //this é uma palavra reservada que faz referencia ao objeto que está sendo criado.
         this.marca = marca;
         this.modelo = modelo;
         this.ano = ano;
         this.cor = cor;  

    }

        //ele serve para definir o comportamento do objeto que será criado, ou seja, ele define o que o objeto poderá fazer.
        ligar(){
            console.log("O carro está ligado");
        }

        //ele serve para definir o comportamento do objeto que será criado, ou seja, ele define o que o objeto poderá fazer.
        acelerar(){
            console.log("O carro está acelerando");
        }

        //
        freiar(){
            console.log(`${this.modelo} está freando`);
        }
     
        

}

//ele serve para criar um objeto a partir da classe carro, ou seja, ele cria um carro com as caracteristicas que foram definidas na classe.
const carro1 = new carro("Fiat", "Uno", 2010, "Branco");
console.log("Carro 1: ", carro1);

//ele serve para criar um objeto a partir da classe carro, ou seja, ele cria um carro com as caracteristicas que foram definidas na classe.
const carro2 = new carro("Chevrolet", "Onix", 2020, "Preto");
console.log("Carro 2: ", carro2);

//ele serve para criar um objeto a partir da classe carro, ou seja, ele cria um carro com as caracteristicas que foram definidas na classe.
const carro3 = new carro("Ford", "Civic", 2015, "Vermelho");
console.log("Carro 3: ", carro3);

console.log("------------------------------------------------");
console.log("Atributos do carro 1: ");
console.log("- ", carro1.marca);
console.log("- ", carro1.modelo);
console.log("- ", carro1.ano);
console.log("- ", carro1.cor);
console.log("------------------------------------------------");

console.log("------------------------------------------------");
console.log("Atributos do carro 2: ");
console.log("- ", carro2.marca);
console.log("- ", carro2.modelo);
console.log("- ", carro2.ano);
console.log("- ", carro2.cor);
console.log("------------------------------------------------");

console.log("------------------------------------------------");
console.log("Atributos do carro 3: ");
console.log("- ", carro3.marca);
console.log("- ", carro3.modelo);
console.log("- ", carro3.ano);
console.log("- ", carro3.cor);
console.log("------------------------------------------------");

//servem para chamar o método ligar do objeto carro1, ou seja, ele faz com que o carro1 ligue.
carro1.ligar();

//servem para chamar o método acelerar do objeto carro2, ou seja, ele faz com que o carro2 acelere.
carro2.acelerar();

//
carro3.freiar();

