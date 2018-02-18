const positions = require('../enums/positions.enum');

module.exports = (persons) => {
  const obj = {};
  persons.forEach((person) => {
    if (!(person.peId in obj)) {
      obj[person.peId] = {
        id: 0,
        fName: '',
        lName: '',
        nick: '',
        birthDate: '',
        movies: [],
      };
    }
    obj[person.peId].id = person.peId;
    obj[person.peId].fName = person.peFName;
    obj[person.peId].lName = person.peLName;
    obj[person.peId].nick = person.peNick;
    obj[person.peId].birthDate = person.peBirthDate;

    // form person-movies array
    if (!obj[person.peId].movies.find(({ id }) => id === person.mId)) {
      obj[person.peId].movies.push({
        id: person.mId,
        name: person.mName,
        year: person.mYear,
        positions: [],
      });
    }

    // form movie-positions array
    if (person.poId) {
      const movie = obj[person.peId].movies.find(({ id }) => id === person.mId);
      let position = movie.positions.find(({ id }) => id === person.poId);

      if (!position) {
        position = { id: person.poId, name: person.poName };
        movie.positions.push(position);
      }
      // form position-characters array for the actor position
      if (person.poId === positions.actor.id && !position.characters) {
        position.characters = [];
      }

      if (person.chId && !position.characters.find(({ id }) => id === person.chId)) {
        position.characters.push({
          id: person.chId,
          fName: person.chFName,
          lName: person.chLName,
          nick: person.chNick,
        });
      }
    }
  });

  return Object.values(obj);
};
