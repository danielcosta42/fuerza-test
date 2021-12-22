var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

// Nossa suite de teste relacionada a posts
describe('posts', () => {
  
  describe('/GET posts', () => {
        it('Testando GET todos os posts', (done) => {
            chai.request('http://localhost:9090')
                .get('/api/posts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
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
  
  describe('/GET/:id posts', () => {
        it('GET em posts por ID', (done) => {
            var id_ = "80bb97d8-3a8d-442c-a3b6-3bc822f3c0f7";
              chai.request('http://localhost:9090')
              .get('/api/posts/' + id_)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('title'); // Verificamos se existe a propriedade titulo
                  res.body.should.have.property('body');
                done();
              });
  
        });
    });
  
});