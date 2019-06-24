/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

let token;

describe('AUTH ROUTE', () => { 
  describe('SIGNUP ROUTE', () => {
    describe('SIGNUP SUCCESSFULLY', () => {
      it('should have a status of 201', (done) => {
        const body = {
          email: 'segunogundipe2000@yahoo.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'qwertyuiop1234',
          address: '12 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: false,
        };

        chai.request(app).post('/api/v2/auth/signup')
          .send(body)
          .end((err, res) => {
            token = res.body.data.token;
            expect(res.body.status).to.equal(201);
            expect(res.body).to.be.a('object');
            done();
          });
      });
    });

    describe('SIGNUP WITHOUT ISADMIN FIELD', () => {
      it('should have a status of 400', (done) => {
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

    describe('SIGNUP WITH A NON BOOLEAN ISADMIN FIELD', () => {
      it('should have a status of 400', (done) => {
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

    describe('SIGNUP WITHOUT PASSWORD FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
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

    describe('SIGNUP WITH A NON STRING PASSWORD FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 12345678,
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: false,
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

    describe('SIGNUP WITH WRONG PASSWORD FORMAT', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'WETHh2',
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

    describe('SIGNUP WITHOUT GENDER FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
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

    describe('SIGNUP WITH A NON STRING GENDER FIELD', () => {
      it('should have a status of 400', (done) => {
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

    describe('SIGNUP WITH INCORRECT GENDER FORMAT', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
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

    describe('SIGNUP WITHOUT EMAIL FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true,
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

    describe('SIGNUP WITH A NON STRING EMAIL FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 12365335,
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
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

    describe('SIGNUP WITH INCORRECT EMAIL FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenomgmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
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

    describe('SIGNUP WITHOUT FIRSTNAME FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true,
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

    describe('SIGNUP WITH A NON STRING FIRSTNAME FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 1122222,
          lastName: 'Ogundipe',
          password: '12345678',
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

    describe('SIGNUP WITH A NON TITLE CASE FIRSTNAME FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'SEGUN',
          lastName: 'Ogundipe',
          password: '12345678',
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

    describe('SIGNUP WITHOUT LASTNAME FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true,
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

    describe('SIGNUP WITH A NON STRING LASTNAME FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: true,
          password: '12345678',
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

    describe('SIGNUP WITH A NON TITLE CASE FIRSTNAME FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'ogundipe',
          password: '12345678',
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

    describe('SIGNUP WITHOUT ADDRESS FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          isAdmin: true,
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

    describe('SIGNUP WITH A NON STRING ADDRESS FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: true,
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

    describe('SIGNUP WITH INCORRECT ADDRESS FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'SEGUN',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus',
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

    describe('SIGNUP WITH EXISTING EMAIL', () => {
      it('should have a status of 409', (done) => {
        const body = {
          email: 'segunogundipe2000@yahoo.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'qwertyuiop1234',
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
    describe('SIGNIN SUCCESSFULLY', () => {
      it('should have a status of 200', (done) => {
        const body = {
          email: 'segunogundipe2000@yahoo.com',
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

    describe('INCORRECT PASSWORD', () => {
      it('should have a status of 401', (done) => {
        const body = {
          email: 'segunogundipe2000@yahoo.com',
          password: 'qwertyuiop',
        };

        chai.request(app).post('/api/v2/auth/signin')
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(401);
            expect(res.body).to.be.a('object');
            done();
          });
      });
    });

    describe('SIGNIN WITHOUT EMAIL FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          password: '12345678',
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

    describe('SIGNIN WITH A NON STRING EMAIL FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: true,
          password: '12345678',
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

    describe('SIGNIN WITHOUT PASSWORD FIELD', () => {
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

    describe('SIGNIN WITH A NON STRING PASSWORD FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          email: 'davephenom@gmail.com',
          password: 12345678,
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
  });

  describe('TOKEN', () => {
    describe('POST CAR WITHOUT TOKEN', () => {
      it('should have a status of 401', (done) => {
        chai.request(app).post('/api/v2/car')
          .end((err, res) => {
            expect(res.body.status).to.equal(401);
            done();
          });
      });
    });

    describe('TOKEN WITHOUT A USER', () => {
      it('should have a status of 404', (done) => {
        chai.request(app).post('/api/v2/users/davephenom@gmail.com/resetPassword')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4LCJpYXQiOjE1NjExMTg4MTksImV4cCI6MTU2MTIwNTIxOX0.gVW6wHojiXQajY8xzvjkl3WzKyJBsLvHg9WhpE168rE')
          .end((err, res) => {
            expect(res.body.status).to.equal(404);
            done();
          });
      });
    });
  });

  describe('PASSWORD RESET ROUTE', () => {
    describe('PASSWORD RESET WITHOUT PASSWORD FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          newPassword: '12345566f',
        };

        chai.request(app).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body).to.be.a('object');
            done();
          });
      });
    });

    describe('PASSWORD RESET WITH NON STRING PASSWORD FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          password: true,
          newPassword: '12345566f',
        };

        chai.request(app).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body).to.be.a('object');
            done();
          });
      });
    });

    describe('PASSWORD RESET WITHOUT NEWPASSWORD FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          password: '12345566f',
        };

        chai.request(app).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body).to.be.a('object');
            done();
          });
      });
    });

    describe('PASSWORD RESET WITH NON STRING NEWPASSWORD FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          password: 'wttyv2h36bh',
          newPassword: 12345566,
        };

        chai.request(app).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body).to.be.a('object');
            done();
          });
      });
    });

    describe('PASSWORD RESET WITH INCORRECT NEWPASSWORD FORMAT', () => {
      it('should have a status of 400', (done) => {
        const body = {
          password: 'wttyv2h36bh',
          newPassword: 'TYFDGV6',
        };

        chai.request(app).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body).to.be.a('object');
            done();
          });
      });
    });

    describe('PASSWORD RESET WITH INCORRECT EMAIL FORMAT', () => {
      it('should have a status of 400', (done) => {
        const body = {
          password: 'wttyv2h36bh',
          newPassword: '12345566s',
        };

        chai.request(app).post('/api/v2/users/davephenomsgmail.com/resetPassword')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body).to.be.a('object');
            done();
          });
      });
    });

    describe('PASSWORD UPDATE WITH INCORRECT PASSWORD', () => {
      it('should have a status of 401', (done) => {
        const body = {
          password: 'qwertyuiop12',
          newPassword: 'asdfghjkl1234',
        };

        chai.request(app).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });
    });

    describe('PASSWORD UPDATE', () => {
      it('should have a status of 204', (done) => {
        const body = {
          password: 'qwertyuiop1234',
          newPassword: 'asdfghjkl1234',
        };

        chai.request(app).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.status).to.equal(204);
            done();
          });
      });
    });

    describe('PASSWORD RESET WITH EMPTY BODY', () => {
      it('should have a status of 204', (done) => {
        chai.request(app).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .end((err, res) => {
            expect(res.status).to.equal(204);
            expect(res.body).to.be.a('object');
            done();
          });
      }).timeout(0);
    });
  });
});
