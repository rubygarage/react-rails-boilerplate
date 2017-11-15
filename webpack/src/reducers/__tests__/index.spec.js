import { createStore } from 'redux'
import reducer from 'reducers'

import ambassadorInvitation from 'reducers/ambassadorInvitation'
import cardComments from 'reducers/cards/comments'
import cardCreate from 'reducers/cards/create'
import cardOwnerships from 'reducers/cards/ownerships'
import countries from 'reducers/countries'
import entities from 'reducers/entities'
import eras from 'reducers/eras'
import history from 'reducers/history'
import home from 'reducers/home'
import invitation from 'reducers/invitation'
import locale from 'reducers/locale'
import market from 'reducers/market'
import membership from 'reducers/manage/membership'
import moods from 'reducers/moods'
import pageOwnerships from 'reducers/pages/ownerships'
import pages from 'reducers/pages'
import player from 'reducers/audioPlayer'
import portfolio from 'reducers/portfolio'
import portfolioCards from 'reducers/portfolioCards'
import posterview from 'reducers/posterview'
import prices from 'reducers/prices'
import searchedUsers from 'reducers/search/users'
import signin from 'reducers/signin'
import signup from 'reducers/signup'
import skills from 'reducers/skills'
import stash from 'reducers/stash'
import toggle from 'reducers/toggle'
import users from 'reducers/users'

describe('Combine Reducers', () => {
  const state = createStore(reducer).getState()

  it('Ambassador Invitation', () => {
    expect(state.ambassadorInvitation).toEqual(ambassadorInvitation(undefined, {}))
  })

  it('Card Create', () => {
    expect(state.cardCreate).toEqual(cardCreate(undefined, {}))
  })

  it('Card Ownerships', () => {
    expect(state.cardOwnerships).toEqual(cardOwnerships(undefined, {}))
  })

  it('Card Comments', () => {
    expect(state.cardComments).toEqual(cardComments(undefined, {}))
  })

  it('Countries', () => {
    expect(state.countries).toEqual(countries(undefined, {}))
  })

  it('Entities', () => {
    expect(state.entities).toEqual(entities(undefined, {}))
  })

  it('Eras', () => {
    expect(state.eras).toEqual(eras(undefined, {}))
  })

  it('Home', () => {
    expect(state.home).toEqual(home(undefined, {}))
  })

  it('History', () => {
    expect(state.history).toEqual(history(undefined, {}))
  })

  it('Invitation', () => {
    expect(state.invitation).toEqual(invitation(undefined, {}))
  })

  it('Locale', () => {
    expect(state.locale).toEqual(locale(undefined, {}))
  })

  it('Market', () => {
    expect(state.market).toEqual(market(undefined, {}))
  })

  it('Membership', () => {
    expect(state.membership).toEqual(membership(undefined, {}))
  })

  it('Moods', () => {
    expect(state.moods).toEqual(moods(undefined, {}))
  })

  it('Pages', () => {
    expect(state.pages).toEqual(pages(undefined, {}))
  })

  it('Page Ownerships', () => {
    expect(state.pageOwnerships).toEqual(pageOwnerships(undefined, {}))
  })

  it('Player', () => {
    expect(state.player).toEqual(player(undefined, {}))
  })

  it('Portfolio', () => {
    expect(state.portfolio).toEqual(portfolio(undefined, {}))
  })

  it('Portfolio Card', () => {
    expect(state.portfolioCards).toEqual(portfolioCards(undefined, {}))
  })

  it('Posterview', () => {
    expect(state.posterview).toEqual(posterview(undefined, {}))
  })

  it('Prices', () => {
    expect(state.prices).toEqual(prices(undefined, {}))
  })

  it('Searched Users', () => {
    expect(state.searchedUsers).toEqual(searchedUsers(undefined, {}))
  })

  it('Sign In', () => {
    expect(state.signin).toEqual(signin(undefined, {}))
  })

  it('Sign Up', () => {
    expect(state.signup).toEqual(signup(undefined, {}))
  })

  it('Skills', () => {
    expect(state.skills).toEqual(skills(undefined, {}))
  })

  it('Stash', () => {
    expect(state.stash).toEqual(stash(undefined, {}))
  })

  it('Toggle', () => {
    expect(state.toggle).toEqual(toggle(undefined, {}))
  })

  it('Users', () => {
    expect(state.users).toEqual(users(undefined, {}))
  })
})
