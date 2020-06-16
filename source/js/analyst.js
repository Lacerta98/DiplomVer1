import {Cookie} from '@/js/cookie'
import {Vk} from '@/js/vk'
import {Base} from '@/js/base'
import '@/styles/publications.scss';
import '@/styles/analyst.scss';

const vk = new Vk();
const cookie = new Cookie();
const base = new Base();

const backButton = document.getElementsByClassName('header__button')[0];
backButton.onclick = base.out;

try {
    const publication = JSON.parse(cookie.get('publication'));
    const positiveContainer = document.getElementsByClassName('comments-positive')[0];
    const neutralContainer = document.getElementsByClassName('comments-neutral')[0];
    const negativeContainer = document.getElementsByClassName('comments-negative')[0];
    vk.getComments(publication.owner_id, publication.id).then(function (data) {
        const comments = data.items;
        analystTonal(comments).then(tonal => {
            addComments(tonal.positive_comments, positiveContainer);
            addComments(tonal.neutral_comments, neutralContainer);
            addComments(tonal.negative_comments, negativeContainer);

            drawDonut('analyticTonal', [{
                    label: 'Позитивные',
                    value: tonal.positive_comments.length
                }, {
                    label: 'Нейтральные',
                    value: tonal.neutral_comments.length
                }, {
                    label: 'Отрицательные',
                    value: tonal.negative_comments.length
                }]
            );
        });
        analystSex(comments);
        analystCity(comments);
    });
    vk.getLikes('post', publication.owner_id, publication.id).then(data => {
        drawDonut('analyticVisible', [{
                label: 'Лайки',
                value: data.count
            }, {
                label: 'Просмотры',
                value: publication.views.count
            }]
        );
        analystSex(data.items);
        analystCity(data.items);
    });
} catch (e) {
    document.location.href = 'http://y906521i.beget.tech/group.html';
}

function analystTonal(comments) {
    return new Promise(res => {
        const commentsAnalyst = [];
        comments.forEach(function (comment) {
            if (comment.text) {
                let commentText = comment.text.replace(/\r?\n/g, "")
                commentsAnalyst.push(commentText.replace(/"/g, ''));
            }
        });
        const XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
        const xhr = new XHR(); // (2) запрос на другой домен :)

        xhr.open('POST', 'http://8e2dd6ec7b03.ngrok.io', true);

        xhr.onload = function () {
            res(JSON.parse(this.responseText));
        };

        xhr.onerror = function () {
            alert('Ошибка ' + this.status);
        };

        xhr.send(JSON.stringify(commentsAnalyst));
    });
}

function analystSex(items) {
    const sex = {
        girls: 0,
        boys: 0
    };
    let users = [];
    let container;
    if (items[0].from_id) {
        container = 'analyticSex';
        items.forEach(function (comment) {
            users.push(comment.from_id);
        });
    } else {
        users = items;
        container = 'analyticSexLike';
    }
    vk.getInformationUsers(users, 'sex').then(function (data) {
        data.forEach(function (user) {
            user.sex === 2 ? sex.boys++ : sex.girls++;
        });
        drawBar(container,  [{
                label: 'Пол',
                valueGirl: sex.girls,
                valueBoy: sex.boys
            }]
        );
    });
}

function analystCity(items) {
    const city = {};
    let users = [];
    let container;
    if (items[0].from_id) {
        container = 'analyticCity';
        items.forEach(function (comment) {
            users.push(comment.from_id);
        });
    } else {
        container = 'analyticCityLike';
        users = items;
    }
    vk.getInformationUsers(users, 'city').then(function (data) {
        data.forEach(function (user) {
            if (user.city) {
                if (city[user.city.title]) {
                    city[user.city.title]++;
                } else {
                    city[user.city.title] = 1;
                }
            }
        });
        city.Омск = 3;
        city.Киров = 2;
        city['Санкт-Петербург'] = 1;
        city.Москва = 1;
        let citySort = [];
        Object.entries(city).sort(function (a, b) {
            return a[1] < b[1] ? 1 : -1;
        }).map(function (el, index) {
            if (index < 5) {
                citySort.push(el);
            }
        });
        citySort = Object.fromEntries(citySort)
        drawBar(container, [Object.assign({label: 'Город'}, citySort)], Object.keys(citySort));
    });
}

function drawDonut(element, data) {
    new Morris.Donut({
        element: 'analyticVisible',
        data: data,
        colors: ['#DE193A', '#5F5A59', '#BFC274']
    });
}

function drawBar(element, data, labels) {
    new Morris.Bar({
        element: element,
        data: data,
        xkey: 'label',
        ykeys: labels ? labels : ['valueGirl', 'valueBoy'],
        labels: labels ? labels : ['Женский', 'Мужской'],
        barColors: ['#DE193A', '#000000', '#5F5A59'],
    });
}

function addComments(comments, container) {
    if (comments.length) {
        for (let i = 0; i < comments.length && i < 2; i++) {
            container.append(base.createHTMLElement('p', 'comment', comments[i]));
        }
    } else {
        container.append(base.createHTMLElement('p', 'comment', 'Нет'));
    }
}
