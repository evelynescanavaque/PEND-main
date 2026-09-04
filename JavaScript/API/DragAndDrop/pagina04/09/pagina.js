// ===== API DE GEOLOCALIZAÇÃO =====

function obterLocalizacao() {

    if (!navigator.geolocation) {
        document.getElementById("mensagem").innerText =
            "Geolocalização não é suportada pelo navegador.";
        return;
    }

    document.getElementById("mensagem").innerText = "Obtendo localização...";

    navigator.geolocation.getCurrentPosition(
        mostrarLocalizacao,
        erroLocalizacao,
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function mostrarLocalizacao(posicao) {

    let latitude = posicao.coords.latitude;
    let longitude = posicao.coords.longitude;
    let precisao = posicao.coords.accuracy;

    document.getElementById("latitude").innerText = latitude.toFixed(6);
    document.getElementById("longitude").innerText = longitude.toFixed(6);
    document.getElementById("precisao").innerText = precisao.toFixed(1) + " metros";

    document.getElementById("mensagem").innerText =
        "Localização obtida com sucesso!";
}

function erroLocalizacao(erro) {

    let texto = "Não foi possível obter a localização.";

    switch (erro.code) {
        case erro.PERMISSION_DENIED:
            texto = "Permissão de localização negada.";
            break;
        case erro.POSITION_UNAVAILABLE:
            texto = "Localização indisponível no momento.";
            break;
        case erro.TIMEOUT:
            texto = "Tempo esgotado ao tentar obter a localização.";
            break;
    }

    document.getElementById("mensagem").innerText = texto;
    console.log(erro);
}


// ===== API DA CÂMERA =====

let streamAtual = null;

async function iniciarCamera() {

    try {

        let video = document.getElementById("camera");

        let stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" }
        });

        streamAtual = stream;
        video.srcObject = stream;

        document.getElementById("mensagem").innerText =
            "Câmera ativada com sucesso!";

    } catch (erro) {

        document.getElementById("mensagem").innerText =
            "Não foi possível acessar a câmera. Verifique as permissões.";

        console.log(erro);
    }
}

function tirarFoto() {

    let video = document.getElementById("camera");
    let canvas = document.getElementById("canvas");
    let foto = document.getElementById("fotoCapturada");

    if (!streamAtual) {
        document.getElementById("mensagem").innerText =
            "Ative a câmera antes de tirar a foto.";
        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let contexto = canvas.getContext("2d");
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

    let imagemBase64 = canvas.toDataURL("image/png");

    foto.src = imagemBase64;
    foto.style.display = "block";

    document.getElementById("mensagem").innerText =
        "Foto capturada com sucesso!";
}