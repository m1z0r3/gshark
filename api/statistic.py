#!/usr/bin/env python3
import os
import ipaddress
import geoip2.database
from collections import Counter
from . import tshark
from .blacklist import BlackList


def get_result(input_files, filter):
    database = os.path.join('tools', 'geoip2', 'GeoLite2-Country.mmdb')
    reader = geoip2.database.Reader(database)

    blacklist_ip = os.path.join('tools', 'blacklist', 'ip')
    blacklist_domain = os.path.join('tools', 'blacklist', 'domain')
    blacklist = BlackList(blacklist_ip, blacklist_domain)

    ips, protocols, http_hosts = [], [], []
    for file in input_files:
        fields = ['ip.src', 'ip.dst', '_ws.col.Protocol', 'http.host']
        cmd_result = tshark.fields(file, filter, fields, two_pass=True)
        for line in cmd_result:
            elements = line.split('\t')
            if elements[0] and is_ipaddress(elements[0]):
                ips.append(elements[0])
            if elements[1] and is_ipaddress(elements[1]):
                ips.append(elements[1])
            if elements[2]:
                protocols.append(elements[2])
            if len(elements) >= 4 and elements[3]:
                http_hosts.append((elements[1], elements[3]))

    # Update ip blacklist by host
    for ip, host in set(http_hosts):
        if host and not is_ipaddress(host.split(':')[0]):  # Skip if host is in 'ip:port' format
            if blacklist.is_malicious_domain(host):
                blacklist.ips.append(ip)

    # Calcuate statistics of protocols
    label_p, data_p = get_label_and_data(Counter(protocols))
    ratio_p = [data * 100 / sum(data_p) for data in data_p]
    result_p = {'label': label_p, 'data': data_p, 'ratio': ratio_p}

    # Calcuate statistics of all ips
    label_ai, data_ai = get_label_and_data(Counter(ips))
    ratio_ai = [data * 100 / sum(data_ai) for data in data_ai]
    result_ai = {'label': label_ai, 'data': data_ai, 'ratio': ratio_ai}

    # Check whether ips are included in blacklist
    black_ips = {}
    for ip, data in zip(label_ai, data_ai):
        if blacklist.is_malicious_ip(ip):
            black_ips[ip] = data

    # Calcuate statistics of blacklist ips
    label_bi, data_bi = get_label_and_data(black_ips)
    ratio_bi = [data * 100 / sum(data_bi) for data in data_bi]
    result_bi = {'label': label_bi, 'data': data_bi, 'ratio': ratio_bi}
    result_i = {'all': result_ai, 'black': result_bi}

    # Get country name by GeoIP
    countries, black_countries = {}, {}
    for ip, count in zip(label_ai, data_ai):
        try:
            country_name = reader.country(ip).country.name or 'Unknown'
        except:  # NOQA
            ipv4 = ipaddress.ip_address(ip)
            country_name = 'Private' if ipv4.is_private else 'Unknown'

        if country_name in countries:
            countries[country_name] += int(count)
        else:
            countries[country_name] = int(count)

        if blacklist.is_malicious_ip(ip):
            if country_name in black_countries:
                black_countries[country_name] += int(count)
            else:
                black_countries[country_name] = int(count)

    # Calcuate statistics of all countries
    label_ac, data_ac = get_label_and_data(countries)
    ratio_ac = [data * 100 / sum(data_ac) for data in data_ac]
    result_ac = {'label': label_ac, 'data': data_ac, 'ratio': ratio_ac}

    # Calcuate statistics of blacklist countries
    label_bc, data_bc = get_label_and_data(black_countries)
    ratio_bc = [data * 100 / sum(data_bc) for data in data_bc]
    result_bc = {'label': label_bc, 'data': data_bc, 'ratio': ratio_bc}
    result_c = {'all': result_ac, 'black': result_bc}

    return {'protocol': result_p, 'ip': result_i, 'country': result_c}


def get_label_and_data(counter):
    label, data = [], []
    for key, value in sorted(counter.items(), key=lambda x: -x[1]):
        label.append(key)
        data.append(value)
    return label, data


def is_ipaddress(ip):
    try:
        ipaddress.ip_address(ip)
    except ValueError:
        return False
    return True
