import { faker } from '@faker-js/faker';

describe('serverest dev - Cadastrar usuário', () => {

  it('post_usuarios', () => {

    const userData = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'false'
    };

    cy.request('POST', 'https://serverest.dev/usuarios', userData).then((response) => {
      expect(response.status).to.eq(201)     
    })
  })

  it('post_usuarios - nome não pode ficar em branco', () => {

    const userData = {
      nome: '',
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'false'
    };

    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: userData,
      failOnStatusCode: false
    }).then((response)=>{
      expect(response.status).to.eq(400)
      expect(response.body.nome).to.eq("nome não pode ficar em branco")
    })
  })

  it('post_usuarios - email não pode ficar em branco', () => {

    const userData = {
      nome: faker.person.fullName(),
      email: '',
      password: faker.internet.password(),
      administrador: 'false'
    };

    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: userData,
      failOnStatusCode: false
    }).then((response)=>{
      expect(response.status).to.eq(400)
      expect(response.body.email).to.eq("email não pode ficar em branco")
    })
  })
})
