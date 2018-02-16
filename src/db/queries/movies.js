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
    .innerJoin('MovieCountries', 'MovieCountries.id', 'Movies.id')
    .innerJoin('Countries', 'Countries.id', 'MovieCountries.countryId')
    .innerJoin('MovieGenres', 'MovieGenres.movieId', 'Movies.id')
    .innerJoin('Genres', 'Genres.id', 'MovieGenres.genreId');

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
    .innerJoin('MovieCountries', 'MovieCountries.movieId', 'Movies.id')
    .innerJoin('Countries', 'Countries.id', 'MovieCountries.countryId')
    .innerJoin('MovieGenres', 'MovieGenres.movieId', 'Movies.id')
    .innerJoin('Genres', 'Genres.id', 'MovieGenres.genreId')
    .leftOuterJoin('MoviePersons', 'MoviePersons.movieId', 'Movies.id')
    .leftOuterJoin('Persons', 'Persons.id', 'MoviePersons.personId')
    .leftOuterJoin('Positions', 'Positions.id', 'MoviePersons.positionId')
    .leftOuterJoin('Characters', 'Characters.id', 'MoviePersons.characterId')
    .where('Movies.id', id);

const addMovie = (movie) => {
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

const updateMovie = (id, Movie) =>
  knex('Movies')
    .update(Movie)
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
