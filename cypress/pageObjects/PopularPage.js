/// <reference types="Cypress" />

class PopularPage {
  getGetPageHeader() {
    return cy.get('.title')
  }
  getCard() {
    return cy.get('.card.style_1')
  }
  getSortResultsBy() {
    return cy.get('.k-widget.k-dropdown.kendo_dropdown.full_width.font_size_1')
  }
  getSortResultsByList() {
    return cy.get('#sort_by_listbox')
  }
  getSortResultsByListOptions() {
    return cy.get('#sort_by_listbox').find('.k-item')
  }
  setSortResultsBy(option) {
    this.getSortResultsBy().then(($e1) => {
      if ($e1.find('.k-input').text() != option) {
        this.getSortResultsBy().trigger('click')
        this.getSortResultsByListOptions().each(($e2) => {
          if ($e2.text() == option) {
            $e2.trigger('click')
          }
        })
      }
    })
  }
  getFilters() {
    return cy.get('.name').contains('Filters')
  }
  setGenre(genre) {
    cy.get('.filter').find('#with_genres').contains(genre).click()
  }
  getSearchBtn() {
    return cy.get('.no_click.load_more').contains('Search')
  }
}

export default PopularPage
