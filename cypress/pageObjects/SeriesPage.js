/// <reference types="Cypress" />

class SeriesPage {
  getSeriesOverviewSection() {
    return cy.get('.header.poster')
  }
  getCastMembers() {
    return cy.get('#cast_scroller').find('.card')
  }
  getSeasonHeader() {
    return cy.get('.group_dropdown')
  }
  getSeasonInfo() {
    return cy.get('.season.card')
  }
  getViewAllSeasonsLink() {
    return cy.get('.new_button').contains('View All Seasons')
  }
  getFactsSection() {
    return cy.get('.facts.left_column')
  }
}

export default SeriesPage
