import * as React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

import { NavType } from './index'

export default (props: { activeKey: NavType; onSelect: (key: NavType) => void }) => {
  const handleClickButton = (key: NavType) => () => props.onSelect(key)
  const isActive = (key: NavType) => props.activeKey === key
  return (
    <ButtonGroup justified={true} className="statistic-nav">
      <Button
        onClick={handleClickButton('protocol')}
        active={isActive('protocol')}
        className="statistic-nav__button"
      >
        プロトコル別統計
      </Button>
      <Button
        onClick={handleClickButton('ip')}
        active={isActive('ip')}
        className="statistic-nav__button"
      >
        IP別統計
      </Button>
      <Button
        onClick={handleClickButton('country')}
        active={isActive('country')}
        className="statistic-nav__button"
      >
        国別統計
      </Button>
    </ButtonGroup>
  )
}
