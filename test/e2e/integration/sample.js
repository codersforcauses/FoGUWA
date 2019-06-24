/* eslint-disable */

describe('Sample tests', () => {
  it('Visits index page', () => {
    cy.visit('/');
    cy.contains('div', 'Welcome to the Vuetify + Nuxt.js template');
    cy.contains('p', 'Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.');
  });
});