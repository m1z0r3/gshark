#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from flask import Flask
from flask import request, render_template
import json

app = Flask(__name__, static_folder='public')
app.config['JSON_AS_ASCII'] = False

@app.route('/')
def index():
    return render_template('index.html')

# GET /api/list_dir
@app.route('/api/list_dir', methods=['GET'])
def list_dir():
    from api.list_dir import get_result
    path = request.args.get('path')
    return get_result(path)

# GET /api/flow_rate
@app.route('/api/flow_rate', methods=['GGET'])
def flow_rate():
    from api.flow_rate import get_result
    query = request.json
    result = get_result(query['pcap_files'], query['display_filter'])
    return result

# GET /api/statistic
@app.route('/api/statistic', methods=['GGET'])
def statistic():
    from api.statistic import get_result
    query = request.json
    return get_result(query['pcap_files'], query['display_filter'])

# GET /api/packet_interval
@app.route('/api/packet_interval', methods=['GGET'])
def packet_interval():
    from api.packet_interval import get_result
    query = request.json
    return get_result(query['pcap_files'], query['display_filter'])

# GET /api/filter
@app.route('/api/filter', methods=['POST'])
def filter():
    from api.filter import get_result
    query = request.json
    return get_result(query['pcap_files'], query['output_file'], query['format'], query['display_filter'])


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
