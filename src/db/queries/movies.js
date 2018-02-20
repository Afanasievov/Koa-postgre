const knex = require('../connection');

const getMovies = () =>
  knex('Movies')
    .select({
      mId: 'Movies.id',
      mName: 'Movies.name',
      mYear: 'Movies.year',
      mRating: 'Movies.rating',
      coId: 'Countries.id',
      coName: 'Countries.name',
      gId: 'Genres.id',
      gName: 'Genres.name',
    })
    .leftOuterJoin('MovieCountries', 'MovieCountries.id', 'Movies.id')
    .leftOuterJoin('Countries', 'Countries.id', 'MovieCountries.countryId')
    .leftOuterJoin('MovieGenres', 'MovieGenres.movieId', 'Movies.id')
    .leftOuterJoin('Genres', 'Genres.id', 'MovieGenres.genreId');

const getSingleMovie = id =>
  knex('Movies')
    .select({
      mId: 'Movies.id',
      mName: 'Movies.name',
      mYear: 'Movies.year',
      mRating: 'Movies.rating',
      coId: 'Countries.id',
      coName: 'Countries.name',
      gId: 'Genres.id',
      gName: 'Genres.name',
      peId: 'Persons.id',
      peFName: 'Persons.fName',
      peLName: 'Persons.lName',
      peNick: 'Persons.nick',
      poId: 'Positions.id',
      poName: 'Positions.name',
      chId: 'Characters.id',
      chFName: 'Characters.fName',
      chLName: 'Characters.lName',
      chNick: 'Characters.nick',
    })
    .leftOuterJoin('MovieCountries', 'MovieCountries.movieId', 'Movies.id')
    .leftOuterJoin('Countries', 'Countries.id', 'MovieCountries.countryId')
    .leftOuterJoin('MovieGenres', 'MovieGenres.movieId', 'Movies.id')
    .leftOuterJoin('Genres', 'Genres.id', 'MovieGenres.genreId')
    .leftOuterJoin('MoviePersons', 'MoviePersons.movieId', 'Movies.id')
    .leftOuterJoin('Persons', 'Persons.id', 'MoviePersons.personId')
    .leftOuterJoin('Positions', 'Positions.id', 'MoviePersons.positionId')
    .leftOuterJoin('Characters', 'Characters.id', 'MoviePersons.characterId')
    .where('Movies.id', id);

const addMovie = movie =>
  knex('Movies')
    .insert(movie)
    .returning('*');

const updateMovie = (id, movie) =>
  knex('Movies')
    .update(movie)
    .where({
      id: parseInt(id, 10),
    })
    .returning('*');

const deleteMovie = id =>
  knex('Movies')
    .del()
    .where({
      id: parseInt(id, 10),
    })
    .returning('*');

module.exports = {
  getMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
