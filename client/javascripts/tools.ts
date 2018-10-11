import * as moment from 'moment'

export function formatUnixTime(time: number): string {
  return moment(time * 1000).format('YYYY/MM/DD HH:mm:ss')
}

export function getFileNameFromFilePath(path: string) {
  return path.split('/')[path.split('/').length - 1]
}
