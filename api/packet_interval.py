#!/usr/bin/env python3
import numpy as np
from api import tshark

def get_result(pcap_files, display_filter):
    time_list = []

    filter = tshark.make_filter(display_filter)

    for pcap_file in pcap_files:
        cmd = 'tshark -r \'{pcap}\' -T fields -e frame.time_delta_displayed -Y "{filter}"' \
            .format(pcap=pcap_file, filter=filter)
        cmd_result = tshark.exec_command(cmd)
        time_list.extend([float(result) for result in cmd_result])

    if (len(time_list) > 0):
        freq, intervals = np.histogram(time_list, 100)
        freq = freq.tolist()
        intervals = intervals.tolist()
    else:
        freq, intervals = ([], [])
    return { 'freq': freq, 'intervals': intervals }
