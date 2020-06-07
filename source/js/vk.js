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
}
