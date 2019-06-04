/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('CAR ROUTE', () => {
  describe('POST 401', () => {
    it('should have a status of 401', (done) => {
      chai.request(app).post('/api/v1/car/')
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          done();
        });
    });
  });
});
