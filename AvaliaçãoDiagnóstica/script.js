/*=====================================
    BLOOM - SCRIPT
=====================================*/


/*=============================
BOTÃO VOLTAR AO TOPO
=============================*/

const botaoTopo = document.querySelector(".topo");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        botaoTopo.classList.add("show");

    }else{

        botaoTopo.classList.remove("show");

    }

});

botaoTopo.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*=============================
ANIMAÇÃO AO ROLAR
=============================*/

const elementos = document.querySelectorAll(

".sobre, .card, .projeto, .galeria img, .contato"

);

function revelarElementos(){

    const alturaTela = window.innerHeight;

    elementos.forEach((elemento)=>{

        const posicao = elemento.getBoundingClientRect().top;

        if(posicao < alturaTela - 120){

            elemento.classList.add("ativo");

        }

    });

}

window.addEventListener("scroll", revelarElementos);

revelarElementos();


/*=============================
EFEITO NA LOGO
=============================*/

const logo = document.querySelector(".logo img");

logo.addEventListener("mouseover",()=>{

    logo.style.transform="scale(1.08) rotate(-2deg)";

});

logo.addEventListener("mouseout",()=>{

    logo.style.transform="scale(1) rotate(0deg)";

});


/*=============================
HEADER AO ROLAR
=============================*/

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 60){

        header.style.boxShadow="0 8px 25px rgba(0,0,0,.08)";

        header.style.position="sticky";

        header.style.top="0";

        header.style.zIndex="999";

        header.style.background="#ffffff";

    }else{

        header.style.boxShadow="none";

    }

});


/*=============================
EFEITO NAS IMAGENS
=============================*/

const imagens = document.querySelectorAll(".grid img");

imagens.forEach((imagem)=>{

    imagem.addEventListener("mouseenter",()=>{

        imagem.style.transform="scale(1.05) rotate(1deg)";

    });

    imagem.addEventListener("mouseleave",()=>{

        imagem.style.transform="scale(1)";

    });

});


/*=============================
BOTÕES
=============================*/

const botoes = document.querySelectorAll(".btn");

botoes.forEach((botao)=>{

    botao.addEventListener("mouseenter",()=>{

        botao.style.letterSpacing="2px";

    });

    botao.addEventListener("mouseleave",()=>{

        botao.style.letterSpacing="1px";

    });

});


/*=============================
TEXTO APARECENDO
=============================*/

const titulo = document.querySelector(".hero-text h1");

let texto = titulo.textContent;

titulo.textContent="";

let i = 0;

function escrever(){

    if(i < texto.length){

        titulo.textContent += texto.charAt(i);

        i++;

        setTimeout(escrever,120);

    }

}

window.addEventListener("load", escrever);