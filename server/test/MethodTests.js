/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';

import helper from '../helpers/helper';

const { expect } = chai;

describe('HELPER', () => {
  it('should return 1', () => {
    const array = [];
    const id = helper.getNewId(array);

    expect(id).to.equal(1);
  });
});
