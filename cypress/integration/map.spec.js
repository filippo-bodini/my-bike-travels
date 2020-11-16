context('Maps', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })


  it('Shoud display results inside map', () => {
    cy.get('#starting-point')
      .type('wembley').should('have.value', 'wembley')

    cy.get('#finish-point')
      .type('bromley').should('have.value', 'bromley')

    cy.get('#evaluate-path').click();

    cy.wait(2000);

    cy.get('#gmimap0').should('have.attr', 'name', 'gmimap0')
    cy.get('#gmimap1').should('have.attr', 'name', 'gmimap1')
    cy.get('#gmimap2').should('have.attr', 'name', 'gmimap2')
    cy.get('#gmimap3').should('have.attr', 'name', 'gmimap3')

  })

})
