#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import subprocess
import json

def get_result(pcap_files, display_filter):
    time_list = []
    start_time_list, end_time_list = [], []
    for pcap_file in pcap_files:
        # Get list of packet epoch time
        tmp_time_list = exec_tshark(pcap_file, display_filter)
        time_list.extend(tmp_time_list)
        if tmp_time_list:
            if not display_filter.get('period_start'):
                start_time_list.append(int(tmp_time_list[0]))
            if not display_filter.get('period_end'):
                end_time_list.append(int(tmp_time_list[-1]))

    # If period is specified, it is set as the time axis
    if display_filter.get('period_start'):
        start_time = int(display_filter['period_start'])
    else:
        start_time = min(start_time_list)
    if display_filter.get('period_end'):
        end_time = int(display_filter['period_end'])
    else:
        end_time = max(end_time_list)

    # Calc interval
    duration = end_time - start_time
    if duration <= 0: return { 'label': [], 'data': [] }
    interval = calc_interval(duration)

    # Count the number of packets
    label, data = [], []
    for time in range(start_time, end_time, interval):
        label.append(time)
        count = len([x for x in time_list if time < x < time + interval])
        data.append(count)
    return json.dumps({ 'label': label, 'data': data })

def exec_tshark(pcap_file, display_filter):
    filter_list = []
    # Network
    if display_filter.get('network'):
        if display_filter['network'] == 'icmp':
            filter_list.append('icmp')
        elif display_filter['network'] == 'ipv4':
            filter_list.append('ip')
        elif display_filter['network'] == 'ipv6':
            filter_list.append('ipv6')
    # Transport
    if display_filter.get('transport'):
        filter_list.append(display_filter['transport'])
    # Application
    if display_filter.get('application'):
        filter_list.append(display_filter['application'])
    # Period Start
    if display_filter.get('period_start'):
        filter_list.append('frame.time_epoch >= %s' % display_filter['period_start'])
    # Period End
    if display_filter.get('period_end'):
        filter_list.append('frame.time_epoch <= %s' % display_filter['period_end'])

    filter = ' and '.join(filter_list)
    cmd = 'tshark -r {pcap} -T fields -e frame.time_epoch -Y "{filter}"'.format(
        pcap=pcap_file, filter=filter)
    res_list = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True).stdout.readlines()
    return [float(res.decode('utf-8').strip()) for res in res_list]

def calc_interval(duration):
    if duration > 60 * 60 * 24:
        return 60 * 60 * 24
    elif duration > 60 * 60:
        return 60 * 60
    elif duration > 60 * 30:
        return 60 * 2
    elif duration > 60:
        return 60
    elif duration > 30:
        return 2
    elif duration > 1:
        return 1
    else:
        return 0.05
