module.exports = {
  all: {
    status: 200,
    headers: { 'content-type': 'application/json' },
    data: {
      status: 'success',
      data: [
        {
          id: 4,
          name: 'The Land Before Time',
          genre: 'Fantasy',
          rating: 7,
          explicit: false,
        },
        {
          id: 5,
          name: 'Jurassic Park',
          genre: 'Science Fiction',
          rating: 9,
          explicit: true,
        },
        {
          id: 6,
          name: 'Ice Age: Dawn of the Dinosaurs',
          genre: 'Action/Romance',
          rating: 5,
          explicit: false,
        },
      ],
    },
  },
  single: {
    success: {
      status: 200,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'success',
        data: [
          {
            id: 4,
            name: 'The Land Before Time',
            genre: 'Fantasy',
            rating: 7,
            explicit: false,
          },
        ],
      },
    },
    failure: {
      status: 404,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'error',
        message: 'That movie does not exist.',
      },
    },
  },
  add: {
    success: {
      status: 201,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'success',
        data: [
          {
            id: 5,
            name: 'Titanic',
            genre: 'Drama',
            rating: 8,
            explicit: true,
          },
        ],
      },
    },
    failure: {
      status: 400,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'error',
        message: 'Something went wrong.',
      },
    },
  },
  update: {
    success: {
      status: 200,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'success',
        data: [
          {
            id: 5,
            name: 'Titanic',
            genre: 'Drama',
            rating: 9,
            explicit: true,
          },
        ],
      },
    },
    failure: {
      status: 404,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'error',
        message: 'That movie does not exist.',
      },
    },
  },
  delete: {
    success: {
      status: 200,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'success',
        data: [
          {
            id: 5,
            name: 'Titanic',
            genre: 'Drama',
            rating: 9,
            explicit: true,
          },
        ],
      },
    },
    failure: {
      status: 404,
      headers: { 'content-type': 'application/json' },
      data: {
        status: 'error',
        message: 'That movie does not exist.',
      },
    },
  },
};
