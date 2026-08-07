class Aluno{

    constructor(nome, idade, curso, matricula){
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.matricula = matricula;
    }

    aprender(){
        console.log(`${this.nome} está aprendendo.`);
    }

    estudar(){
        console.log(`${this.nome} está estudando.`);
    }

    apresentar(){
        console.log(`${this.nome} esta apresentando.`);
    }       
    
}

const aluno1 = new Aluno("João", 20, "Engenharia", "12345");
console.log("Aluno 1:", aluno1);

const aluno2 = new Aluno("Maria", 22, "Medicina", "67890");
console.log("Aluno 2:", aluno2);

const aluno3 = new Aluno("Pedro", 19, "Direito", "54321");
console.log("Aluno 3:", aluno3);

const aluno4 = new Aluno("Ana", 21, "Arquitetura", "98765");
console.log("Aluno 4:", aluno4);

console.log("------------------------------------------------");
console.log("Atributos do aluno 1: ");
console.log("- ", aluno1.nome);
console.log("- ", aluno1.idade);
console.log("- ", aluno1.curso);
console.log("- ", aluno1.matricula);
console.log("------------------------------------------------");

console.log("------------------------------------------------");
console.log("Atributos do aluno 2: ");
console.log("- ", aluno2.nome);
console.log("- ", aluno2.idade);
console.log("- ", aluno2.curso);
console.log("- ", aluno2.matricula);
console.log("------------------------------------------------");

console.log("------------------------------------------------");
console.log("Atributos do aluno 3: ");
console.log("- ", aluno3.nome);
console.log("- ", aluno3.idade);
console.log("- ", aluno3.curso);
console.log("- ", aluno3.matricula);
console.log("------------------------------------------------");

console.log("------------------------------------------------");
console.log("Atributos do aluno 4: ");
console.log("- ", aluno4.nome); 
console.log("- ", aluno4.idade);
console.log("- ", aluno4.curso);
console.log("- ", aluno4.matricula);
console.log("------------------------------------------------");

aluno1.aprender();

aluno2.estudar();

aluno3.apresentar();