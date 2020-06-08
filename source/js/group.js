import {Cookie} from '@/js/cookie'
import {Vk} from '@/js/vk'
import '@/styles/group.scss';

const vk = new Vk();
const cookie = new Cookie();
const promoText = document.getElementsByClassName('promo_text')[0];
const backButton = document.getElementsByClassName('button')[0];

backButton.onclick = out;

try {
    const user = JSON.parse(cookie.get('machine_analyst'));
    promoText.innerHTML = `Добро пожаловать <span class="promo_text-name">${user.session.user.first_name}</span>`;

    const container = document.getElementsByClassName('groups')[0];
    vk.getGroups(user.session.mid).then(data => {
        const groups = data.response.items;
        groups.forEach((group) => {
            const item = createHTMLElement('li', 'group');
            item.information = group;

            const img = createHTMLElement('div', 'group-avatar');
            img.style.backgroundImage = `url(${group.photo_200})`;
            item.append(img);

            const text = createHTMLElement('p', 'group-name', group.name);
            item.append(text);

            container.append(item);
            item.onmouseenter=item.onmouseleave=hover;
            item.addEventListener('click', groupClick);
        })
    });
} catch (e) {
    document.location.href = 'http://y906521i.beget.tech';
}

function createHTMLElement(elementName, className, textContent) {
    let element = document.createElement(elementName);
    if (className) {
        element.className = className;
    }
    if (textContent) {
        element.textContent = textContent;
    }
    return  element
}

function hover(event) {
    const text = event.target.getElementsByClassName('group-name')[0];
    const img = event.target.getElementsByClassName('group-avatar')[0];
    text.classList.toggle('text-red');
    img.classList.toggle('not-filter');
}

function out() {
    cookie.delete('machine_analyst');
    document.location.href = 'http://y906521i.beget.tech';
}

function groupClick() {
    cookie.set('group', JSON.stringify(this.information), {'max-age': 3600});
    document.location.href = 'http://y906521i.beget.tech/publications.html';
}
