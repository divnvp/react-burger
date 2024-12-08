describe('service is available', () => {
  it('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000');
    cy.get('p.text.text_type_main-large.pb-5').should(
      'have.text',
      'Соберите бургер'
    );
  });
});
