export interface State {
  file: string
  format: string
}

export const initialState: State = {
  file: '',
  format: 'pcap',
}
