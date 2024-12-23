describe('Burger Constructor works correctly', () => {
  beforeEach(function () {
    cy.visit('/');
    cy.get('[id="dragstart"]').first().as('dragstartDiv');
    cy.get('p.text.text_type_main-medium').as('productCompositionBlock');
    cy.get('button').contains('Оформить заказ').as('confirmButton');
    cy.get('p.text.text_type_main-default.text_color_inactive')
      .contains(
        'Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа'
      )
      .as('dropWindow');
    cy.get('p.text.text_type_main-large').as('title');
  });

  it('initial state of page', () => {
    cy.get('@title').should('have.text', 'Соберите бургер');
    cy.get('@confirmButton').should('be.disabled');
  });

  it('should drag-and-drop Bun to Cart redirect to login after Confirm order clicked', () => {
    const dataTransfer = new DataTransfer();

    if (
      cy.get('@productCompositionBlock').first().should('have.text', 'Булки')
    ) {
      cy.get('@dragstartDiv').trigger('dragstart', { dataTransfer });
      cy.get('@dropWindow').trigger('drop', { dataTransfer });
      cy.get('@confirmButton').click();
    }
  });

  it('should open modal of bun details', () => {
    if (
      cy.get('@productCompositionBlock').first().should('have.text', 'Булки')
    ) {
      cy.get('@dragstartDiv').click();
      cy.get('@title').first().should('have.text', 'Детали ингредиента');
    }
  });

  it('should authorization work and modal of order exists', () => {
    cy.visit('/login');
    cy.get('input.text.input__textfield.text_type_main-default').as(
      'inputField'
    );
    cy.get('@inputField').first().type('dxs@d.ru');
    cy.get('@inputField').last().type('12345678');
    cy.get('button').click();

    const dataTransfer = new DataTransfer();

    if (
      cy.get('@productCompositionBlock').last().should('have.text', 'Начинки')
    ) {
      cy.get('@dragstartDiv').trigger('dragstart', { dataTransfer });
      cy.get('@dropWindow').trigger('drop', { dataTransfer });
      cy.get('@confirmButton').click();

      cy.get('[id="modal-overlay"]');
      cy.get('[class*="closeButton"]').click();
      cy.get('@dropWindow');
    }
  });
});
