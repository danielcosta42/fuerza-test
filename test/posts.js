const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

// Nossa suite de teste relacionada a posts
describe('posts', () => {
  
    describe('/GET posts', () => {
        it('Testando GET todos os posts', (done) => {
            chai.request('http://localhost:9090')
                .get('/api/posts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                  done();
                });
        });
    });

    describe('/GET/:id posts', () => {
        it('GET em posts por ID', (done) => {
            var id_ = "61c29995da6f6880b0ff92c1";
              chai.request('http://localhost:9090')
              .get('/api/posts/' + id_)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('title'); // Verificamos se existe a propriedade titulo
                  res.body.should.have.property('body');
                  res.body.should.have.property('tags');
                done();
              });
  
        });
    });
  
    describe('/POST posts', () => {
        it('Verificar o cadastro de posts', (done) => {
            var post = { // Vamos deinir o posts que vamos inserir
                title: "Meu post", 
                body: "Esse e o meu post",
                tags: ["a", "b", "c"]
            }
            chai.request('http://localhost:9090')
              .post('/api/posts')
              .send(post) // vamos enviar esse arquivo
              .end((err, res) => {
                    res.should.have.status(200);
                    done();
              });
        });

    });

    describe('/PUT posts', () => {
        it('Verificar a edição de posts', (done) => {
            var post = { // Vamos deinir o posts que vamos inserir
                title: "Meu post Update", 
                body: "Esse e o meu post",
                tags: ["a", "b", "c"]
            }
            var id_ = "61c29995da6f6880b0ff92c1";
            chai.request('http://localhost:9090')
              .put('/api/posts/' + id_)
              .send(post) // vamos enviar esse arquivo
              .end((err, res) => {
                    res.should.have.status(200);
                    done();
              });
        });

    });
  
});