#!/usr/bin/env python3
import os
import shutil
from . import tshark


def get_result(input_files, filter, format, output_file):
    try:
        if not os.path.exists('./tmp'):
            os.makedirs('./tmp')

        tmp_files = []
        for file in input_files:
            tmp_file = './tmp/{number}'.format(number=len(tmp_files))
            tmp_files.append(tmp_file)
            tshark.run(file, filter, 'pcap', tmp_file)

        tmp_files = ' '.join(tmp_files)
        command = 'mergecap -w ./tmp/merged {tmp_files}'.format(tmp_files=tmp_files)
        tshark.exec_command(command)

        tshark.run('./tmp/merged', tshark.Filter(), format, output_file)
        result = {'result': True, 'message': output_file}

    except Exception as e:
        result = {'result': False, 'message': str(e)}

    shutil.rmtree('./tmp')
    return result
