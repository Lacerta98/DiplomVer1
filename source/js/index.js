import '@/styles/preview-main.scss';

const VK_ACCESS = {
    PHOTOS: 8,
    GROUP: 262144
};
const confirmation = document.getElementsByClassName('window-auth')[0];
const authButton = document.getElementsByClassName('promo-button')[0];
const authClose = document.getElementsByClassName('window-auth_form__close')[0];

authButton.addEventListener('click', authorization);
authClose.onclick = openWaring;

VK.init({
    apiId: 7484286
});

function authorization(event) {
    VK.Auth.login((response) => {
            if (response.status === 'connected') { // авторизация прошла успешно
                setCookie('machine_analyst', JSON.stringify(response), {'max-age': 3600});
                document.location.href = 'http://y906521i.beget.tech/group.html';
            } else if (response.status === 'not_authorized') { // пользователь авторизован в ВКонтакте, но не разрешил доступ приложению;
                openWaring();
            } else if (response.status === 'unknown') { // пользователь не авторизован ВКонтакте.
                openWaring();
            }

        }, VK_ACCESS.GROUP
    );
}

function openWaring() {
    confirmation.classList.toggle('hidden');
}

function setCookie(name, value, options = {}) {

    options = {
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


