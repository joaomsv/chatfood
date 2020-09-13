/// <reference types="Cypress" />
import Navbar from '../../pageObjects/Navbar'

describe('Movie Tests', function () {
  beforeEach(function () {
    cy.visit('/')
    cy.server()
  })

  it('Second most popular TV show info loads', function () {
    const navbar = new Navbar()

    navbar.getPopularTVShows().click()
    // asserting page header
    cy.log('ASSERTING PAGE HEADER')
    cy.get('.title').should('contain', 'Popular TV Shows')
    // choose second most popular tv show
    cy.get('.card.style_1').eq(1).click()
    // asserting series overview
    cy.log('ASSERTING SERIES OVERVIEW')
    cy.get('.header.poster').then(($e1) => {
      expect($e1.find('.7 a')).to.contain('Lucifer')
      expect($e1.find('.7 a')).have.attr('href', '/tv/63174-lucifer')
      expect($e1.find('.7 .tag')).to.contain('(2016)')
      expect($e1.find('.certification')).to.contain('16')
      expect($e1.find('.genres')).to.contain('Crime')
      expect($e1.find('.genres')).to.contain('Sci-Fi & Fantasy')
      expect($e1.find('.runtime')).to.contain('45m')
      expect($e1.find('.tagline')).to.contain("It's good to be bad.")
      expect($e1.find('[dir="auto"]')).to.contain('Overview')
      expect($e1.find('.overview p').text()).to.contain(
        "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals.\xa0But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape."
      )
      expect($e1.find('.profile a').text()).to.contain('Tom Kapinos')
      expect($e1.find('.character').text()).to.contain('Creator')
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
    cy.get('.group_dropdown').should('contain', 'Current Season')
    cy.get('.season.card').then(($e1) => {
      expect($e1.find('h2')).to.contain('Season 5')
      expect($e1.find('h4')).to.contain('2020 | 8 Episodes')
      expect($e1.find('.season_overview')).to.contain(
        'Lucifer makes a tumultuous return to the land of the living in hopes of making things right with Chloe. A devil’s work is never done.'
      )
    })
    cy.get('.new_button').contains('View All Seasons').should('have.attr', 'href', '/tv/63174-lucifer/seasons')
    // asserting facts
    cy.log('ASSERTING FACTS')
    cy.get('.facts.left_column').then(($e1) => {
      expect($e1.find('h4')).to.contain('Facts')
      expect($e1.find('p').eq(0).find('strong')).to.contain('Status')
      expect($e1.find('p').eq(0)).to.contain('Returning Series')
      expect($e1.find('.no_bottom_pad')).to.contain('Networks')
      expect($e1.find('p').eq(2).find('strong')).to.contain('Type')
      expect($e1.find('p').eq(2)).to.contain('Scripted')
      expect($e1.find('p').eq(3).find('strong')).to.contain('Original Language')
      expect($e1.find('p').eq(3)).to.contain('English')
    })
  })

  it("Oldest documentary's videos correctly counted", function () {
    const navbar = new Navbar()

    cy.route('POST', '/discover/movie').as('movie')
    cy.route('GET', '/movie/315946-passage-de-venus/remote/**').as('loadVideos')
    navbar.getPopularMovies().click()
    // asserting page header
    cy.log('ASSERTING PAGE HEADER')
    cy.get('.title').should('contain', 'Popular Movies')
    // if page isn't sorted by Release Date Ascending
    cy.get('.k-widget.k-dropdown.kendo_dropdown.full_width.font_size_1').then(($e1) => {
      if ($e1.find('.k-input').text() != 'Release Date Ascending') {
        cy.get('.k-widget.k-dropdown.kendo_dropdown.full_width.font_size_1').trigger('click')
        cy.get('#sort_by_listbox')
          .find('.k-item')
          .each(($e2) => {
            if ($e2.text() == 'Release Date Ascending') {
              $e2.trigger('click')
            }
          })
      }
    })
    cy.get('.name').contains('Filters').click()
    cy.get('.filter').find('#with_genres').contains('Documentary').click()
    cy.get('.no_click.load_more').contains('Search').click()
    // waits for api to finish
    cy.wait('@movie').its('status').should('eq', 200)
    cy.get('.card.style_1').first().click()
    // compare both numbers
    cy.get('#videos').click()
    // wait to load videos
    cy.wait('@loadVideos').its('status').should('eq', 200)
    // cy.get('@loadVideos')
    cy.get('#videos span').then(($e1) => {
      expect(Number($e1.text())).to.eq(Cypress.$('.video.card.no_border').length)
    })
  })
})
