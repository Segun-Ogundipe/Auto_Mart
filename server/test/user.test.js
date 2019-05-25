import chai from 'chai';
import userResponse from '../models/userResponse';

const { expect } = chai;
const response = userResponse();

chai.describe('Json object', () => {
  chai.it('should return a json array', () => {
    response.setToken('hghgfefyui7trrf');
    response.setId(1);
    response.setFirstName('Segun');
    response.setLastName('Ogundipe');
    response.setEmail('davephenoms@gmail.com');
    response.setIsAdmin(true);

    expect(response.toJson()).to.be.an('object');
  });
});
