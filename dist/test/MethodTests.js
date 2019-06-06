'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
var expect = _chai2.default.expect;


describe('HELPER', function () {
  it('should return 1', function () {
    var array = [];
    var id = _helper2.default.getNewId(array);

    expect(id).to.equal(1);
  });
});