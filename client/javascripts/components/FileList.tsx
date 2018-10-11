import axios from 'axios'
import * as React from 'react'
import { Breadcrumb, Panel, Table } from 'react-bootstrap'
import * as FontAwesome from 'react-fontawesome'

import { formatUnixTime } from '../tools'

interface Props {
  onClickPcap: (pcapFiles: string[]) => void
}

interface State {
  currentPath: string
  files: {
    dir: boolean
    mode: string
    modify: number
    name: string
    size: string
    selected?: boolean
  }[]
}

export default class FileList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentPath: '.',
      files: [],
    }
  }

  public componentDidMount() {
    this.getFileList(this.state.currentPath)
  }

  public handleClickPcap(key: number) {
    const files: State['files'] = JSON.parse(JSON.stringify(this.state.files))
    files[key].selected = !files[key].selected
    this.setState({ files })
    this.props.onClickPcap(
      files.filter(file => file.selected).map(file => this.fullPath(file.name)),
    )
  }

  public handleClickDir(path: string) {
    this.getFileList(path)
    this.props.onClickPcap([])
  }

  public getFileList(path: string) {
    const url = '/api/file_list'
    axios
      .get(url, { params: { path } })
      .then(response => {
        this.setState({
          files: response.data.result,
          currentPath: response.data.path,
        })
      })
      .catch(error => {
        console.error(url, error.toString())
      })
  }

  public render() {
    return (
      <div className="file-list">
        <Breadcrumb className="file-list-breadcrumb">
          {this.state.currentPath.split('/').map((dirname, index) => {
            const path = this.state.currentPath
              .split('/')
              .slice(0, index + 1)
              .join('/')
            return (
              <li key={index}>
                {path === this.state.currentPath ? (
                  <span className="file-list-breadcrumb__item--active">{dirname}</span>
                ) : (
                  <span
                    className="file-list-breadcrumb__item file-list__pointer"
                    onClick={this.handleClickDir.bind(this, path)}
                  >
                    {dirname}
                  </span>
                )}
              </li>
            )
          })}
        </Breadcrumb>
        <Panel className="file-list-panel">
          <Table className="file-list-panel__table">
            <tbody>
              {this.state.files.map((file, index) => {
                return this.isPcapFile(file.name) ? (
                  <tr className="file-list-panel__tr file-list-panel__tr--pcap" key={index}>
                    <td
                      className="file-list-panel__td file-list__pointer"
                      onClick={this.handleClickPcap.bind(this, index)}
                    >
                      <FontAwesome name={`${file.selected ? 'check-' : ''}square-o`} />
                    </td>
                    <td
                      className="file-list-panel__td file-list__pointer"
                      onClick={this.handleClickPcap.bind(this, index)}
                    >
                      {` ${file.name}`}
                    </td>
                    <td className="file-list-panel__td">{file.size || 0}</td>
                    <td className="file-list-panel__td">{file.mode}</td>
                    <td className="file-list-panel__td">{formatUnixTime(file.modify)}</td>
                  </tr>
                ) : (
                  <tr className="file-list-panel__tr" key={index}>
                    {file.dir ? (
                      <React.Fragment>
                        <td className="file-list-panel__td">
                          <FontAwesome name="folder-open-o" />
                        </td>
                        <td
                          className="file-list-panel__td file-list-panel__td--dir file-list__pointer"
                          onClick={this.handleClickDir.bind(this, this.fullPath(file.name))}
                        >
                          {`${file.name}/`}
                        </td>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <td className="file-list-panel__td">
                          <FontAwesome name="file-text-o" />
                        </td>
                        <td className="file-list-panel__td">{file.name}</td>
                      </React.Fragment>
                    )}
                    <td className="file-list-panel__td">{file.size || 0}</td>
                    <td className="file-list-panel__td">{file.mode}</td>
                    <td className="file-list-panel__td">{formatUnixTime(file.modify)}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Panel>
      </div>
    )
  }

  private isPcapFile(filename: string): boolean {
    const filenameArray = filename.split('.')
    if (filenameArray.length === 1) return false
    const extension = filenameArray[filenameArray.length - 1]
    return extension === 'pcap' || extension === 'pcapng'
  }

  private fullPath(filename: string): string {
    return `${this.state.currentPath}/${filename}`
  }
}
