#!/usr/bin/env python3
import subprocess
import os
import json
import shutil

def get_result(pcap_files, output_file, format, display_filter):
    result = {}

    try:
        if not os.path.exists('./tmp'): os.makedirs('./tmp')

        from api.tshark import make_filter
        filter = make_filter(display_filter)

        tmp_files_count = 0
        tmp_files = []
        for pcap_file in pcap_files:
            cmd = 'tshark -r {pcap} -T fields -e frame.time_delta_displayed -Y "{filter}" -w ./tmp/{output}' \
                .format(pcap = pcap_file, filter = filter, output = tmp_files_count)
            tmp_files.append('./tmp/{output}'.format(output = tmp_files_count))
            exec_command(cmd)
            tmp_files_count += 1

        tmp_files = ' '.join(tmp_files)
        cmd = 'mergecap -w ./tmp/merged {tmp_files}'.format(tmp_files = tmp_files)

        exec_command(cmd)

        if format == 'pcap':
            cmd = 'tshark -r ./tmp/merged -w {output}'.format(output = output_file)
        else:
            cmd = 'tshark -r ./tmp/merged -T {format} > {output}'.format(format = format, output = output_file)
        exec_command(cmd)

        result = { 'succeeded': output_file }
    except Exception as e:
        result = { 'error': str(e) }


    shutil.rmtree('./tmp')
    return json.dumps(result)


def exec_command(cmd):
    try:
        completed = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        if completed.returncode != 0:
            error = completed.stderr.decode('utf-8')
            raise CommandError(error)
    except CommandError as e:
        raise CommandError(str(e))
    except:
        import traceback
        traceback.print_exc()
        raise ExecutionError('Something went wrong')

class ExecutionError(Exception):
    pass

class CommandError(Exception):
    pass
