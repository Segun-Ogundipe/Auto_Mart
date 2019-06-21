/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('FLAG ROUTE TEST', () => {
  describe('CREATE FLAG', () => {
    it('should ha a status of 201', (done) => {
      const body = {
        carId: 1,
        reason: 'Bad price',
        description: 'The price is too high',
      };

      chai.request(app).post('/api/v2/flags')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe('CREATE FLAG WITH UNDEFINED CARID FIELD', () => {
    it('should ha a status of 400', (done) => {
      const body = {
        reason: 'Bad price',
        description: 'The price is too high',
      };

      chai.request(app).post('/api/v2/flags')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('CREATE FLAG WITH UNDEFINED CARID FIELD', () => {
    it('should ha a status of 400', (done) => {
      const body = {
        reason: 'Bad price',
        description: 'The price is too high',
      };

      chai.request(app).post('/api/v2/flags')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('CREATE FLAG WITH NON NUMBER CARID FIELD', () => {
    it('should ha a status of 400', (done) => {
      const body = {
        carId: '1',
        reason: 'Bad price',
        description: 'The price is too high',
      };

      chai.request(app).post('/api/v2/flags')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('CREATE FLAG WITH UNDEFINED REASON FIELD', () => {
    it('should ha a status of 400', (done) => {
      const body = {
        carId: 1,
        description: 'The price is too high',
      };

      chai.request(app).post('/api/v2/flags')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('CREATE FLAG WITH NON STRING REASON FIELD', () => {
    it('should ha a status of 400', (done) => {
      const body = {
        carId: '1',
        reason: true,
        description: 'The price is too high',
      };

      chai.request(app).post('/api/v2/flags')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('CREATE FLAG WITH UNDEFINED DESCRIPTION FIELD', () => {
    it('should ha a status of 400', (done) => {
      const body = {
        carId: 1,
        reason: 'Bad price',
      };

      chai.request(app).post('/api/v2/flags')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('CREATE FLAG WITH NON STRING DESCRIPTION FIELD', () => {
    it('should ha a status of 400', (done) => {
      const body = {
        carId: 1,
        reason: 'Bad price',
        description: false,
      };

      chai.request(app).post('/api/v2/flags')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('CREATE FLAG WITH NON EXISTENCE CARID', () => {
    it('should ha a status of 404', (done) => {
      const body = {
        carId: 0,
        reason: 'Bad price',
        description: 'The price is too high',
      };

      chai.request(app).post('/api/v2/flags')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
