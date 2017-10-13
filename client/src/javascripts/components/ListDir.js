import React from 'react'
import { Panel, Table } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import $ from 'jquery'
import moment from 'moment'

export default class ListDir extends React.Component {
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

  handleClickPcap(key, event) {
    let data = JSON.parse(JSON.stringify(this.state.data))
    data[key].selected = !data[key].selected
    this.setState({ data: data })
    this.props.onClickPcap(
      data.filter(file => file.selected).map(file => this.fullPath(file.name)),
    )
  }

  handleClickDir(dir, event) {
    this.getListDir(`${this.state.currentPath}/${dir}`)
    this.props.onClickPcap([])
  }

  getListDir(path) {
    $.ajax({
      url: '/api/list_dir',
      type: 'GET',
      data: { path: path },
      dataType: 'json',
      success: data => {
        this.setState({ data: data['result'], currentPath: data['path'] })
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      },
    })
  }

  isPcapFile(filename) {
    let filenameArray = filename.split('.')
    if (filenameArray.length === 1) return false
    let extension = filenameArray[filenameArray.length - 1]
    return extension === 'pcap' || extension === 'pcapng'
  }

  fullPath(filename) {
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
                <tr className="listDirPcapTr">
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
