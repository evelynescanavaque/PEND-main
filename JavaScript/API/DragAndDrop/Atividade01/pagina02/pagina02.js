const botaoMenos = document.querySelector('#botao-menos');
const botaoMais = document.querySelector('#botao-mais');
const botaoConfirmar = document.querySelector('#botao-confirmar');
const contador = document.querySelector('#contador');
const mensagem = document.querySelector('#mensagem');
const botaoProximaFase = document.querySelector('#botao-proxima-fase');
const areaUvas = document.querySelector('#area-uvas');

let quantidade = 0;
let uvaArrastada = null;
let maiorCamada = 2;

function atualizarContador() {
	contador.textContent = quantidade;
}

botaoMais.addEventListener('click', () => {
	quantidade += 1;
	atualizarContador();
});

botaoMenos.addEventListener('click', () => {
	if (quantidade > 0) {
		quantidade -= 1;
		atualizarContador();
	}
});

botaoConfirmar.addEventListener('click', () => {
	if (quantidade === 10) {
		mensagem.textContent = '✓ Muito bem! Você acertou.';
		mensagem.className = 'acerto';
		botaoProximaFase.classList.add('visivel');
		return;
	}

	mensagem.textContent = 'Tente novamente, use o mause para isso.';
	mensagem.className = 'erro';
	botaoProximaFase.classList.remove('visivel');
});

document.querySelectorAll('.uva').forEach((uva) => {
	uva.addEventListener('dragstart', (evento) => {
		uvaArrastada = uva;
		uva.classList.add('arrastando');
		evento.dataTransfer.effectAllowed = 'move';
	});

	uva.addEventListener('dragend', () => {
		uva.classList.remove('arrastando');
		uvaArrastada = null;
	});
});

areaUvas.addEventListener('dragover', (evento) => {
	evento.preventDefault();
	evento.dataTransfer.dropEffect = 'move';
});

areaUvas.addEventListener('drop', (evento) => {
	evento.preventDefault();
	if (!uvaArrastada) {
		return;
	}

	const limites = areaUvas.getBoundingClientRect();
	const novaEsquerda = evento.clientX - limites.left - (uvaArrastada.offsetWidth / 2);
	const novoTopo = evento.clientY - limites.top - (uvaArrastada.offsetHeight / 2);

	uvaArrastada.style.left = `${Math.max(0, Math.min(novaEsquerda, limites.width - uvaArrastada.offsetWidth))}px`;
	uvaArrastada.style.top = `${Math.max(0, Math.min(novoTopo, limites.height - uvaArrastada.offsetHeight))}px`;
	maiorCamada += 1;
	uvaArrastada.style.zIndex = maiorCamada;
});