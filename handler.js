'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Freelancer = require('./models/freelancer.js');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
    .then(() => {
      Freelancer.create(JSON.parse(event.body))
        .then(freelancer => callback(null, {
          statusCode: 200,
          body: JSON.stringify(freelancer)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the freelancer.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Freelancer.findById(event.pathParameters.id)
        .then(freelancer => callback(null, {
          statusCode: 200,
          body: JSON.stringify(freelancer)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the freelancer.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Freelancer.find()
        .then(freelancers => callback(null, {
          statusCode: 200,
          body: JSON.stringify(freelancers)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the freelancers.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Freelancer.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(freelancer => callback(null, {
          statusCode: 200,
          body: JSON.stringify(freelancer)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the freelancers.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Freelancer.findByIdAndRemove(event.pathParameters.id)
        .then(freelancer => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed freelancer with id: ' + freelancer._id, freelancer: freelancer })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the freelancers.'
        }));
    });
};
