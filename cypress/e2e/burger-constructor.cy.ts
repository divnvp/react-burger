describe('Burger Constructor works correctly', () => {
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

  it('should drag-and-drop Bun to Cart redirect to login after Confirm order clicked', () => {
    const dataTransfer = new DataTransfer();

    if (
      cy
        .get('p.text.text_type_main-medium')
        .first()
        .should('have.text', 'Булки')
    ) {
      cy.get('div.burger-ingredients_card__AqzE1')
        .first()
        .trigger('dragstart', { dataTransfer });
      cy.get('p.text.text_type_main-default.text_color_inactive')
        .contains(
          'Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа'
        )
        .trigger('drop', { dataTransfer });
      cy.get('button').contains('Оформить заказ').click();
    }
  });

  it('should open modal of bun details', () => {
    if (
      cy
        .get('p.text.text_type_main-medium')
        .first()
        .should('have.text', 'Булки')
    ) {
      cy.get('div.burger-ingredients_card__AqzE1').first().click();
      cy.get('p.text.text_type_main-large')
        .first()
        .should('have.text', 'Детали ингредиента');
    }
  });

  it('should authorization work and modal of order exists', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input.text.input__textfield.text_type_main-default')
      .first()
      .type('dxs@d.ru');
    cy.get('input.text.input__textfield.text_type_main-default')
      .last()
      .type('12345678');
    cy.get('button').click();

    const dataTransfer = new DataTransfer();

    if (
      cy
        .get('p.text.text_type_main-medium')
        .last()
        .should('have.text', 'Начинки')
    ) {
      cy.get('div.burger-ingredients_card__AqzE1')
        .first()
        .trigger('dragstart', { dataTransfer });
      cy.get('p.text.text_type_main-default.text_color_inactive')
        .contains(
          'Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа'
        )
        .trigger('drop', { dataTransfer });
      cy.get('button').contains('Оформить заказ').click();

      cy.get('div.modal-overlay_modalCard__De5BR');
      cy.get('svg.modal_closeButton__DsCEZ').click();
      cy.get('p.text.text_type_main-default.text_color_inactive').contains(
        'Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа'
      );
    }
  });
});
