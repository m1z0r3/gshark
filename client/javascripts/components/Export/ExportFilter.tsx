import { Moment } from 'moment'
import * as React from 'react'
import { Col, FormControl, FormGroup, Grid, Row } from 'react-bootstrap'

import { Help, IPFilter, PeriodFilter, PortFilter, ProtocolFilter } from '../DisplayFilter'

const formats = ['pcap', 'ek', 'fields', 'json', 'jsonraw', 'pdml', 'ps', 'psml', 'tabs', 'text']

interface Props {
  onChangeProtocol: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeSrcIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeSrcPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangePeriodStart: (event: string | Moment) => void
  onChangePeriodEnd: (event: string | Moment) => void
  onChangeFormat: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeOutput: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
}

const FormatForm = (props: { onChangeFormat: Props['onChangeFormat'] }) => (
  <Row className="show-grid">
    <Col xs={6} sm={5} md={2} lg={2} className="display-filter__text">
      出力フォーマット
    </Col>
    <Col xs={5} sm={5} md={3} lg={2}>
      <FormGroup controlId="formFormat">
        <FormControl componentClass="select" onChange={props.onChangeFormat}>
          {formats.map((format, index) => (
            <option key={index} value={format}>
              {format}
            </option>
          ))}
        </FormControl>
      </FormGroup>
    </Col>
  </Row>
)

const OutputForm = (props: { onChangeOutput: Props['onChangeOutput'] }) => (
  <Row className="show-grid">
    <Col xs={6} sm={5} md={2} lg={2} className="display-filter__text">
      出力ファイル名
    </Col>
    <Col xs={5} sm={5} md={8} lg={8}>
      <FormGroup controlId="formOutput">
        <FormControl type="text" onChange={props.onChangeOutput} />
      </FormGroup>
    </Col>
  </Row>
)

export default (props: Props) => (
  <Grid className="display-filter">
    <ProtocolFilter onChangeProtocol={props.onChangeProtocol} />
    <IPFilter onChangeSrcIp={props.onChangeSrcIp} onChangeDstIp={props.onChangeDstIp} />
    <PortFilter onChangeSrcPort={props.onChangeSrcPort} onChangeDstPort={props.onChangeDstPort} />
    <PeriodFilter
      onChangePeriodStart={props.onChangePeriodStart}
      onChangePeriodEnd={props.onChangePeriodEnd}
    />
    <FormatForm onChangeFormat={props.onChangeFormat} />
    <OutputForm onChangeOutput={props.onChangeOutput} />
    <Help />
  </Grid>
)
