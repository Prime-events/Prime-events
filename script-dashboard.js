const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');
const sideBar = document.querySelector('.container .left-section');
const sidebarItems = document.querySelectorAll('.container .left-section .sidebar .item');

// Função para abrir o menu lateral
function openMenu() {
    sideBar.style.top = '0';
}

// Função para fechar o menu lateral
function closeMenu() {
    sideBar.style.top = '-60vh';
}

// Verifica se a largura da tela é menor que 768px (tamanho típico de dispositivos móveis)
function isMobileScreen() {
    return window.innerWidth < 768;
}

// Adiciona eventos de clique aos botões de abrir e fechar o menu
menuOpen.addEventListener('click', () => {
    if (isMobileScreen()) {
        openMenu();
    }
});

menuClose.addEventListener('click', () => {
    if (isMobileScreen()) {
        closeMenu();
    }
});

let activeItem = sidebarItems[0];

// Adiciona eventos de clique aos itens do menu
sidebarItems.forEach(element => {
    element.addEventListener('click', () => {
        if (isMobileScreen()) {
            closeMenu();
        }

        if (activeItem) {
            activeItem.removeAttribute('id');
        }

        element.setAttribute('id', 'active');
        activeItem = element;
    });
});

// Fecha o menu quando a largura da tela for redimensionada para maior que 768px
window.addEventListener('resize', () => {
    if (!isMobileScreen()) {
        closeMenu();
    }
});
