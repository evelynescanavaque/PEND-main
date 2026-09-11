 const canvas = document.querySelector("#canvas");
const contexto = canvas.getContext("2d");

contexto.lineWidth = 8;
contexto.lineCap = "round";
contexto.lineJoin = "round";

// Cabeça
contexto.beginPath();
contexto.arc(300, 100, 25, 0, Math.PI * 2);
contexto.stroke();

// Corpo
contexto.beginPath();
contexto.moveTo(300, 125);
contexto.lineTo(300, 230);

// Braço esquerdo
contexto.moveTo(300, 145);
contexto.lineTo(260, 180);
contexto.lineTo(300, 205);

// Braço direito
contexto.moveTo(300, 145);
contexto.lineTo(345, 175);
contexto.lineTo(385, 140);

// Perna esquerda
contexto.moveTo(300, 230);
contexto.lineTo(260, 275);
contexto.lineTo(255, 360);

// Perna direita
contexto.moveTo(300, 230);
contexto.lineTo(340, 275);
contexto.lineTo(340, 360);

contexto.stroke();