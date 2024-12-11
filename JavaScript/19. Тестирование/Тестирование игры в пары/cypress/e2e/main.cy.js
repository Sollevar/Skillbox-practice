/// <reference types="cypress" />
beforeEach(() => {
    cy.viewport(1800, 1200)
    cy.visit('http://127.0.0.1:5500/');
    cy.get('button').click();
})
describe('Тестирование игры в пары', () => {
    it('Тестирование начального состояние (4x4 размер при пустых инпутах), каждая клетка невидима', () => {
        cy.get('.container').should("have.attr", "style").and('include', 'grid-template-columns: repeat(4, 1fr)');
        cy.get('.card').should('have.length', 16)
    });

    it('Нажатие на произвольную карточку, убедиться что она осталась открытой', () => {
        cy.get('.card:nth-child(2)').click().should("have.class", "card-active");
        cy.get('.card:nth-child(3)').click();
        cy.get('.card:nth-child(2)').should("have.class", "card-active");
    });

    it('Нажатие на карточки, пока не будет найдена пара. Проверить что изначально нажатая карточка осталась видимой', () => {
        let firstCardNumber;
        function checkNextCard(counter) {
            cy.get('.card:nth-child(1)').click().invoke('text').then((text) => {
                if (firstCardNumber === text) return;
                firstCardNumber = text.trim();
            });
            cy.get(`.card:nth-child(${counter})`)
                .click()
                .invoke('text')
                .then((text) => {
                    const currentCardNumber = text.trim();

                    if (currentCardNumber === firstCardNumber) {
                        cy.log(`Найдена пара на карточке ${counter}`);
                        cy.get('.card:nth-child(1)').click().should("have.class", "card-active");
                    } else {
                        checkNextCard(counter + 1);
                    }
                });
        }
        checkNextCard(2);
    });

    it(`Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки.
        Проверить, что после нажатия на вторую карточку обе становятся невидимыми`, () => {
        let cardNumber;
        function checkNextCard(counter) {
            cy.get(`.card:nth-child(${counter})`).click().invoke('text').then((text) => {
                cardNumber = text.trim();
            });
            cy.get(`.card:nth-child(${counter + 1})`)
                .click()
                .invoke('text')
                .then((text) => {
                    const currentCardNumber = text.trim();
                    if (currentCardNumber !== cardNumber) {
                       cy.get(`.card:nth-child(${counter + 2})`).click().should("have.class", "card-active");
                       cy.get(`.card:nth-child(${counter})`).should("not.have.class", "card-active");
                       cy.get(`.card:nth-child(${counter + 1})`).should("not.have.class", "card-active");
                    } else {
                        cy.get(`.card:nth-child(${counter})`).click().should("have.class", "card-active");
                        checkNextCard(counter + 1);
                    }
                });
        }
        checkNextCard(1)
    })

})