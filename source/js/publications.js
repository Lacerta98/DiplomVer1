import {Cookie} from '@/js/cookie'
import {Vk} from '@/js/vk'
import '@/styles/publications.scss';

const vk = new Vk();
const cookie = new Cookie();
const promoText = document.getElementsByClassName('header__text')[0];
const backButton = document.getElementsByClassName('header__button')[0];

backButton.onclick = out;
try {
    const group = JSON.parse(cookie.get('group'));
    promoText.innerHTML = `Группа <span class="text_color_red">${group.name}</span>`;

    const container = document.getElementsByClassName('publications')[0];
    vk.getPublications(group.id).then(data => {
        const publications = data.items;
        for (let i = 0; i < publications.length; i++) {
            const publication = publications[i];

            const item = createHTMLElement('li', 'publication');
            item.information = publication;

            const img = createHTMLElement('div', 'publication-avatar');
            img.style.backgroundImage = `url(${publication.attachments ? publication.attachments[0].photo.photo_604 :
                'https://tiltedchair.co/wp-content/uploads/2018/01/red-paperclip.jpg'})`;

            const textContainer = createHTMLElement('div', 'publication-information')
            const text = createHTMLElement('p', 'publication-information__text', publication.text);
            const arrowAnalyst = createHTMLElement('div', 'publication-information__arrow');
            textContainer.append(text);
            textContainer.append(arrowAnalyst);
            if (i%2) {
                item.append(textContainer);
                item.append(img);
            } else {
                item.append(img);
                item.append(textContainer);
            }
            container.append(item);
            item.addEventListener('click', publicationClick);
        }
    });

} catch (e) {
    document.location.href = 'http://y906521i.beget.tech/group.html';
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

function out() {
    cookie.delete('machine_analyst');
    document.location.href = 'http://y906521i.beget.tech';
}

function publicationClick() {
    console.log(this.information)
}
