const knex = require('../connection');

const getAllMovies = () => knex({
  M: 'Movies', C: 'Countries', G: 'Genres', MC: 'MovieCountries', MG: 'MovieGenres',
})
  .select({
    mId: 'M.id',
    mName: 'M.name',
    mYear: 'M.year',
    mRating: 'M.rating',
    gName: 'G.name',
    cName: 'C.name',
  })
  .whereRaw(
    '?? = ?? and ?? = ?? and ?? = ?? and ?? = ??',
    ['MC.movieId', 'M.id', 'C.id', 'MC.countryId', 'MG.movieId', 'M.id', 'G.id', 'MG.genreId'],
  );

const getSingleMovie = id =>
  knex('Movies')
    .select('*')
    .where({
      id: parseInt(id, 10),
    });

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
  getAllMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
