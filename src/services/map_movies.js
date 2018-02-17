const positions = require('../enums/positions.enum');

module.exports = (movies) => {
  const obj = {};
  movies.forEach((movie) => {
    if (!(movie.mId in obj)) {
      obj[movie.mId] = {
        id: 0,
        name: '',
        year: 0,
        rating: 0,
        countries: [],
        genres: [],
      };
    }
    obj[movie.mId].id = movie.mId;
    obj[movie.mId].name = movie.mName;
    obj[movie.mId].year = movie.mYear;
    obj[movie.mId].rating = movie.mRating;

    // form movie-countries array
    if (!obj[movie.mId].countries.find(({ id }) => id === movie.coId)) {
      obj[movie.mId].countries.push({ id: movie.coId, name: movie.coName });
    }

    // form movie-genres array
    if (!obj[movie.mId].genres.find(({ id }) => id === movie.gId)) {
      obj[movie.mId].genres.push({ id: movie.gId, name: movie.gName });
    }

    // form movie-persons array for a single movie
    if (movie.peId && !obj[movie.mId].persons) {
      obj[movie.mId].persons = [];
    }
    if (movie.peId && !obj[movie.mId].persons.find(({ id }) => id === movie.peId)) {
      obj[movie.mId].persons.push({
        id: movie.peId,
        fName: movie.peFName,
        lName: movie.peLName,
        nick: movie.peNick,
        positions: [],
      });
    }

    // form person-position array for a single movie
    if (movie.poId) {
      const person = obj[movie.mId].persons.find(({ id }) => id === movie.peId);
      let position = person.positions.find(({ id }) => id === movie.poId);

      if (!position) {
        position = { id: movie.poId, name: movie.poName };
        person.positions.push(position);
      }
      // form position-characters array for the actor position
      if (movie.poId === positions.actor.id && !position.characters) {
        position.characters = [];
      }

      if (movie.chId && !position.characters.find(({ id }) => id === movie.chId)) {
        position.characters.push({
          id: movie.chId,
          fName: movie.chFName,
          lName: movie.chLName,
          nick: movie.chNick,
        });
      }
    }
  });

  return Object.values(obj);
};
