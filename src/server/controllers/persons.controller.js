const codes = require('http-status-codes');
const queries = require('../../db/queries/persons');
const mapPersons = require('../services/map_persons');

const statuses = codes.getStatusText;

const getAllPersons = async (ctx) => {
  try {
    let persons = await queries.getPersons();

    persons = await mapPersons(persons);
    ctx.body = {
      status: statuses(codes.OK),
      data: persons,
    };
  } catch (err) {
    ctx.throw(err);
  }
};

const getSinglePerson = async (ctx) => {
  try {
    let person = await queries.getSinglePerson(ctx.params.id);

    person = await mapPersons(person)[0];
    if (person) {
      ctx.body = {
        status: statuses(codes.OK),
        data: person,
      };
    } else {
      ctx.throw(codes.NOT_FOUND);
    }
  } catch (err) {
    ctx.throw(err);
  }
};

const addPerson = async (ctx) => {
  try {
    const movie = await queries.addPerson(ctx.request.body);

    ctx.status = codes.CREATED;
    ctx.body = {
      status: statuses(codes.CREATED),
      data: movie,
    };
  } catch (err) {
    ctx.throw(err);
  }
};

const updatePerson = async (ctx) => {
  try {
    const movie = await queries.updatePerson(ctx.params.id, ctx.request.body);
    if (movie.length) {
      ctx.status = codes.OK;
      ctx.body = {
        status: statuses(codes.OK),
        data: movie,
      };
    } else {
      ctx.throw(codes.NOT_FOUND);
    }
  } catch (err) {
    ctx.throw(err);
  }
};

const deletePerson = async (ctx) => {
  try {
    const movie = await queries.deletePerson(ctx.params.id);
    if (movie.length) {
      ctx.status = codes.OK;
      ctx.body = {
        status: statuses(codes.OK),
        data: movie,
      };
    } else {
      ctx.throw(codes.NOT_FOUND);
    }
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  getAllPersons,
  getSinglePerson,
  addPerson,
  updatePerson,
  deletePerson,
};
