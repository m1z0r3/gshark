import * as React from 'react'
import { Col, FormControl, FormGroup, Grid, Row } from 'react-bootstrap'

export default (props: {
  onChangeTimeWindow: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeThreshold: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
}) => (
  <Grid className="display-filter">
    <Row className="show-grid">
      <Col xs={6} sm={5} md={3} lg={2} className="display-filter__text">
        タイムウィンドウ (s)
      </Col>
      <Col xs={5} sm={5} md={2} lg={2}>
        <FormGroup controlId="formTimeWindow">
          <FormControl type="number" onChange={props.onChangeTimeWindow} />
        </FormGroup>
      </Col>
      <Col xs={6} sm={5} md={3} lg={2} mdOffset={1} className="display-filter__text">
        しきい値 (パケット数)
      </Col>
      <Col xs={5} sm={5} md={2} lg={2}>
        <FormGroup controlId="formThreshold">
          <FormControl type="number" onChange={props.onChangeThreshold} />
        </FormGroup>
      </Col>
    </Row>
  </Grid>
)
