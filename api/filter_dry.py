#!/usr/bin/env python3
from . import tshark


def get_result(input_files, filter, format, output_file):
    results = []
    for file in input_files:
        command = tshark.make_tshark_command(file, filter, format, output_file)
        results.append(command)

    return {'commands': results}
