/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';

import helper from '../helpers/helper';
import CarController from '../controllers/CarController';
import ApiError from '../helpers/ErrorClass';

const { expect } = chai;

describe('HELPER', () => {
  it('should return 1', () => {
    const array = [];
    const id = helper.getNewId(array);

    expect(id).to.equal(1);
  });
});

describe('HELPER', () => {
  it('should return 1', () => {
    const error = new ApiError(400, 'Client Error');

    expect(error.status).to.equal(400);
  });
});
