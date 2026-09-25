 
// //fetch + then + catch 
 
// const botao = document.querySelector("#buscarUsuarios");
// const resultado = document.querySelector("#resultado");

// botao.addEventListener("click", () => {

//     fetch("https://jsonplaceholder.typicode.com/users")

//         .then(resposta => resposta.json())

//         .then(dados => {

//             console.log(dados);

//             resultado.innerHTML =  "";

//             dados.forEach(usuario => {

//                 resultado.innerHTML += `
//                     <p>
//                         <strong>${usuario.name}</strong><hr>
//                         ${usuario.email}
//                     </p>
//                     <hr>
//                 `;
//              });

//         })
//         .catch(erro => {
//             console.log("Erro na requisição: ", erro);
//         });
//     });

// //fetch + then + catch 
const botao = document.querySelector("#buscarUsuarios");
const resultado = document.querySelector("#resultado");
const idUsuario = document.querySelector("#idUsuario");

botao.addEventListener("click", async () => {
    const id = idUsuario.value;

    if (id === "") {
        resultado.innerHTML = "Por favor, insira um ID de usuário.";
        return;
    }

    try {
        const resposta = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const dados = await resposta.json();

        resultado.innerHTML = `
            <p>
                <strong>${dados.name}</strong><br>
                Email: ${dados.email}<br>
                Cidade: ${dados.address.city}<br>
                Telefone: ${dados.phone}
            </p>
            <hr>
        `;

    } catch (erro) {
        resultado.innerHTML = "Erro ao buscar o usuário.";
        console.log(erro);
    }
});