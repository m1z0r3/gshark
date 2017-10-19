#!/usr/bin/env python3
import os
import shutil
from api import tshark

def get_result(pcap_files, output_file, format, display_filter):
    try:
        if not os.path.exists('./tmp'): os.makedirs('./tmp')

        filter = tshark.make_filter(display_filter)

        tmp_files = []
        for pcap_file in pcap_files:
            tmp_file = './tmp/{number}'.format(number=len(tmp_files))
            cmd = 'tshark -r \'{pcap}\' -Y "{filter}" -w {output}' \
                .format(pcap=pcap_file, filter=filter, output=tmp_file)
            tmp_files.append(tmp_file)
            tshark.exec_command(cmd)

        tmp_files = ' '.join(tmp_files)
        cmd = 'mergecap -w ./tmp/merged {tmp_files}'.format(tmp_files=tmp_files)
        tshark.exec_command(cmd)

        if format == 'pcap':
            cmd = 'tshark -r ./tmp/merged -w {output}'.format(output=output_file)
        else:
            cmd = 'tshark -r ./tmp/merged -T {format} > {output}' \
                .format(format=format, output=output_file)
        tshark.exec_command(cmd)
        result = { 'succeeded': output_file }

    except Exception as e:
        result = { 'error': str(e) }

    shutil.rmtree('./tmp')
    return result
