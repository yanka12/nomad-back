const { expect } = require("chai");
const { personSchema } = require("../projet-nomad-back/app/schemas/person");
let mockPerson;
describe("Person schema", function () {
  // préparer un contexte favorable à l'exécution des TU
  before(function () {
    // l'objet à valider
    mockPerson = {
      nickname: "coucou",
      email: "/azokdazo",
      password: "aozjdazopd",
      role_id: "1",
    };
  });
  it("should validate a valid Person", function () {
    // valider un schéma valide, ça fonctionne
    // validate sur un schema Joi retourne un objet avec systématiquement une propriété value
    // et, en cas d'erreur, une propriété error
    expect(personSchema.validate(mockPerson)).not.to.have.property("error");
    it("should not validate a Person with an nickname not required", function () {
      // valider un schéma invalide retourne une erreur
      mockPerson.nickname = "";
      const validation2 = personSchema.validate(mockPerson);
      // pas de not ici, car il DOIT y avoir une prop error
      expect(validation2).to.have.property("error");
      // tous les tests "intermédiaires" sur le format d'error sont INUTILES
      // car ils sont déjà testés par Joi, qui fournit cet objet error
      expect(validation2.error.details[0].path[0]).to.equal("nickname");
    });
    it("should check that email is required", function () {
      // le xor sur category et categoryId est bien fonctionnel
      mockPerson.email = "";
      const validation3 = personSchema.validate(mockPerson);
      expect(validation3).to.have.property("error");
      expect(validation3.error.details[0].context.peers).to.deep.equal([
        "email",
      ]);
    });
  });
});
