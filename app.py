#!/usr/bin/env python3
from flask import Flask
from flask import render_template, request, jsonify, redirect
from api import query

app = Flask(__name__, static_folder='public')
app.config['JSON_AS_ASCII'] = False


@app.route('/', methods=['GET'])
def index():
    return redirect('/statistic')


@app.route('/flow', methods=['GET'])
@app.route('/statistic', methods=['GET'])
@app.route('/interval', methods=['GET'])
@app.route('/filter', methods=['GET'])
@app.route('/ddos', methods=['GET'])
def page():
    return render_template('index.html')


@app.route('/api/file_list', methods=['GET'])
def file_list():
    from api.file_list import get_result
    path = request.args.get('path')
    result = get_result(path)
    return jsonify(result)


@app.route('/api/flow_rate', methods=['POST'])
def flow_rate():
    from api.flow_rate import get_result
    data = query.parse(request.json)
    result = get_result(data.input.files, data.filter)
    return jsonify(result)


@app.route('/api/statistic', methods=['POST'])
def statistic():
    from api.statistic import get_result
    data = query.parse(request.json)
    result = get_result(data.input.files, data.filter)
    return jsonify(result)


@app.route('/api/packet_interval', methods=['POST'])
def packet_interval():
    from api.packet_interval import get_result
    data = query.parse(request.json)
    result = get_result(data.input.files, data.filter)
    return jsonify(result)


@app.route('/api/filter', methods=['POST'])
def filter():
    from api.filter import get_result
    data = query.parse(request.json)
    result = get_result(data.input.files, data.filter, data.output.format, data.output.file)
    return jsonify(result)


@app.route('/api/filter-dry', methods=['POST'])
def filter_dry():
    from api.filter_dry import get_result
    data = query.parse(request.json)
    result = get_result(data.input.files, data.filter, data.output.format, data.output.file)
    return jsonify(result)


@app.route('/api/ddos_detection', methods=['POST'])
def detect_ddos():
    from api.ddos_detection import get_result
    data = query.parse(request.json)
    result = get_result(data.input.files, data.filter, data.threshold, data.window)
    return jsonify(result)


if __name__ == '__main__':
    app.run()
