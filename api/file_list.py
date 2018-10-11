#!/usr/bin/env python3
import os
import stat
import math


def get_result(path):
    result = []
    for filename in os.listdir(path):
        filepath = os.path.join(path, filename)
        st = os.stat(filepath)
        result.append({
            'dir': os.path.isdir(filepath),
            'name': filename,
            'modify': math.floor(st.st_mtime),
            'mode': stat.filemode(st.st_mode),
            'size': convert_bytes(st.st_size)
        })
    result = sorted(result, key=lambda x: (-x['dir'], x['name']))
    return {'path': os.path.abspath(path), 'result': result}


def convert_bytes(num):
    for x in ['B', 'KB', 'MB', 'GB', 'TB']:
        if num < 1024.0:
            return "%3.1f %s" % (num, x)
        num /= 1024.0
