exports.seed = knex => knex('MoviePersons')
  .del()
  .then(() => knex.batchInsert('MoviePersons', [
    {
      movieId: 1,
      personId: 1,
      positionId: 2,
      characterId: null,
    },
    {
      movieId: 1,
      personId: 2,
      positionId: 5,
      characterId: null,
    },
    {
      movieId: 1,
      personId: 3,
      positionId: 5,
      characterId: null,
    },
    {
      movieId: 1,
      personId: 4,
      positionId: 1,
      characterId: 1,
    },
    {
      movieId: 1,
      personId: 5,
      positionId: 1,
      characterId: 2,
    },
    {
      movieId: 1,
      personId: 6,
      positionId: 1,
      characterId: 3,
    },
    {
      movieId: 1,
      personId: 7,
      positionId: 4,
      characterId: null,
    },
    {
      movieId: 1,
      personId: 8,
      positionId: 4,
      characterId: null,
    },
    {
      movieId: 1,
      personId: 9,
      positionId: 3,
      characterId: null,
    },

    {
      movieId: 2,
      personId: 10,
      positionId: 2,
      characterId: null,
    },
    {
      movieId: 2,
      personId: 11,
      positionId: 5,
      characterId: null,
    },
    {
      movieId: 2,
      personId: 12,
      positionId: 5,
      characterId: null,
    },
    {
      movieId: 2,
      personId: 13,
      positionId: 4,
      characterId: null,
    },
    {
      movieId: 2,
      personId: 14,
      positionId: 3,
      characterId: null,
    },
    {
      movieId: 2,
      personId: 15,
      positionId: 1,
      characterId: 4,
    },
    {
      movieId: 2,
      personId: 15,
      positionId: 1,
      characterId: 5,
    },
    {
      movieId: 2,
      personId: 16,
      positionId: 1,
      characterId: 4,
    },
    {
      movieId: 2,
      personId: 16,
      positionId: 1,
      characterId: 5,
    },
  ]));
