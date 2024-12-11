/// <reference types="cypress" />
describe('Тестирование приложения списка дел', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/');
      cy.get('input').type('Новое дело');
      cy.contains('Добавить дело').click();
      cy.get('ul li:first-child').should('contain.text', 'Новое дело');
    });

    it('Дело успешно удаляется', () => {
        cy.get('ul li:first-child').get('.btn-danger').click();
        cy.get('ul').should('be.empty');
    });

    it('Дело успешно меняет статус на сделанное или нет', () => {
        cy.get('ul li:first-child').get('.btn-success').click();
        cy.get('ul li:first-child').should('have.class', 'list-group-item-success');
        cy.get('ul li:first-child').get('.btn-success').click();
        cy.get('ul li:first-child').should('not.have.class', 'list-group-item-success');
    });

    it.only('Переход между страницами', () => {
        cy.contains('Дела мамы').click();
        cy.get('h2').should('contain.text', 'Дела мамы');
        cy.get('input').type('Новое дело');
        cy.contains('Добавить дело').click();
        cy.get('ul li:first-child').should('contain.text', 'Новое дело');
    });
});