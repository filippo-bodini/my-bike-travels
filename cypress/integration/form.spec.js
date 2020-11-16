context('Maps', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })


  it('Shoud not allow submit with same name', () => {
    cy.get('#starting-point')
      .type('wembley').should('have.value', 'wembley')

    cy.get('#finish-point')
      .type('wembley').should('have.value', 'wembley')

    cy.get('#evaluate-path').should('have.attr', 'disabled');


  })

})
