import {Cookie} from '@/js/cookie';
import {Vk} from '@/js/vk'
import '@/styles/preview-main.scss';

const vk = new Vk();
const cookie = new Cookie();
const VK_ACCESS = {
    PHOTOS: 8,
    GROUP: 262144
};
const confirmation = document.getElementsByClassName('window-auth')[0];
const authButton = document.getElementsByClassName('promo-button')[0];
const authClose = document.getElementsByClassName('window-auth_form__close')[0];

authButton.addEventListener('click', authorization);
authClose.onclick = openWaring;

function authorization() {
    VK.Auth.login((response) => {
        const status = response.status;
        if (status === 'connected') { // авторизация прошла успешно
            cookie.set('machine_analyst', JSON.stringify(response), {'max-age': 3600});
            document.location.href = 'http://y906521i.beget.tech/group.html';
        } else { // пользователь авторизован в ВКонтакте, но не разрешил доступ приложению или не авторизовался;
            openWaring();
        }
    }, VK_ACCESS.GROUP);
}

function openWaring() {
    confirmation.classList.toggle('hidden');
}


