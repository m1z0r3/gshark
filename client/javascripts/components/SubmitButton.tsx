import * as React from 'react'
import { Button, Col, Grid, Row } from 'react-bootstrap'

export default ({ onSubmit }: { onSubmit: () => void }) => (
  <Grid className="submit-button">
    <Row className="show-grid">
      <Col xs={2} md={2} smOffset={5}>
        <Button
          bsStyle="primary"
          bsSize="large"
          type="submit"
          className="submit-button__button"
          onClick={onSubmit}
        >
          実行
        </Button>
      </Col>
    </Row>
  </Grid>
)
