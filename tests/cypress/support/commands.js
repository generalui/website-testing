Cypress.Commands.add('passwordProtection', () => {
  const password = ''; //Cypress.env('PREVIEW_PASSWORD')

  if (password) {
    cy.session([password], () => {
      cy.visit('/');

      const passwordHeader = cy.get('#shopify-section-main-password-header');

      if (passwordHeader) {
        passwordHeader.get('.password-link').click();
        passwordHeader.get('#Password').type(password);
        passwordHeader.get('#login_form [name="commit"]').click();
        cy.get('#login_form').should('not.exist');
      }
    });
  }
});
