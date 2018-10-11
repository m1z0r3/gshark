import * as React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default ({ onSelect }: { onSelect: () => void }) => (
  <Nav bsStyle="tabs" onSelect={onSelect}>
    <LinkContainer to="/statistic">
      <NavItem eventKey="statistic">統計</NavItem>
    </LinkContainer>
    <LinkContainer to="/flow">
      <NavItem eventKey="flow">流量</NavItem>
    </LinkContainer>
    <LinkContainer to="/interval">
      <NavItem eventKey="interval">送信間隔</NavItem>
    </LinkContainer>
    <LinkContainer to="/filter">
      <NavItem eventKey="filter">フィルタ</NavItem>
    </LinkContainer>
    <LinkContainer to="/ddos">
      <NavItem eventKey="ddos">DDoS検知</NavItem>
    </LinkContainer>
  </Nav>
)
