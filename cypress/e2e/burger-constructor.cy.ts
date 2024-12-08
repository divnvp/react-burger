describe('service is available', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  it('initial state of page', () => {
    cy.get('p.text.text_type_main-large.pb-5').should(
      'have.text',
      'Соберите бургер'
    );
    cy.get('button').contains('Оформить заказ').should('be.disabled');
  });

  // it('should open delivery page after formed button click', function () {
  //   cy.get('button').contains('Оформить заказ');
  //   // .contains('Продолжить оформление').click();
  //   // cy.contains('Доставка');
  // });
});
