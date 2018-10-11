import axios from 'axios'
import * as React from 'react'

import { FilterQuery } from '../../types'

interface Props {
  query: FilterQuery
}

interface State {
  commands: string[]
}

export default class ExportCommand extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { commands: [] }
  }

  public componentDidMount() {
    if (this.props.query.input.files.length > 0) {
      this.getCommands(this.props.query)
    }
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.query.input.files.length > 0) {
      this.getCommands(nextProps.query)
    } else {
      this.setState({ commands: [] })
    }
  }

  public getCommands(query: FilterQuery) {
    const url = '/api/filter-dry'
    axios
      .post(url, query)
      .then(response => {
        this.setState({ commands: response.data.commands })
      })
      .catch(error => {
        console.error(url, error.toString())
      })
  }

  public render() {
    return (
      <div className="export-command">
        {this.state.commands.length > 0 ? (
          this.state.commands.map((command, index) => {
            return (
              <pre className="export-command__item" key={index}>
                {command}
              </pre>
            )
          })
        ) : (
          <pre className="export-command__item" />
        )}
      </div>
    )
  }
}
