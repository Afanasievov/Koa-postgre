module.exports = (movies) => {
  const obj = {};

  movies.forEach(({
    mId,
    mName,
    mYear,
    mRating,
    cName,
    gName,
  }) => {
    if (!(mId in obj)) {
      obj[mId] = {
        id: 0,
        name: '',
        rating: 0,
        countries: [],
        genres: [],
      };
    }
    obj[mId].id = mId;
    obj[mId].name = mName;
    obj[mId].year = mYear;
    obj[mId].rating = mRating;

    if (!obj[mId].countries.includes(cName)) {
      obj[mId].countries.push(cName);
    }

    if (!obj[mId].genres.includes(gName)) {
      obj[mId].genres.push(gName);
    }
  });

  return Object.values(obj);
};
