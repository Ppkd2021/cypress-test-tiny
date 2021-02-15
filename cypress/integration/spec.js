/// <reference types="cypress" />
describe('page', () => {
  it('works', () => {
    let i = 0;
    cy.intercept(
      {
        method: `POST`,
        url: `will send in mail`
      },
      req => {
        if (req.body.query.includes("ListInsightViewMetricsByInsightViewId")) {
          i += 1;
          console.log(i);
          req.alias = `ListInsightViewMetricsByInsightViewId`;
          // req.reply({fixture: `${path}/${query}-${i}.json`}); -- This step is added to stub response for above query but due to irregular calls being recorded by cypress it failes at this steps.
        }
      }
    )
    cy.visit('https://develop.convosight.com/app/cs-admin-login');
    
	
    cy
      .get(`[type="submit"]`)
      .as(`BtnSubmit`)
      .should(`be.disabled`)
      .get(`[data-placeholder="Email"]`)
      .type("csadmin@convosight.com") // will send in mail
      .get(`[data-placeholder="Password"]`)
      .type("EXb5Xj%Y6") //will send in mail
      .get(`@BtnSubmit`)
      .should(`be.enabled`)
      .click()
      .get(`[alt="convosight logo"]`,{timeout:30000});
      cy.get(`.brand-list-wrapper > :nth-child(1)`).click();
      cy.get(`.link-btn`,{timeout:30000}).click();
      cy.wait(120000);
     
      

     
  })
})
