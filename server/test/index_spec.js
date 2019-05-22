import { expect } from 'chai';
import server from '../index';

describe('test', () => {
  it('Shoud return a string', () => {
    expect('ci with travis').to.equal('ci with travis');
  });
});
