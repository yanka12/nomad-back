class Category {
    id;
    name;
  
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
  }
  
module.exports = Category;