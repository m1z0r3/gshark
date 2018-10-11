import * as React from 'react'
import { Checkbox } from 'react-bootstrap'

export default (props: { onClick: (checked: boolean) => void }) => {
  const handleClickCheckbox = (event: React.FormEvent<Checkbox & HTMLInputElement>) => {
    props.onClick(event.currentTarget.checked)
  }
  return (
    <div className="statistic-blacklist">
      <Checkbox onChange={handleClickCheckbox}>ブラックリストのみ表示</Checkbox>
    </div>
  )
}
