#!/usr/bin/env python3
from flask import Flask
from flask import render_template, request, jsonify, redirect

app = Flask(__name__, static_folder='public')
app.config['JSON_AS_ASCII'] = False

#======================================================================#
# GET /
#======================================================================#
@app.route('/', methods=['GET'])
def index():
    return redirect('/flow')

#======================================================================#
# GET /flow
# GET /statistic
# GET /interval
# GET /filter
#======================================================================#
@app.route('/flow', methods=['GET'])
@app.route('/statistic', methods=['GET'])
@app.route('/interval', methods=['GET'])
@app.route('/filter', methods=['GET'])
def page():
    return render_template('index.html')

#======================================================================#
# GET /api/list_dir
#======================================================================#
@app.route('/api/list_dir', methods=['GET'])
def list_dir():
    from api.list_dir import get_result
    path = request.args.get('path')
    result = get_result(path)
    return jsonify(result)

#======================================================================#
# GGET /api/flow_rate
#======================================================================#
@app.route('/api/flow_rate', methods=['GGET'])
def flow_rate():
    from api.flow_rate import get_result
    query = request.json
    result = get_result(query['pcap_files'], query['display_filter'])
    return jsonify(result)

#======================================================================#
# GGET /api/statistic
#======================================================================#
@app.route('/api/statistic', methods=['GGET'])
def statistic():
    from api.statistic import get_result
    query = request.json
    result = get_result(query['pcap_files'], query['display_filter'])
    return jsonify(result)

#======================================================================#
# GGET /api/packet_interval
#======================================================================#
@app.route('/api/packet_interval', methods=['GGET'])
def packet_interval():
    from api.packet_interval import get_result
    query = request.json
    result = get_result(query['pcap_files'], query['display_filter'])
    return jsonify(result)

#======================================================================#
# POST /api/filter
#======================================================================#
@app.route('/api/filter', methods=['POST'])
def filter():
    from api.filter import get_result
    query = request.json
    result = get_result(query['pcap_files'], query['output_file'],
        query['format'], query['display_filter'])
    return jsonify(result)

#======================================================================#

if __name__ == '__main__':
    app.run()
