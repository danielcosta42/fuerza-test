const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

// Nossa suite de teste relacionada a posts
describe('posts', () => {
  
    describe('/POST auth', () => {
        it('Verificar a criação de usuários', (done) => {
            var user = {
                username: "usertest4", 
                password: "teste123",
                email: "teste4@teste.com"
            }
            chai.request('http://localhost:9090')
                .post('/api/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                  done();
                });
        });
    });
  
    describe('/POST auth', () => {
        it('Verificar o login de usuário', (done) => {
            var user = {
                username: "daniel", 
                passwoord: "daniel123",
            }
            chai.request('http://localhost:9090')
              .post('/api/auth/signin')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(200);
                    done();
              });
        });

    });
  
});