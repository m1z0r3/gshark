#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import subprocess
import numpy as np
import json

def get_result(pcap_files, display_filter):
    time_list = []
    for pcap_file in pcap_files:
        time_list.extend(exec_tshark(pcap_file, display_filter))

    if (len(time_list) > 0):
        freq, intervals = np.histogram(time_list, 100)
        freq = freq.tolist()
        intervals = intervals.tolist()
    else:
        freq, intervals = ([], [])

    return json.dumps({ 'freq': freq, 'intervals': intervals })

def exec_tshark(pcap_file, display_filter):
    from api.tshark import make_filter
    filter = make_filter(display_filter)

    cmd = 'tshark -r {pcap} -T fields -e frame.time_delta_displayed -Y "{filter}"' \
        .format(pcap=pcap_file, filter=filter)

    res_list = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True).stdout.readlines()
    intervals = [float(res.decode('utf-8').strip()) for res in res_list]

    return intervals
