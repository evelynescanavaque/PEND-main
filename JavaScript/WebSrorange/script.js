const nome = document.querySelector("#nome");
const botaoSalvar = document.querySelector("#salvar");
const botaoRecuperar = document.querySelector("#recuperar");
const botaoExcluir = document.querySelector("#excluir");

const resultado = document.querySelector("#resultado");

//salvar 
botaoSalvar.addEventListener("click", function() {

    localStorage.setItem("nome", nome.value);

    resultado.textContent = "Nome salvo!";

});

//recuperar
botaoRecuperar.addEventListener("click", function() {
    const nomeSalvo = localStorage.getItem("nome");
    resultado.textContent = `Nome armazenado/recuperado: ${nomeSalvo}`;

});

//excluir
botaoExcluir.addEventListener("click", function() {
    localStorage.removeItem("nome");
    resultado.textContent = "Nome excluído!";
});