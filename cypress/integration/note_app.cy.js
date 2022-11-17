describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/tests/reset')
    const newUser = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3001/api/users', newUser)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2022'
    )
  })
  it('login with wrong credentials', () => {
    cy.contains('Login').click()
    cy.get('.login__username').type('mluukkai')
    cy.get('.login__password').type('sdfsd')
    cy.get('.login__submit').click()

    cy.get('.error').should('contain', 'wrong credentials')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })
  it('login form can be opened', function () {
    cy.contains('Login').click()
    cy.get('.login__username').type('mluukkai')
    cy.get('.login__password').type('salainen')
    cy.get('.login__submit').click()

    cy.contains('Matti Luukkainen logged in')
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })
    it('a new note is created', function () {
      cy.contains('Add new note').click()
      cy.get('.add-note__note').type('New Note Hello')
      cy.get('.add-note__submit').click()
      cy.contains('New Note Hello')
    })
    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'First Note', important: false })
        cy.createNote({ content: 'Second Note', important: false })
        cy.createNote({ content: 'Third Note', important: false })
      })
      it('It can be made important', () => {
        cy.contains('Second Note').parent().find('button').as('theButton')

        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})
