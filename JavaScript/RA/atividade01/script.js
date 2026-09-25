const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDRlZDVhNTNlZDI5ZGQyOGE4NDI1OTk3OTA1MTczMyIsIm5iZiI6MTc4OTc0MjcxNy43NjcsInN1YiI6IjZhYWQ0ZTdkNWY1ODVkZDVmMTBjMWQ2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pDj4MZzBEB2odIlWuwZcBpJNwJS6ZKy-zY5YDhtibWo";

const campoBusca = document.getElementById("campoBusca");
const btnBuscar = document.getElementById("btnBuscar");
const filmes = document.getElementById("filmes");


async function buscarFilmes() {

    const nome = campoBusca.value.trim();

    if (nome === "") {
        filmes.innerHTML = "<p>Digite o nome de um filme.</p>";
        return;
    }

    filmes.innerHTML = "<p>Buscando...</p>";

    try {

        const url =
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(nome)}&language=pt-BR`;

        const resposta = await fetch(url, {

            headers: {
                Authorization: `Bearer ${TOKEN}`,
                accept: "application/json"
            }

        });

        // console.log("Status:", resposta.status);

        const dados = await resposta.json();

        // console.log("Resposta da API:", dados);

        if (!resposta.ok) {

            filmes.innerHTML = `
                <p>
                    ❌ Erro ${resposta.status}
                </p>

                <p>
                    ${dados.status_message || "Erro desconhecido"}
                </p>
            `;

            return;
        }


        if (dados.results.length === 0) {

            filmes.innerHTML = `
                <p>Nenhum filme encontrado.</p>
            `;

            return;
        }


        filmes.innerHTML = "";


        dados.results.forEach(function(filme) {

            let imagem = "";

            if (filme.poster_path) {

                imagem =
                    `https://image.tmdb.org/t/p/w500${filme.poster_path}`;

            }


            filmes.innerHTML += `

                <div class="card">

                    ${
                        imagem
                        ? `<img src="${imagem}" alt="${filme.title}" width="200px" height="300px">`
                        : ""
                    }

                    <h2>${filme.title}</h2>

                    <p>
                        ⭐ Nota: ${filme.vote_average.toFixed(1)}
                    </p>

                    <p>
                        ${filme.overview || "Sem descrição."}
                    </p>

                </div>

            `;

        });

    }

    catch (erro) {

        // console.error(erro);

        filmes.innerHTML = `
            <p>❌ Erro de conexão com a API.</p>
            <p>${erro.message}</p>
        `;

    }

}


btnBuscar.addEventListener("click", buscarFilmes);


campoBusca.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        buscarFilmes();
    }

});