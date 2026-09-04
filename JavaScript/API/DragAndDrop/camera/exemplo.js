navigator.mediaDevices.getUserMedia({
    audio: true, video: true
})
.then(function(stream) {
    const video = document.querySelector("#camera");
    video.srcObject = stream;
})
.catch(function(error) {
    console.error("Erro ao acessar a câmera: ", error);
});
