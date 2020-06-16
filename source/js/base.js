import {Cookie} from "@/js/cookie";

const cookie = new Cookie();
export class Base {
    createHTMLElement(elementName, className, textContent) {
        const element = document.createElement(elementName);

        if (className) {
            element.className = className;
        }

        if (textContent) {
            element.textContent = textContent;
        }

        return element;
    }

    out() {
        cookie.delete('machine_analyst');
        cookie.delete('group');
        cookie.delete('publication');
        document.location.href = 'http://y906521i.beget.tech';
    }

    forward(event, name, href) {
        cookie.set(name, JSON.stringify(event.currentTarget.information), {'max-age': 3600});
        document.location.href = href;
    }
}
