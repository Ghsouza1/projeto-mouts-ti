import { faker } from '@faker-js/faker';

describe('front serverest', () => {
  
  it('cadastrar usuarios', () => {
    cy.intercept('POST', 'https://serverest.dev/usuarios').as('usuarios');
    
    cy.visit('https://front.serverest.dev/login')

    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    const password = faker.internet.password();

    cy.get('[data-testid="cadastrar"]').click()
    cy.get('[data-testid="nome"]').type(randomName)
    cy.get('[data-testid="email"]').type(randomEmail)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="checkbox"]').check()
    cy.get('[data-testid="cadastrar"]').click()

    cy.wait('@usuarios').then((request) => {
        expect(request.response.statusCode).to.equal(201);
    });
  })

  it('nome é obrigatório', () => {    
    cy.visit('https://front.serverest.dev/login')

    const randomEmail = faker.internet.email();
    const password = faker.internet.password();

    cy.get('[data-testid="cadastrar"]').click()
    cy.get('[data-testid="email"]').type(randomEmail)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="cadastrar"]').click()

    cy.get('.alert').should('be.visible').then(($div) => {
      expect($div).to.have.text('×Nome é obrigatório')
    })
  })

  it('email é obrigatório', () => {    
    cy.visit('https://front.serverest.dev/login')

    const randomName = faker.person.fullName();
    const password = faker.internet.password();

    cy.get('[data-testid="cadastrar"]').click()
    cy.get('[data-testid="nome"]').type(randomName)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="cadastrar"]').click()

    cy.get('.alert').should('be.visible').then(($div) => {
      expect($div).to.have.text('×Email é obrigatório')
    })
  })
})