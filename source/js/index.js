import '@/styles/preview-main.scss';

const VK_ACCESS = {
    PHOTOS: 8,
    GROUP: 262144
};
const confirmation = document.getElementsByClassName('window-auth')[0];
const authButton = document.getElementsByClassName('promo-button')[0];
const authClose = document.getElementsByClassName('window-auth_form__close')[0];

authButton.onclick = authorization;
authClose.onclick = openWaring;

VK.init({
    apiId: 7484286
});

function authorization(event) {
    setCookie('nast', '123')
    document.location.href = '/group.html';
}

function openWaring() {
    confirmation.classList.toggle('hidden');
}

function setCookie(name, value) {
    let options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}