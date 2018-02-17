const knex = require('../connection');

const getPersons = () =>
  knex('Persons')
    .select({
      peId: 'Persons.id',
      peFName: 'Persons.fName',
      peLName: 'Persons.lName',
      peNick: 'Persons.nick',
      peBirthDate: 'Persons.birthDate',
      peInfo: 'Persons.info',
      mId: 'Movies.id',
      mName: 'Movies.name',
      mYear: 'Movies.year',
    })
    .innerJoin('MoviePersons', 'MoviePersons.personId', 'Persons.id')
    .innerJoin('Movies', 'Movies.id', 'MoviePersons.movieId');

const getSinglePerson = id =>
  knex('Persons')
    .select({
      peId: 'Persons.id',
      peFName: 'Persons.fName',
      peLName: 'Persons.lName',
      peNick: 'Persons.nick',
      peBirthDate: 'Persons.birthDate',
      peInfo: 'Persons.info',
      mId: 'Movies.id',
      mName: 'Movies.name',
      mYear: 'Movies.year',
      poId: 'Positions.id',
      poName: 'Positions.name',
      chId: 'Characters.id',
      chFName: 'Characters.fName',
      chLName: 'Characters.lName',
      chNick: 'Characters.nick',
    })
    .leftOuterJoin('MoviePersons', 'MoviePersons.personId', 'Persons.id')
    .leftOuterJoin('Movies', 'Movies.id', 'MoviePersons.movieId')
    .leftOuterJoin('Positions', 'Positions.id', 'MoviePersons.positionId')
    .leftOuterJoin('Characters', 'Characters.id', 'MoviePersons.characterId')
    .where('Persons.id', id);

const addPerson = (movie) => {
  const countries = [];
  const genres = [];
  return knex.transaction(trx =>
    trx
      .insert(movie, 'id')
      .into('Movies') // insert Movies
      .then((id) => {
        movie.countries.forEach(countryId => countries.push({ countryId, movieId: id }));
        movie.genres.forEach(genreId => countries.push({ genreId, movieId: id }));

        return trx.insert(countries).into('MovieCountries'); // insert movie-countries relations
      })
      .then(() => trx.insert(genres).into('MoviesGenres'))); // insert movie-genres relations
};

const updatePerson = (id, Movie) =>
  knex('Movies')
    .update(Movie)
    .where({
      id: parseInt(id, 10),
    })
    .returning('*');

const deletePerson = id =>
  knex('Movies')
    .del()
    .where({
      id: parseInt(id, 10),
    })
    .returning('*');

module.exports = {
  getPersons,
  getSinglePerson,
  addPerson,
  updatePerson,
  deletePerson,
};
