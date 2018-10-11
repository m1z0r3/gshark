#!/usr/bin/env python3
import numpy as np
from . import tshark


def get_result(input_files, filter):
    time_list = []

    for file in input_files:
        cmd_result = tshark.fields(file, filter, ['frame.time_delta_displayed'])
        time_list.extend([float(result) for result in cmd_result])

    if len(time_list) > 0:
        freq, intervals = np.histogram(time_list, 100)
        freq, intervals = freq.tolist(), intervals.tolist()
    else:
        freq, intervals = [], []
    return {'freq': freq, 'intervals': intervals}
