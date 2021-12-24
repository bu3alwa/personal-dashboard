/// <reference types="cypress" />

describe('User Login', () => {
    it('Test Post /api/auth/login', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          "username": "admin",
          "password": "123"
        }
      }).then((response) => {
        expect(response.body).has.property("username", "admin");
        expect(response.status).to.eq(201)
        return response.body.token
      }).then((token) => {
        const auth = 'Bearer ' + token;
        cy.request({
          method: 'GET',
          url: 'http://localhost:3000/api/auth/user',
          headers: {
            authorization: auth,
          }
        }).then((response) => {
          expect(response.body).has.property("username", "admin");
          expect(response.status).to.eq(201)
        })
      })
    })
})