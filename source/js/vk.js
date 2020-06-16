export class Vk {
    // инициализация вк
    constructor() {
        VK.init({
            apiId: 7484286
        });
    }

    // получение групп пользователя
    getGroups(mid) {
        return new Promise( res => {
            VK.api("groups.get", {user_id: mid, extended: 1, filter: 'moder', "v": "5.73"},
                (data) => {
                    res(data);
                });
        });
    }

    // получение публикаций пользователя
    getPublications(id) {
        return new Promise( res => {
            VK.api("wall.get", {owner_id: -id, "v": "5.73"},
                (data) => {
                    res(data.response);
                });
        });
    }

    getComments(from_id, id) {
        return new Promise( res => {
            VK.api("wall.getComments", {owner_id: from_id, post_id: id, "v": "5.73"},
                (data) => {
                    res(data.response);
                });
        });
    }

    getLikes(type, owner_id, item_id,) {
        return new Promise(res => {
            VK.api('likes.getList', {
                type: type,
                owner_id: owner_id,
                item_id: item_id,
                "v": "5.73"
            }, data => {
                res(data.response);
            });
        });
    }

    getInformationUsers(ids, inform) {
        return new Promise( res => {
            VK.api("users.get", {user_ids: ids, fields: inform, "v": "5.73"},
                data => {
                    res(data.response);
                });
        });
    }
}
