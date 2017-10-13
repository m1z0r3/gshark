#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import subprocess
import json
from collections import Counter

def get_result(files, display_filter):
    results = []
    for file in files:
        cmd = 'tshark -r {file_path} -2 -T fields -e _ws.col.Protocol'.format(file_path=file)
        if display_filter.get('period_start'):
            cmd += ' -Y "frame.time_epoch > {start}"'.format(start=display_filter['period_start'])
        if display_filter.get('period_end'):
            if display_filter.get('period_start'):
                cmd = cmd[:-1] + ' && frame.time_epoch < {end}"'.format(end=display_filter['period_end'])
            else:
                cmd += ' -Y "frame.time_epoch < {end}"'.format(end=display_filter['period_end'])

        res_list = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True).stdout.readlines()
        protocols = [res.decode('utf-8').strip() for res in res_list]
        results.append(Counter(protocols))

    c = Counter()
    for d in results:
        c.update(d)
    results = c

    label, data = [], []
    for k, v in sorted(results.items(), key=lambda x: -x[1]):
        label.append(k)
        data.append(v)
    ratio = [v * 100 / sum(data) for v in data]
    return json.dumps({ 'label': label, 'data': data, 'ratio': ratio })
