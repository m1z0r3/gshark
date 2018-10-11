import * as React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'

const onHide = () => false

export default (props: { isOpen: boolean; handleClose: () => void }) => {
  return (
    <Modal show={props.isOpen} onHide={onHide} bsSize="lg">
      <Modal.Body>
        <BeatLoader
          size={30}
          color={'#36D7B7'}
          loading={props.isOpen}
          className={'loading-modal-loader'}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose}>キャンセル</Button>
      </Modal.Footer>
    </Modal>
  )
}
