exports.seed = knex =>
  knex('Movies')
    .del()
    .then(() =>
      knex.batchInsert('Movies', [
        {
          name: 'Casablanca',
          year: 1942,
          rating: 8.5,
          info: 'The story of Rick Blaine, a cynical world-weary ex-patriate who runs a nightclub in Casablanca, Morocco during the early stages of WWII. Despite the pressure he constantly receives from the local authorities, Rick\'s cafe has become a kind of haven for refugees seeking to obtain illicit letters that will help them escape to America. But when Ilsa, a former lover of Rick\'s, and her husband, show up to his cafe one day, Rick faces a tough challenge which will bring up unforeseen complications, heartbreak and ultimately an excruciating decision to make. Written by Kyle Perez',
        },
        {
          name: 'Face/Off',
          year: 1997,
          rating: 7.3,
          info: 'In order to foil an extortion plot, an FBI agent undergoes a facial transplant surgery and assumes the identity and physical appearance of a terrorist, but the plan turns from bad to worse when the same terrorist impersonates the FBI agent.',
        },
      ]));