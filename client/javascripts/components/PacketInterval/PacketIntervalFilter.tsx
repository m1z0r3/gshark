import { Moment } from 'moment'
import * as React from 'react'
import { FormControl, Grid } from 'react-bootstrap'

import { Help, IPFilter, PeriodFilter, PortFilter, ProtocolFilter } from '../DisplayFilter'

export default (props: {
  onChangeProtocol: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeSrcIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeSrcPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangePeriodStart: (event: string | Moment) => void
  onChangePeriodEnd: (event: string | Moment) => void
}) => (
  <Grid className="display-filter">
    <ProtocolFilter onChangeProtocol={props.onChangeProtocol} />
    <IPFilter onChangeSrcIp={props.onChangeSrcIp} onChangeDstIp={props.onChangeDstIp} />
    <PortFilter onChangeSrcPort={props.onChangeSrcPort} onChangeDstPort={props.onChangeDstPort} />
    <PeriodFilter
      onChangePeriodStart={props.onChangePeriodStart}
      onChangePeriodEnd={props.onChangePeriodEnd}
    />
    <Help />
  </Grid>
)
