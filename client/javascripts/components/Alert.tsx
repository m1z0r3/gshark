import * as React from 'react'
import { Alert } from 'react-bootstrap'

export default (props: {
  alertType: 'success' | 'danger'
  message: string
  onDismiss: () => void
}) => (
  <Alert bsStyle={props.alertType} onDismiss={props.onDismiss}>
    <strong>{props.alertType === 'success' ? 'Success: ' : 'Error: '}</strong>
    {props.message}
  </Alert>
)
