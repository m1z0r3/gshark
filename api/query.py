#!/usr/bin/env python3
from .tshark import Filter

"""
gshark API Request query parser

Usage:

    >>> from api import query
    >>> data = {
    ...   "input": {
    ...     "files": [
    ...       "/path/to/input1.pcap",
    ...       "/path/to/input2.pcap"
    ...     ]
    ...   },
    ...   "filter": {
    ...     "ip": {
    ...       "src": [
    ...         "192.168.0.1",
    ...         "192.168.0.2"
    ...       ],
    ...       "dst": [
    ...         "192.168.0.1",
    ...         "192.168.0.2"
    ...       ]
    ...     },
    ...     "port": {
    ...       "src": [
    ...         80,
    ...         8080
    ...       ],
    ...       "dst": [
    ...         80,
    ...         8080
    ...       ],
    ...     },
    ...     "protocol": "HTTP",
    ...     "period": {
    ...       "start": 1500000000,
    ...       "end": 1600000000
    ...     }
    ...   },
    ...   "output": {
    ...     "file": "/path/to/output.pcap",
    ...     "format": "pcap"
    ...   }
    ... }
    >>> data = query.parse(data)
    >>> data
    <api.query.Query object at 0x10f59df60>
    >>> data.input.files
    ['/path/to/input1.pcap', '/path/to/input2.pcap']
    >>> data.filter
    <api.tshark.Filter object at 0x10f53c320>
    >>> data.filter.ip.src
    ['192.168.0.1', '192.168.0.2']
    >>> data.filter.protocol
    'HTTP'
    >>> data.output.format
    'pcap'
"""


def parse(query):
    input_files = query.get('input', {}).get('files') or []
    input = Query.Input(input_files)

    protocol = query.get('filter', {}).get('protocol') or None
    srcip = query.get('filter', {}).get('ip', {}).get('src') or []
    dstip = query.get('filter', {}).get('ip', {}).get('dst') or []
    srcport = query.get('filter', {}).get('port', {}).get('src') or []
    dstport = query.get('filter', {}).get('port', {}).get('dst', []) or []
    start = query.get('filter', {}).get('period', {}).get('start', None)
    end = query.get('filter', {}).get('period', {}).get('end', None)
    filter = Filter(protocol, srcip, dstip, srcport, dstport, start, end)

    output_file = query.get('output', {}).get('file') or ''
    output_format = query.get('output', {}).get('format') or 'pcap'
    output = Query.Output(output_file, output_format)

    threshold = query.get('threshold')
    threshold = int(threshold) if isinstance(threshold, str) else threshold
    window = query.get('window')
    window = int(window) if isinstance(window, str) else window

    return Query(input, filter, output, threshold, window)


class Query:
    def __init__(self, input=None, filter=None, output=None, threshold=None, window=None):
        self.input = input
        self.filter = filter
        self.output = output
        self.threshold = threshold
        self.window = window

    class Input:
        def __init__(self, files):
            self.files = files or []

    class Output:
        def __init__(self, file, format):
            self.file = file or ''
            self.format = format or 'pcap'
