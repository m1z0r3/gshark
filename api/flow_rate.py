#!/usr/bin/env python3
from . import tshark


def get_result(input_files, filter):
    time_list = []

    for file in input_files:
        cmd_result = tshark.fields(file, filter, ['frame.time_epoch'])
        time_list.extend([float(result) for result in cmd_result])

    # If period is specified, it is set as the time axis
    if filter.period.start:
        start_time = int(filter.period.start)
    else:
        start_time = int(min(time_list)) if time_list else None

    if filter.period.end:
        end_time = int(filter.period.end)
    else:
        end_time = int(max(time_list)) if time_list else None

    # Set value if start_time or end_time is None
    start_time = start_time or end_time
    end_time = end_time or start_time

    # Calc interval
    duration = end_time - start_time
    interval = calc_interval(duration)

    # Count the number of packets
    label, data = [], []
    for time in range(start_time, end_time, interval):
        label.append(time)
        count = len([x for x in time_list if time < x < time + interval])
        data.append(count)
    return {'label': label, 'data': data}


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
    else:
        return 1
