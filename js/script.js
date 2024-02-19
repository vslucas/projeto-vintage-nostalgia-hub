//As configurações de estilo do botão scroll-to-top estão no _typography)
/*Função será executada quando o documento HTML estiver totalmente carregado e analisado*/
document.addEventListener('DOMContentLoaded', function () {
    let btn = document.getElementById('scrollToTopBtn');

    /*Uma função é executada sempre que o usuário scrollar para baixo para visualizar o restante da página:*/
    addEventListener('scroll', function () {
        /*Essa condição determina se o botão aparecerá ou não ao usuário dependendo de onde ele está na página:*/
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    /*O evento abaixo vai evitar o comportamento padrão onde o usuário seria jogado imediatamente ao início da página após clicar no botão:*/
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToTop();
    });

    /*Executa uma função para retornar o usuário ao início da página de forma suave*/
    function scrollToTop() {
        let scrollStep = -scrollY / (300 / 15);
        let scrollInterval = setInterval(function () {
            if (scrollY !== 0) {
                scrollBy(0, scrollStep);
            } else {
                /*Limpa o intervalo para evitar um looping na animação de scroll até o topo*/
                clearInterval(scrollInterval);
            }
        }, 15);
    }
});

// Marcação dos ícones de favorito
document.addEventListener("DOMContentLoaded", function () {
    /*Variável que vai se ligar a todos os ícones de favorito da página*/
    let hearts = document.querySelectorAll('.display__favorite');

    /*Cada ícone selecionado pelo usuário é destacado*/
    hearts.forEach(function (heart) {
        heart.addEventListener("click", function () {
            /*Alterna a classe display__fulfilled ao clicar*/
            heart.classList.toggle('display__fulfilled');
        });
    });
});

//Mostrar as fotos da galeria em tela cheia
/*Variáveis para ligação das fotos da galeria, o container que vai exibi-las em tela cheia e a imagem que será mostrada no momento*/
const galleryItems = document.querySelectorAll('.gallery__item');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');

/* O método abaixo é executado para mostrar em tela cheia a imagem clicada pelo usuário:*/
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openModal(index);
    });
});

/*Executa uma função que será responsável por abrir o modal e exibir a imagem selecionada:*/
function openModal(index) {
    modalImage.src = galleryItems[index].querySelector('img').src;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/*Executa uma função para fechar o modal e retornar o fluxo natural do documento:*/
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/*Verifica se o modal está ou não aberto. Em caso positivo, certas ações podem ser executadas dependendo das teclas pressionadas:*/
document.addEventListener('keydown', (event) => {
    if (modal.style.display === 'flex') {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowRight') {
            navigateGallery(1);
        } else if (event.key === 'ArrowLeft') {
            navigateGallery(-1);
        }
    }
});

/*Executa uma função responsável por navegar na galeria de fotos passando para o item anterior ou posterior com base na direção fornecida:*/
function navigateGallery(direction) {
    const currentIndex = Array.from(galleryItems).findIndex(item => item.querySelector('img').src === modalImage.src);
    const newIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    openModal(newIndex);
}