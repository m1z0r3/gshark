import * as React from 'react'
import { Button, ControlLabel, FormControl, FormGroup, InputGroup } from 'react-bootstrap'

export default (props: {
  onChangeOutput: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onSubmit: () => void
}) => (
  <div className="flow-rate-export">
    <FormGroup>
      <ControlLabel>現在のフィルタ内容でpcapファイルを書き出すことができます</ControlLabel>
      <InputGroup>
        <InputGroup.Addon>出力ファイル名</InputGroup.Addon>
        <FormControl type="text" onChange={props.onChangeOutput} />
        <InputGroup.Button>
          <Button onClick={props.onSubmit}>出力</Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  </div>
)
