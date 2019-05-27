/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;

describe('USER ROUTE TEST', () => {
  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request('127.0.0.1:3000').post('/api/v1/auth/signup')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST 201', () => {
    it('should have a status of 201', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        first_name: 'Segun',
        last_name: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'male',
        is_admin: true,
      };

      chai.request('127.0.0.1:3000').post('/api/v1/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
});
