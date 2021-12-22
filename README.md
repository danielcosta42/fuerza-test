# fuerza-test
API utlizando express e mongoose para o teste de dev backend da Fuerza
# Executando o projeto
A principio o [MongoDB](https://www.mongodb.com/try/download/community) é requerido, siga o passo a passo de instalação, crie um banco chamado "fuerza" com duas collections chamadas "users" e "posts".
Com o MongoDB rodando podemos seguir com a instalação

## Instalação
```
npm install
```
## Rodando a aplicação
```
npm start
```
## Rodando os testes
```
npm test
```

Todas as solicitações sobre posts precisam ser autenticadas pelo endpoint de auth.
Toda a documentação da API está neste em {localhost}:{port}/doc