import {Cookie} from '@/js/cookie'
import {Vk} from '@/js/vk'
import {Base} from '@/js/base'
import '@/styles/group.scss';

const vk = new Vk();
const cookie = new Cookie();
const base = new Base();
const promoText = document.getElementsByClassName('header__text')[0];
const backButton = document.getElementsByClassName('header__button')[0];

backButton.onclick = base.out;

try {
    const user = JSON.parse(cookie.get('machine_analyst'));
    promoText.innerHTML = `Добро пожаловать <span class="text_color_red">${user.session.user.first_name}</span>`;

    const container = document.getElementsByClassName('groups')[0];
    vk.getGroups(user.session.mid).then(data => {
        const groups = data.response.items;
        groups.forEach(group => {
            const item = base.createHTMLElement('li', 'group');
            item.information = group;

            const img = base.createHTMLElement('div', 'group-avatar');
            img.style.backgroundImage = `url(${group.photo_200})`;
            item.append(img);

            const text = base.createHTMLElement('p', 'group-name', group.name);
            item.append(text);

            container.append(item);
            item.onmouseenter=item.onmouseleave=hover;
            item.onclick = function (event) {
                base.forward(event, 'group', 'http://y906521i.beget.tech/publications.html');
            };
        })
    });
} catch (e) {
    document.location.href = 'http://y906521i.beget.tech';
}

function hover(event) {
    const text = event.target.getElementsByClassName('group-name')[0];
    const img = event.target.getElementsByClassName('group-avatar')[0];
    text.classList.toggle('text_color_red');
    img.classList.toggle('not-filter');
}
