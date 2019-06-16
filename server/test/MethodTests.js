/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';

import ApiError from '../helpers/ErrorClass';

const { expect } = chai;

describe('API ERROR TEST', () => {
  it('should return 1', () => {
    const error = new ApiError(400, 'Client Error');

    expect(error.status).to.equal(400);
  });
});
