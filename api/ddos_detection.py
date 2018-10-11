#!/usr/bin/env python3
from . import tshark


def get_result(input_files, filter, threshold, window):
    time_epoch = None
    packets = {}
    detected = []

    for file in input_files:
        fields = ['frame.time_relative', 'frame.time_epoch', 'ip.dst']
        cmd_result = tshark.fields(file, filter, fields)

        time_counter = window
        first_packet = cmd_result[0]
        data = first_packet.split('\t')
        time_epoch = float(data[1])

        for packet in cmd_result:
            data = packet.split('\t')
            if float(data[0]) < time_counter:
                increment(packets, data[2])
            else:
                detect(detected, packets, threshold, window, time_epoch + time_counter, file)
                packets = {}
                while time_counter < float(data[0]):
                    time_counter += window
                increment(packets, data[2])

        detect(detected, packets, threshold, window, time_epoch + time_counter, file)

    return detected


def detect(detected, packets, threshold, window, start_time_epoch, file):
    for ip, count in packets.items():
        if count >= threshold:
            detected.append({
                'dstip': ip,
                'count': count,
                'file': file,
                'start': start_time_epoch,
                'end': start_time_epoch + window,
            })


def increment(packets, ip):
    if packets.get(ip):
        packets[ip] += 1
    else:
        packets[ip] = 1
