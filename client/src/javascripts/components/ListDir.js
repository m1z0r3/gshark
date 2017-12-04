// @flow
import React from 'react'
import { Panel, Table } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import $ from 'jquery'
import moment from 'moment'

type Props = {
  onClickPcap: (Array<string>) => void,
}

type State = {
  currentPath: string,
  data: {
    dir: boolean,
    mode: string,
    modify: number,
    name: string,
    size: string,
  }[],
}

export default class ListDir extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentPath: '.',
      data: [],
    }
  }

  componentDidMount() {
    this.getListDir(this.state.currentPath)
  }

  handleClickPcap(key: number) {
    let data = JSON.parse(JSON.stringify(this.state.data))
    data[key].selected = !data[key].selected
    this.setState({ data: data })
    this.props.onClickPcap(
      data.filter(file => file.selected).map(file => this.fullPath(file.name)),
    )
  }

  handleClickDir(dir: string) {
    this.getListDir(`${this.state.currentPath}/${dir}`)
    this.props.onClickPcap([])
  }

  getListDir(path: string) {
    const url = '/api/list_dir'
    $.ajax({
      url: url,
      type: 'GET',
      data: { path: path },
      dataType: 'json',
      success: data => {
        this.setState({ data: data['result'], currentPath: data['path'] })
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString())
      },
    })
  }

  isPcapFile(filename: string): boolean {
    const filenameArray = filename.split('.')
    if (filenameArray.length === 1) return false
    const extension = filenameArray[filenameArray.length - 1]
    return extension === 'pcap' || extension === 'pcapng'
  }

  fullPath(filename: string): string {
    return `${this.state.currentPath}/${filename}`
  }

  render() {
    return (
      <Panel className="listDirPanel">
        <FontAwesome
          name="arrow-up"
          onClick={this.handleClickDir.bind(this, '../')}
          className="listDirPointer listDirArrowUp"
        />
        <span className="listDirPanelPath">{this.state.currentPath}</span>
        <Table className="listDirPanelTable">
          <tbody>
            {this.state.data.map((file, index) => {
              return this.isPcapFile(file.name) ? (
                <tr className="listDirPcapTr" key={index}>
                  <td
                    onClick={this.handleClickPcap.bind(this, index)}
                    className="listDirPointer"
                  >
                    <FontAwesome
                      name={`${file.selected ? 'check-' : ''}square-o`}
                    />
                    {` ${file.name}`}
                  </td>
                  <td>{file.size || 0}</td>
                  <td>{file.mode}</td>
                  <td>
                    {moment(file.modify * 1000).format('YYYY/MM/DD HH:mm:ss')}
                  </td>
                </tr>
              ) : (
                <tr>
                  {file.dir ? (
                    <td
                      onClick={this.handleClickDir.bind(this, `${file.name}/`)}
                    >
                      <a href="#">{`${file.name}/`}</a>
                    </td>
                  ) : (
                    <td>{file.name}</td>
                  )}
                  <td>{file.size || 0}</td>
                  <td>{file.mode}</td>
                  <td>
                    {moment(file.modify * 1000).format('YYYY/MM/DD HH:mm:ss')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Panel>
    )
  }
}
