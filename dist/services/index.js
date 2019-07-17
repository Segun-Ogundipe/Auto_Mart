'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});

exports.default = {
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params).then(function (res) {
        return resolve(res.rows);
      }).catch(function (err) {
        return reject(err);
      });
    });
  }
};