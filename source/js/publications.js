import {Cookie} from '@/js/cookie'
import {Vk} from '@/js/vk'
import {Base} from '@/js/base'
import '@/styles/publications.scss';

const vk = new Vk();
const cookie = new Cookie();
const base = new Base();
const promoText = document.getElementsByClassName('header__text')[0];
const backButton = document.getElementsByClassName('header__button')[0];

backButton.onclick = base.out;
try {
    const group = JSON.parse(cookie.get('group'));
    promoText.innerHTML = `Группа <span class=\"text_color_red\">${group.name}</span>`;
    const container = document.getElementsByClassName('publications')[0];
    vk.getPublications(group.id).then(function (data) {
        const publications = data.items;

        for (let i = 0; i < publications.length; i++) {
            const publication = publications[i];

            const item = base.createHTMLElement('li', 'publication');

            const img = base.createHTMLElement('div', 'publication-avatar');
            img.style.backgroundImage = "url(".concat(publication.attachments && publication.attachments[0].photo ? publication.attachments[0].photo.photo_604 : 'https://tiltedchair.co/wp-content/uploads/2018/01/red-paperclip.jpg', ")");

            const textContainer = base.createHTMLElement('div', 'publication-information');
            const text = base.createHTMLElement('p', 'publication-information__text', publication.text);
            const arrowAnalyst = base.createHTMLElement('div', 'publication-information__arrow');

            arrowAnalyst.information = publication;

            textContainer.append(text);
            textContainer.append(arrowAnalyst);

            if (i % 2) {
                item.append(textContainer);
                item.append(img);
            } else {
                item.append(img);
                item.append(textContainer);
            }

            container.append(item);
            arrowAnalyst.onclick = function (event) {
                base.forward(event, 'publication', 'http://y906521i.beget.tech/analyst.html');
            };
        }
    });
} catch (e) {
    document.location.href = 'http://y906521i.beget.tech/group.html';
}
