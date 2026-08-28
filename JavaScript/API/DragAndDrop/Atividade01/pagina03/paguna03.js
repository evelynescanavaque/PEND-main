
const personagem = document.querySelector('#personagem');
const instrucao = document.querySelector('#instrucao');
const alimentoUva = document.querySelector('#alimento-uva');
const alimentoHamburguer = document.querySelector('#alimento-hamburguer');

const modalMensagem = document.querySelector('#modal-mensagem');
const modalCaixa = modalMensagem.querySelector('.modal-caixa');
const modalEmoji = document.querySelector('#modal-emoji');
const modalTitulo = document.querySelector('#modal-titulo');
const modalTexto = document.querySelector('#modal-texto');
const botaoJogarNovamente = document.querySelector('#botao-jogar-novamente');

const IMG_GORDO = '../img/HomemGordo.png';
const IMG_FORTE = '../img/homemForte.png';
const IMG_MUITO_GORDO = '../img/homemMuitoGordo.png';

let jogoFinalizado = false;
let elementoArrastado = null;
let deslocamentoX = 0;
let deslocamentoY = 0;

const posicoesIniciais = new Map();

[alimentoUva, alimentoHamburguer].forEach((alimento) => {
    const estilo = getComputedStyle(alimento);

    posicoesIniciais.set(alimento, {
        left: estilo.left,
        top: estilo.top
    });
});

function iniciarArraste(evento) {

    if (jogoFinalizado) {
        return;
    }

    evento.preventDefault();

    elementoArrastado = evento.currentTarget;

    elementoArrastado.setPointerCapture(evento.pointerId);

    const limites = elementoArrastado.getBoundingClientRect();

    deslocamentoX = evento.clientX - limites.left;
    deslocamentoY = evento.clientY - limites.top;

    const area = document.querySelector('#area-jogo');
    const limitesArea = area.getBoundingClientRect();

    elementoArrastado.style.position = 'absolute';

    elementoArrastado.style.left =
        `${limites.left - limitesArea.left}px`;

    elementoArrastado.style.top =
        `${limites.top - limitesArea.top}px`;

    elementoArrastado.style.margin = '0';

    elementoArrastado.classList.add('arrastando');

    document.addEventListener('pointermove', moverArraste);
    document.addEventListener('pointerup', finalizarArraste);
    document.addEventListener('pointercancel', cancelarArraste);
}

function moverArraste(evento) {

    if (!elementoArrastado) {
        return;
    }

    evento.preventDefault();

    const area = document.querySelector('#area-jogo');
    const limitesArea = area.getBoundingClientRect();

    elementoArrastado.style.left =
        `${evento.clientX - limitesArea.left - deslocamentoX}px`;

    elementoArrastado.style.top =
        `${evento.clientY - limitesArea.top - deslocamentoY}px`;

    if (
        estaSobrePersonagem(
            evento.clientX,
            evento.clientY
        )
    ) {
        personagem.classList.add('area-ativa');
    } else {
        personagem.classList.remove('area-ativa');
    }
}

function estaSobrePersonagem(x, y) {

    const limites =
        personagem.getBoundingClientRect();

    return (
        x >= limites.left &&
        x <= limites.right &&
        y >= limites.top &&
        y <= limites.bottom
    );
}

function finalizarArraste(evento) {

    if (!elementoArrastado) {
        return;
    }

    const alimento = elementoArrastado;

    const soltouNoPersonagem =
        estaSobrePersonagem(
            evento.clientX,
            evento.clientY
        );

    removerEventos();

    alimento.classList.remove('arrastando');

    personagem.classList.remove('area-ativa');

    if (soltouNoPersonagem) {

        resolverJogada(
            alimento,
            alimento === alimentoUva
        );

    } else {

        voltarParaPosicaoInicial(alimento);

    }

    elementoArrastado = null;
}

function cancelarArraste() {

    if (!elementoArrastado) {
        return;
    }

    const alimento = elementoArrastado;

    removerEventos();

    alimento.classList.remove('arrastando');

    personagem.classList.remove('area-ativa');

    voltarParaPosicaoInicial(alimento);

    elementoArrastado = null;
}

function removerEventos() {

    document.removeEventListener(
        'pointermove',
        moverArraste
    );

    document.removeEventListener(
        'pointerup',
        finalizarArraste
    );

    document.removeEventListener(
        'pointercancel',
        cancelarArraste
    );
}

function voltarParaPosicaoInicial(alimento) {

    const posicao =
        posicoesIniciais.get(alimento);

    alimento.style.position = 'absolute';
    alimento.style.left = posicao.left;
    alimento.style.top = posicao.top;
    alimento.style.margin = '';
}

function resolverJogada(alimento, acertou) {

    jogoFinalizado = true;

    alimento.classList.add('sumindo');

    setTimeout(() => {

        alimento.style.visibility = 'hidden';

        personagem.src =
            acertou
                ? IMG_FORTE
                : IMG_MUITO_GORDO;

        personagem.classList.remove('trocando');

        void personagem.offsetWidth;

        personagem.classList.add('trocando');

        setTimeout(() => {
            mostrarMensagem(acertou);
        }, 3000);

    }, 300);
}

function mostrarMensagem(acertou) {

    modalCaixa.classList.remove(
        'acerto',
        'erro'
    );

    modalCaixa.classList.add(
        acertou
            ? 'acerto'
            : 'erro'
    );

    modalEmoji.textContent =
        acertou
            ? '🎉'
            : '😅';

    modalTitulo.textContent =
        acertou
            ? 'Parabéns!'
            : 'Ops!';

    modalTexto.textContent =
        acertou
            ? 'Você alimentou o Bruno corretamente!'
            : 'Essa comida não é saudável.';

    instrucao.textContent =
        acertou
            ? 'O Bruno ficou mais forte!'
            : 'Tente escolher um alimento mais saudável.';

    modalMensagem.classList.add('visivel');

    modalMensagem.setAttribute(
        'aria-hidden',
        'false'
    );
}

function reiniciarJogo() {

    jogoFinalizado = false;

    personagem.src = IMG_GORDO;

    personagem.classList.remove(
        'trocando'
    );

    [alimentoUva, alimentoHamburguer].forEach(
        (alimento) => {

            alimento.classList.remove(
                'sumindo',
                'arrastando'
            );

            alimento.style.visibility =
                'visible';

            voltarParaPosicaoInicial(
                alimento
            );
        }
    );

    instrucao.textContent =
        'Arraste um alimento até o Bruno para alimentá-lo.';

    modalMensagem.classList.remove(
        'visivel'
    );

    modalMensagem.setAttribute(
        'aria-hidden',
        'true'
    );
}

[alimentoUva, alimentoHamburguer].forEach(
    (alimento) => {

        alimento.addEventListener(
            'pointerdown',
            iniciarArraste
        );

        alimento.addEventListener(
            'dragstart',
            (evento) => {
                evento.preventDefault();
            }
        );
    }
);

botaoJogarNovamente.addEventListener(
    'click',
    reiniciarJogo
);
