import '@/styles/preview-main.scss';

const VK_ACCES = {
    PHOTOS: 8,
    GROUP: 262144
}

window.onload = function () {
    VK.init({
        apiId: 7484286
    });
    const authButton = document.getElementsByClassName('promo-button')[0];
    const authClose = document.getElementsByClassName('window-auth_form__close')[0];
    const authForm = document.getElementsByClassName('window-auth_form')[0];
    authForm.onsubmit = authorization;
    authButton.onclick = openAuthorization;
    authClose.onclick = openAuthorization;
}

function authorization(event) {
    VK.Auth.login((response) => {
            if (response.status === 'connected') { // авторизация прошла успешно
                const user = {
                    id: response.session.user.id,
                    name: response.session.user.first_name,
                };
            } else if (response.status === 'not_authorized') { // пользователь авторизован в ВКонтакте, но не разрешил доступ приложению;

            } else if (response.status === 'unknown') { // пользователь не авторизован ВКонтакте.

            }

        }, VK_ACCES.GROUP, VK_ACCES.PHOTOS
    );
}
