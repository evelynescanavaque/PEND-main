 

let streamAtual = null;


// Ativar câmera
async function iniciarCamera() {

    try {

        const video = document.getElementById("camera");

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        streamAtual = stream;

        video.srcObject = stream;

        document.getElementById("mensagem").innerText =
            " Câmera ativada! Agora tire uma foto.";

    } catch (erro) {

        document.getElementById("mensagem").innerText =
            "Não foi possível acessar a câmera. Verifique a permissão.";

        console.log(erro);
    }
}


// ===== TIRAR FOTO =====

function tirarFoto() {

    const video = document.getElementById("camera");
    const canvas = document.getElementById("canvas");

    if (!streamAtual) {

        document.getElementById("mensagem").innerText =
            "♡ Primeiro ative a câmera!";

        return;
    }

    if (video.videoWidth === 0 || video.videoHeight === 0) {

        document.getElementById("mensagem").innerText =
            "Aguarde a câmera carregar...";

        return;
    }


    // Define o tamanho da imagem
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;


    // Desenha a imagem
    const contexto = canvas.getContext("2d");

    contexto.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );


    
    const imagem = canvas.toDataURL("image/png");


    
    adicionarFotoNaGaleria(imagem);


    document.getElementById("mensagem").innerText =
        " Foto adicionada à sua galeria!";
}


 

function adicionarFotoNaGaleria(imagem) {

    const galeria = document.getElementById("galeria");
    const semFotos = document.getElementById("semFotos");


  
    if (semFotos) {
        semFotos.remove();
    }

 
    const item = document.createElement("div");
    item.classList.add("foto-item");


    
    const foto = document.createElement("img");

    foto.src = imagem;

    foto.alt = "Foto da galeria";

 
    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("excluir");
    botaoExcluir.innerHTML = "♡";
    botaoExcluir.title = "Excluir foto";
    botaoExcluir.onclick = function () {

        item.remove();

        atualizarContador();

        verificarGaleriaVazia();
    };


     
    item.appendChild(foto);
    item.appendChild(botaoExcluir);
    galeria.appendChild(item);
    atualizarContador();
}
 

function atualizarContador() {

    const fotos = document.querySelectorAll(".foto-item");

    const contador = document.getElementById("contador");

    if (fotos.length === 1) {

        contador.innerText = "1 foto";

    } else {

        contador.innerText = fotos.length + " fotos";

    }
}


 

function verificarGaleriaVazia() {

    const fotos = document.querySelectorAll(".foto-item");

    const galeria = document.getElementById("galeria");


    if (fotos.length === 0) {

        const mensagem = document.createElement("div");

        mensagem.id = "semFotos";

        mensagem.classList.add("sem-fotos");

        mensagem.innerHTML = `
            <div>📷</div>
            <p>Ainda não há fotos aqui...</p>
            <span>Tire sua primeira foto! ♡</span>
        `;

        galeria.appendChild(mensagem);
    }
}

 

window.addEventListener("beforeunload", function () {

    if (streamAtual) {

        streamAtual.getTracks().forEach(function (track) {

            track.stop();

        });

    }

});