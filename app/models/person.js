class Person {
    id;
    nickname;
    email;
    password;
    role_name;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Person;