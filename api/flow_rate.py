#!/usr/bin/env python3
from api import tshark

def get_result(pcap_files, display_filter):
    time_list = []
    start_time_list, end_time_list = [], []

    filter = tshark.make_filter(display_filter)

    for pcap_file in pcap_files:
        # Get list of packet epoch time
        cmd = 'tshark -r \'{pcap}\' -T fields -e frame.time_epoch -Y "{filter}"' \
            .format(pcap=pcap_file, filter=filter)
        cmd_result = tshark.exec_command(cmd)
        tmp_time_list = [float(result) for result in cmd_result]
        if tmp_time_list:
            time_list.extend(tmp_time_list)
            start_time_list.append(int(tmp_time_list[0]))
            end_time_list.append(int(tmp_time_list[-1]))

    if not time_list:
        cmd = 'tshark -r \'{pcap}\' -T fields -e frame.time_epoch' \
            .format(pcap=pcap_files[0])
        cmd_result = tshark.exec_command(cmd)
        tmp_time_list = [float(result) for result in cmd_result]
        start_time_list.append(int(tmp_time_list[0]))
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
    interval = calc_interval(duration)

    # Count the number of packets
    label, data = [], []
    for time in range(start_time, end_time, interval):
        label.append(time)
        count = len([x for x in time_list if time < x < time + interval])
        data.append(count)
    return { 'label': label, 'data': data }

def calc_interval(duration):
    if duration > 60 * 60 * 24: return 60 * 60 * 24
    elif duration > 60 * 60:    return 60 * 60
    elif duration > 60 * 30:    return 60 * 2
    elif duration > 60:         return 60
    elif duration > 30:         return 2
    elif duration > 1:          return 1
    else:                       return 0.05
