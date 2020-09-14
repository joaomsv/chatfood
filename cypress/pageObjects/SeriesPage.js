/// <reference types="Cypress" />

class SeriesPage {
  getSeriesOverviewSection() {
    return cy.get('.header.poster')
  }
  getCastMembersHeader() {
    return cy.get('.panel.top_billed.scroller').find('h3')
  }
  getCastMembers() {
    return cy.get('#cast_scroller').find('.card')
  }
  getFullCastCrewLink() {
    return cy.get('.new_button').contains('Full Cast & Crew')
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
