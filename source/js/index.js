import '@/styles/preview-main.scss';

window.onload = function () {
    const authButton = document.getElementsByClassName('promo-button')[0];
    authButton.onclick = authorization;
}

function authorization(event) {
    const window = document.getElementsByClassName('window-auth')[0];
    window.classList.remove('hidden');
}
