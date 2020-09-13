/// <reference types="Cypress" />

describe('TMdb Tests', function () {
  beforeEach(function () {
    cy.visit('https://www.themoviedb.org/')
    cy.server()
  })

  it('First Test', function () {
    cy.get('.no_click.k-link.k-menu-link').contains('TV Shows').trigger('mouseover')
    cy.get('.k-group.k-menu-group.k-popup.k-reset.k-state-border-up').contains('Popular').click()
    // asserting page header
    cy.log('ASSERTING PAGE HEADER')
    cy.get('.title').should('contain', 'Popular TV Shows')
    // if page isn't sorted by popularity descending
    cy.get('.k-widget.k-dropdown.kendo_dropdown.full_width.font_size_1').then(($e1) => {
      if ($e1.find('.k-input').text() != 'Popularity Descending') {
        cy.get('.k-widget.k-dropdown.kendo_dropdown.full_width.font_size_1').trigger('click')
        cy.get('#sort_by_listbox')
          .find('.k-item')
          .each(($e2) => {
            if ($e2.text() == 'Popularity Descending') {
              $e2.trigger('click')
            }
          })
        cy.get('.no_click.load_more').contains('Search').click()
      }
    })
    // choose second most popular tv show
    cy.get('.card.style_1').eq(1).click()
    // asserting series overview
    cy.log('ASSERTING SERIES OVERVIEW')
    cy.get('.header.poster').then(($e1) => {
      expect($e1.find('.7')).to.contain('Lucifer')
      expect($e1.find('.genres')).to.contain('Crime')
      expect($e1.find('.genres')).to.contain('Sci-Fi & Fantasy')
      expect($e1.find('.runtime')).to.contain('45m')
      expect($e1.find('.tagline')).to.contain("It's good to be bad.")
      expect($e1.find('.overview p').text()).to.contain(
        "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals.\xa0But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape."
      )
      expect($e1.find('.profile a').text()).to.contain('Tom Kapinos')
    })
    // asserting the first cast member
    cy.log('ASSERTING FIRST CAST MEMBER')
    cy.get('#cast_scroller')
      .find('.card')
      .first()
      .then(($e1) => {
        expect($e1.find('p').first().text()).to.contain('Tom Ellis')
        expect($e1.find('.character').text()).to.contain('Michael, Lucifer Morningstar')
        expect($e1.find('.episode_count').text()).to.contain('75 Episodes')
      })
    // asserting current season
    cy.log('ASSERTING CURRENT SEASON')
    cy.get('.season.card').then(($e1) => {
      expect($e1.find('h2')).to.contain('Season 5')
      expect($e1.find('h4')).to.contain('2020 | 8 Episodes')
      expect($e1.find('.season_overview')).to.contain(
        'Lucifer makes a tumultuous return to the land of the living in hopes of making things right with Chloe. A devil’s work is never done.'
      )
    })
    // asserting facts
    cy.log('ASSERTING FACTS')
    cy.get('.facts.left_column').then(($e1) => {
      expect($e1.find('p').eq(0)).to.contain('Returning Series')
      expect($e1.find('p').eq(2)).to.contain('Scripted')
      expect($e1.find('p').eq(3)).to.contain('English')
    })
  })
  //   it('Second Test', function () {})
})
