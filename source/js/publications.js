import {Cookie} from '@/js/cookie'
import {Vk} from '@/js/vk'
import '@/styles/publications.scss';

const vk = new Vk();
const cookie = new Cookie();
try {
    const group = JSON.parse(cookie.get('group'));
    const container = document.getElementsByClassName('publications')[0];
    vk.getPublications(group.id).then(data => {
        const publications = data.items;
        publications.forEach(publication => {
            const item = createHTMLElement('li', 'publication');
            item.information = publication;

            const img = createHTMLElement('div', 'publication-avatar');
            img.style.backgroundImage = `url(${publication.attachments[0].photo_604})`;
            item.append(img);

            const text = createHTMLElement('p', 'publication-name', publication.text);
            item.append(text);

            container.append(item);
            item.addEventListener('click', publicationClick);
        })
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

function publicationClick() {
    console.log(this.information)
}
