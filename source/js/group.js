import '@/styles/preview-main.scss';
const user = JSON.parse(getCookie('machine_analyst'))
const promoText = document.getElementsByClassName('promo_text')[0];

VK.init({
    apiId: 7484286
});

promoText.innerHTML = `Добро пожаловать ${user.session.user.first_name}`;

VK.api("groups.get", {user_id: user.session.mid, extended: 1, filter: 'moder', "v":"5.73"}, function (data) {
    const container = document.getElementsByClassName('groups');
    const groups = data.response.items;
    groups.forEach((group) => {
        let item = document.createElement('li');
        item.className = 'group';
        item.innerHTML = `<div class="group-name" style=${'background-image: ' + group.photo_200}> ${group.name} </div>`
        container.append(item);
    })
});

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

