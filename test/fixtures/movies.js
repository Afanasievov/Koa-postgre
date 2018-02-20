module.exports = {
  all: {
    status: 200,
    headers: { 'content-type': 'application/json' },
    data: {
      status: 'OK',
      data: [
        {
          id: 1,
          name: 'Casablanca',
          year: 1942,
          rating: 8.5,
          countries: [
            {
              id: 236,
              name: 'United States',
            },
          ],
          genres: [
            {
              id: 6,
              name: 'Drama',
            },
            {
              id: 8,
              name: 'Historical',
            },
          ],
        },
        {
          id: 2,
          name: 'Face/Off',
          year: 1997,
          rating: 7.3,
          countries: [
            {
              id: 236,
              name: 'United States',
            },
          ],
          genres: [
            {
              id: 2,
              name: 'Action',
            },
            {
              id: 5,
              name: 'Crime',
            },
            {
              id: 19,
              name: 'Science fiction',
            },
            {
              id: 23,
              name: 'Thriller',
            },
          ],
        },
        {
          id: 3,
          name: 'Notorious',
          year: 1946,
          rating: 8.0,
          countries: [
            {
              id: 236,
              name: 'United States',
            },
          ],
          genres: [
            {
              id: 6,
              name: 'Drama',
            },
            {
              id: 16,
              name: 'Romance',
            },
            {
              id: 23,
              name: 'Thriller',
            },
          ],
        },
        {
          id: 4,
          name: 'The Rock',
          year: 1996,
          rating: 7.4,
          countries: [
            {
              id: 236,
              name: 'United States',
            },
          ],
          genres: [
            {
              id: 2,
              name: 'Action',
            },
            {
              id: 3,
              name: 'Adventure',
            },
            {
              id: 23,
              name: 'Thriller',
            },
          ],
        },
      ],
    },
  },
  single: {
    success: {
      status: 200,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'OK',
        data: {
          id: 1,
          name: 'Casablanca',
          year: 1942,
          rating: 8.5,
          countries: [
            {
              id: 236,
              name: 'United States',
            },
          ],
          genres: [
            {
              id: 6,
              name: 'Drama',
            },
            {
              id: 8,
              name: 'Historical',
            },
          ],
          persons: [
            {
              id: 1,
              fName: 'Michael',
              lName: 'Curtiz',
              nick: 'Miska',
              positions: [
                {
                  id: 2,
                  name: 'Director',
                },
              ],
            },
            {
              id: 2,
              fName: 'Julius J.',
              lName: 'Epstein',
              nick: null,
              positions: [
                {
                  id: 5,
                  name: 'Writer',
                },
              ],
            },
            {
              id: 3,
              fName: 'Philip G.',
              lName: 'Epstein',
              nick: null,
              positions: [
                {
                  id: 5,
                  name: 'Writer',
                },
              ],
            },
            {
              id: 4,
              fName: 'Humphrey',
              lName: 'Bogart',
              nick: 'Bogie',
              positions: [
                {
                  id: 1,
                  name: 'Actor',
                  characters: [
                    {
                      id: 1,
                      fName: 'Rick',
                      lName: 'Blaine',
                      nick: null,
                    },
                  ],
                },
              ],
            },
            {
              id: 5,
              fName: 'Ingrid',
              lName: 'Bergman',
              nick: null,
              positions: [
                {
                  id: 1,
                  name: 'Actor',
                  characters: [
                    {
                      id: 2,
                      fName: 'Ilsa',
                      lName: 'Lund',
                      nick: null,
                    },
                  ],
                },
              ],
            },
            {
              id: 6,
              fName: 'Paul',
              lName: 'Henreid',
              nick: null,
              positions: [
                {
                  id: 1,
                  name: 'Actor',
                  characters: [
                    {
                      id: 3,
                      fName: 'Victor',
                      lName: 'Laszlo',
                      nick: null,
                    },
                  ],
                },
              ],
            },
            {
              id: 7,
              fName: 'Hal B.',
              lName: 'Wallis',
              nick: null,
              positions: [
                {
                  id: 4,
                  name: 'Producer',
                },
              ],
            },
            {
              id: 8,
              fName: 'Jack L.',
              lName: 'Warner',
              nick: 'Mr. Warner',
              positions: [
                {
                  id: 4,
                  name: 'Producer',
                },
              ],
            },
            {
              id: 9,
              fName: 'Max',
              lName: 'Steiner',
              nick: 'Mr. Warner',
              positions: [
                {
                  id: 3,
                  name: 'Music',
                },
              ],
            },
          ],
        },
      },
    },
    failure: {
      status: 404,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'Not Found',
        message: 'Not Found',
      },
    },
  },
  add: {
    success: {
      status: 201,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'Created',
        data: {
          id: 5,
          name: 'Titanic',
          year: 1997,
          rating: 7.8,
          info: null,
          created_at: null,
          updated_at: null,
        },
      },
    },
    failure: {
      status: 400,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'Bad Request',
        message: 'Something went wrong',
      },
    },
  },
  update: {
    success: {
      status: 200,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'OK',
        data: {
          id: 5,
          name: 'Titanic',
          year: 1997,
          rating: 9,
          info: '',
        },
      },
    },
    failure: {
      status: 404,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'Not Found',
        message: 'Something went wrong',
      },
    },
  },
  delete: {
    success: {
      status: 200,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'OK',
        data: {
          id: 5,
          name: 'Titanic',
          year: 1997,
          rating: 9,
          info: '',
        },
      },
    },
    failure: {
      status: 404,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'Not Found',
        message: 'Something went wrong',
      },
    },
  },
};
