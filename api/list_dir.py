#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import os.path
import stat
import math
import json

def get_result(path):
    dirs = os.listdir(path)
    result = []
    for d in dirs:
        name = path + '/' + d
        st = os.stat(name)
        if os.path.isfile(name):
            result.append(dict(dir=False, name=d, modify=math.floor(st.st_mtime),
                mode=stat.filemode(st.st_mode), size=convert_bytes(st.st_size)))
        elif os.path.isdir(name):
            result.append(dict(dir=True, name=d, modify=math.floor(st.st_mtime),
                mode=stat.filemode(st.st_mode), size=convert_bytes(st.st_size)))
    return json.dumps({ 'path': os.path.abspath(path), 'result': result })

def convert_bytes(num):
    for x in ['B', 'KB', 'MB', 'GB', 'TB']:
        if num < 1024.0:
            return "%3.1f %s" % (num, x)
        num /= 1024.0
