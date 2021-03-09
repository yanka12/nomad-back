class Person {
    id;
    nickname;
    email;
    password;
    role_id;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Person;