#!/usr/bin/env python3
from collections import Counter
from api import tshark

def get_result(pcap_files, display_filter):
    results = []

    filter = tshark.make_filter(display_filter)

    for pcap_file in pcap_files:
        cmd = 'tshark -r \'{pcap}\' -2 -T fields -e _ws.col.Protocol -Y "{filter}"' \
            .format(pcap=pcap_file, filter=filter)
        cmd_result = tshark.exec_command(cmd)
        results.append(Counter(cmd_result))

    couner = Counter()
    for result in results:
        couner.update(result)

    label, data = [], []
    for k, v in sorted(couner.items(), key=lambda x: -x[1]):
        label.append(k)
        data.append(v)
    ratio = [v * 100 / sum(data) for v in data]
    return { 'label': label, 'data': data, 'ratio': ratio }
