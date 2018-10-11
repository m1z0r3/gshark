import { Moment } from 'moment'
import * as React from 'react'
import { Col, FormControl, FormGroup, HelpBlock, Row } from 'react-bootstrap'
import * as Datetime from 'react-datetime'

export const ProtocolFilter = (props: {
  onChangeProtocol: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
}) => (
  <Row className="show-grid">
    <Col xs={6} sm={5} md={2} lg={2} className="display-filter__text">
      プロトコル
    </Col>
    <Col xs={5} sm={5} md={3} lg={2}>
      <FormGroup controlId="formProtocol">
        <FormControl componentClass="select" onChange={props.onChangeProtocol}>
          <option value="" />
          <option value="ip">IP</option>
          <option value="ipv6">IPv6</option>
          <option value="tcp">TCP</option>
          <option value="udp">UDP</option>
          <option value="http">HTTP</option>
          <option value="dns">DNS</option>
          <option value="ftp">FTP</option>
          <option value="ssh">SSH</option>
        </FormControl>
      </FormGroup>
    </Col>
  </Row>
)

export const IPFilter = (props: {
  onChangeSrcIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
}) => (
  <Row className="show-grid">
    <Col xs={6} sm={5} md={2} lg={2} className="display-filter__text">
      送信元IPアドレス (*)
    </Col>
    <Col xs={5} sm={5} md={3} lg={3}>
      <FormGroup controlId="formSrcIp">
        <FormControl type="text" onChange={props.onChangeSrcIp} />
      </FormGroup>
    </Col>
    <Col xs={6} sm={5} md={2} lg={2} mdOffset={1} className="display-filter__text">
      宛先IPアドレス (*)
    </Col>
    <Col xs={5} sm={5} md={3} lg={3}>
      <FormGroup controlId="formDstIp">
        <FormControl type="text" onChange={props.onChangeDstIp} />
      </FormGroup>
    </Col>
  </Row>
)

export const PortFilter = (props: {
  onChangeSrcPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
}) => (
  <Row className="show-grid">
    <Col xs={6} sm={5} md={2} lg={2} className="display-filter__text">
      送信元ポート番号 (*)
    </Col>
    <Col xs={5} sm={5} md={3} lg={3}>
      <FormGroup controlId="formSrcPort">
        <FormControl type="text" onChange={props.onChangeSrcPort} />
      </FormGroup>
    </Col>
    <Col xs={6} sm={5} md={2} lg={2} mdOffset={1} className="display-filter__text">
      宛先IPポート番号 (*)
    </Col>
    <Col xs={5} sm={5} md={3} lg={3}>
      <FormGroup controlId="formDstPort">
        <FormControl type="text" onChange={props.onChangeDstPort} />
      </FormGroup>
    </Col>
  </Row>
)

export const PeriodFilter = (props: {
  onChangePeriodStart: (event: string | Moment) => void
  onChangePeriodEnd: (event: string | Moment) => void
}) => (
  <Row className="show-grid">
    <Col xs={6} sm={5} md={2} lg={2} className="display-filter__text">
      期間
    </Col>
    <Col xs={5} sm={5} md={3} lg={3}>
      <Datetime locale="ja" onChange={props.onChangePeriodStart} />
    </Col>
    <Col xs={1} sm={1} md={1} lg={1}>
      <div className="display-filter__datatime-range"> 〜 </div>
    </Col>
    <Col xs={5} sm={5} md={3} lg={3}>
      <Datetime locale="ja" onChange={props.onChangePeriodEnd} />
    </Col>
  </Row>
)

export const Help = () => <HelpBlock>(*) : カンマ (,) 区切りで複数指定することができます</HelpBlock>
