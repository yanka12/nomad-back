class Person {
    id;
    nickname;
    email;
    password;
  
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Person;