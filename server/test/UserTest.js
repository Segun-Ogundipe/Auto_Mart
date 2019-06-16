/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('SIGNUP ROUTE', () => {
  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v2/auth/signup')
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('admin field is required', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'MALE',
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('admin must be a boolean', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'MALE',
        isAdmin: 'true',
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('password must be a string', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 12345678,
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('gender must be a string', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: '12345678',
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: true,
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('gender must be \'MALE\' or \'FEMALE\'', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 12345678,
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'male',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('firstName must be a string', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: true,
        lastName: 'Ogundipe',
        password: 12345678,
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'male',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('lastName must be a string', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: false,
        password: 12345678,
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'male',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('firstName must be in this format \'Firstname\'', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'segun',
        lastName: 'Ogundipe',
        password: '12345678',
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'male',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('lastName must be in this format \'Lastname\'', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'ogundipe',
        password: '12345678',
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'male',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('email must be a string', (done) => {
      const body = {
        email: false,
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: '12345678',
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'male',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('address must be a string', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: 1345668,
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 201', () => {
    it('should have a status of 201', (done) => {
      const body = {
        email: 'davephen@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(201);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        address: '12, ifelodun',
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'MALE',
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davephenomgmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davepheno@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdct',
        address: '12, ifelodun',
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 409', () => {
    it('should have a status of 409', (done) => {
      const body = {
        email: 'davephenoms@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
        gender: 'MALE',
        isAdmin: true,
      };

      chai.request(app).post('/api/v2/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(409);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
});

describe('SIGNIN ROUTE', () => {
  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v2/auth/signin')
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davephengmail.com',
        password: 'jhfdcthjk24r44',
      };
      chai.request(app).post('/api/v2/auth/signin')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davephen@gmail.com',
        password: 'jhfd',
      };
      chai.request(app).post('/api/v2/auth/signin')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST 404', () => {
    it('should have a status of 404', (done) => {
      const body = {
        email: 'davephe@gmail.com',
        password: 'jhfdcthjk24r44',
      };
      chai.request(app).post('/api/v2/auth/signin')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          done();
        });
    });
  });

  describe('POST 200', () => {
    it('should have a status of 200', (done) => {
      const body = {
        email: 'davephenoms@gmail.com',
        password: 'qwertyuiop1234',
      };

      chai.request(app).post('/api/v2/auth/signin')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
      };

      chai.request(app).post('/api/v2/auth/signin')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('password must be a string', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        password: true,
      };

      chai.request(app).post('/api/v2/auth/signin')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('email must be a string', (done) => {
      const body = {
        email: false,
        password: 'vhshh373be2e3',
      };

      chai.request(app).post('/api/v2/auth/signin')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST 404', () => {
    it('should have a status of 404', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        password: 'jhfdcthjk24r4',
      };

      chai.request(app).post('/api/v2/auth/signin')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
});
