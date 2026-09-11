const video = document.querySelector("#camera");
const canvas = document.querySelector("#canvas");
const botao = document.querySelector("#botao");
const foto = document.querySelector("#foto");

navigator.mediaDevices.getUserMedia({
    video:true, audio:true
})

.then(function(stream) {
    const video = document.querySelector("#camera");
    video.srcObject = stream;
})
.catch(function(erro) {
    console.log("Erro ao acessar a câmera:", erro);
});

botao.addEventListener("click", function() {

    canvas.width = video.clientHeight;
    canvas.height = video.clientWidth;

    const contexto = canvas.getContext("2d");

    contexto.drawImage(
        video, 
        0, 
        0, 
        canvas.width, 
        canvas.height
    );

    foto.src = canvas.toDataURL("image/png");
});