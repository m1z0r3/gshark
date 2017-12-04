// @flow
import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import type { MainNavState as activeKey } from '../app'

type Props = {
  onSelect: activeKey => void,
}

export default class MainNav extends React.Component<Props> {
  _handleSelect(eventKey: activeKey, event: SyntheticEvent<*>) {
    event.preventDefault()
    this.props.onSelect(eventKey)
  }

  render() {
    return (
      <Nav bsStyle="tabs" onSelect={this._handleSelect.bind(this)}>
        <LinkContainer to="/flow">
          <NavItem eventKey="flow">流量グラフ</NavItem>
        </LinkContainer>
        <LinkContainer to="/statistic">
          <NavItem eventKey="statistic">統計</NavItem>
        </LinkContainer>
        <LinkContainer to="/interval">
          <NavItem eventKey="interval">送信間隔</NavItem>
        </LinkContainer>
        <LinkContainer to="/filter">
          <NavItem eventKey="filter">フィルタ</NavItem>
        </LinkContainer>
      </Nav>
    )
  }
}
