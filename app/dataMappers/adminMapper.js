const Person = require('../models/person');
const db = require('../database');




const adminMapper = {

updatePerson: async (thePerson, id) => {
    const person = [
        thePerson.nickname,
        thePerson.email,
        thePerson.password,
        thePerson.role_id,
        id
    ];
    //console.log(thePerson);
        let queryPerson = (`
            UPDATE person
            SET nickname = $1,
                email = $2,
                password = $3,
                role_id = $4
            WHERE id = $5
            RETURNING *;
            `);  
            try {
            let result  = await db.query(queryPerson, person);
            console.log("je suis le log du admin mapper", person);
            return result.rows[0];
            } catch (error) {
            console.log(error);
            }
}

};

module.exports = adminMapper;