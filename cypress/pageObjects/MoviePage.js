/// <reference types="Cypress" />

class MoviePage {
  getMediaVideos() {
    return cy.get('#videos')
  }
  getMediaVideosCounter() {
    return cy.get('#videos span')
  }
}

export default MoviePage
