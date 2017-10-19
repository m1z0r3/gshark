import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'

export default class MainNav extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { activeKey: 'flowRate' }
  }

  _handleSelect(eventKey, event) {
    event.preventDefault()
    this.setState({ activeKey: eventKey })
    this.props.onSelect(eventKey)
  }

  render() {
    return (
      <Nav
        bsStyle="tabs"
        activeKey={this.state.activeKey}
        onSelect={this._handleSelect.bind(this)}
      >
        <NavItem eventKey="flowRate">流量グラフ</NavItem>
        <NavItem eventKey="statistic">統計</NavItem>
        <NavItem eventKey="packetInterval">送信間隔</NavItem>
        <NavItem eventKey="filter">フィルタ</NavItem>
      </Nav>
    )
  }
}
