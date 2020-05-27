import '@/styles/preview-main.scss';

window.onload = function () {
    const authButton = document.getElementsByClassName('promo-button')[0];
    const authClose = document.getElementsByClassName('window-auth_form__close')[0];
    const authForm = document.getElementsByClassName('window-auth_form')[0];
    authForm.onsubmit = authorization;
    authButton.onclick = openAuthorization;
    authClose.onclick = openAuthorization;
}

function openAuthorization() {
    const window = document.getElementsByClassName('window-auth')[0];
    window.classList.toggle('hidden');
}

function authorization() {
    const login = document.getElementsByClassName('window-auth_form__login')[0];
    const password = document.getElementsByClassName('window-auth_form__password')[0];
    if (login.value && password.value) {
        alert('Вы отправили форму!');
    }
    return false;
}

