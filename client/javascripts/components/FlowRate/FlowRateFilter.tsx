import { Moment } from 'moment'
import * as React from 'react'
import { FormControl, Grid } from 'react-bootstrap'

import { Help, IPFilter, PeriodFilter, ProtocolFilter } from '../DisplayFilter'

export default (props: {
  onChangeProtocol: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeSrcIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangePeriodStart: (event: string | Moment) => void
  onChangePeriodEnd: (event: string | Moment) => void
}) => (
  <Grid className="display-filter">
    <ProtocolFilter onChangeProtocol={props.onChangeProtocol} />
    <IPFilter onChangeSrcIp={props.onChangeSrcIp} onChangeDstIp={props.onChangeDstIp} />
    <PeriodFilter
      onChangePeriodStart={props.onChangePeriodStart}
      onChangePeriodEnd={props.onChangePeriodEnd}
    />
    <Help />
  </Grid>
)
