class Article {
    id;
    name;
    description;
    content;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
}

module.exports = Article;
