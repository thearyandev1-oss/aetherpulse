describe('E2E Test', () => {
  it('Visits the app', () => {
    cy.visit('/')
    cy.contains('AetherPulse')
  })
})
