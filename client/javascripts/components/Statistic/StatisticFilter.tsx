import { Moment } from 'moment'
import * as React from 'react'
import { Grid } from 'react-bootstrap'

import { PeriodFilter } from '../DisplayFilter'

export default (props: {
  onChangePeriodStart: (event: string | Moment) => void
  onChangePeriodEnd: (event: string | Moment) => void
}) => (
  <Grid className="display-filter">
    <PeriodFilter
      onChangePeriodStart={props.onChangePeriodStart}
      onChangePeriodEnd={props.onChangePeriodEnd}
    />
  </Grid>
)
