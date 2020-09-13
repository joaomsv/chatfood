/// <reference types="Cypress" />

class Navbar {
  getTVShows() {
    return cy.get('.no_click.k-link.k-menu-link').contains('TV Shows')
  }
  getPopularTVShows() {
    this.getTVShows().trigger('mouseover')
    return cy.get('.k-group.k-menu-group.k-popup.k-reset.k-state-border-up').contains('Popular')
  }
  getMovies() {
    return cy.get('.no_click.k-link.k-menu-link').contains('Movies')
  }
  getPopularMovies() {
    this.getMovies().trigger('mouseover')
    return cy.get('.k-group.k-menu-group.k-popup.k-reset.k-state-border-up').contains('Popular')
  }
  getPeopleCentral() {
    this.getSettingsMenu().click()
    return cy.get('#PeopleCenter')
  }
}

export default Navbar
