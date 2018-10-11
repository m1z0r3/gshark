#!/usr/bin/env python3
import os
import ipaddress
import subprocess


def load_file(file_path):
    with open(file_path, 'r') as f:
        result = f.read().strip().split('\n')
    return result


def load_blacklist(path):
    if os.path.isdir(path):
        result = []
        for filename in os.listdir(path):
            filepath = os.path.join(path, filename)
            result.extend(load_file(filepath))
        return result
    if os.path.isfile(path):
        return load_file(filepath)
    else:
        return []


class BlackList:
    def __init__(self, blacklist_ip, blacklist_domain, exclude=None):
        self.ips = load_blacklist(blacklist_ip)
        self.domains = load_blacklist(blacklist_domain)
        self.exclude = exclude or []

    def is_malicious_ip(self, ip):
        if ip in self.exclude:
            return False
        elif ip in self.ips:
            return True
        else:
            ipv4 = ipaddress.ip_address(ip)
            if ipv4.is_global and Spamhaus.is_in_spamhaus_ip(ip):
                self.ips.append(ip)
                return True
            else:
                self.exclude.append(ip)
                return False

    def is_malicious_domain(self, domain):
        if domain in self.exclude:
            return False
        elif domain in self.domains:
            return True
        else:
            if Spamhaus.is_in_spamhaus_domain(domain):
                self.domains.append(domain)
                return True
            else:
                self.exclude.append(domain)
                return False


class Spamhaus:
    @staticmethod
    def dig_spamhaus(fqdn):
        command = 'dig +short {fqdn}'.format(fqdn=fqdn)
        try:
            result = subprocess.run(
                command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
            if result.returncode != 0:
                return []
            if not result.stdout.decode('utf-8'):
                return []
            else:
                return result.stdout.decode('utf-8').rstrip().split('\n')
        except:  # NOQA
            return []

    @staticmethod
    def is_in_spamhaus_ip(ip):
        return False  # NOTE: Comment out if you use Spamhaus
        malicious_result = [
            '127.0.0.2', '127.0.0.3', '127.0.0.4', '127.0.0.5', '127.0.0.6', '127.0.0.7'
        ]
        reversed_ip = '.'.join(reversed(ip.split('.')))
        result = Spamhaus.dig_spamhaus(reversed_ip + '.zen.spamhaus.org')
        for r in result:
            if r in malicious_result:
                return True
        return False

    @staticmethod
    def is_in_spamhaus_domain(domain):
        return False  # NOTE: Comment out if you use Spamhaus
        malicious_result = [
            '127.0.1.2', '127.0.1.4', '127.0.1.5', '127.0.1.6',
            '127.0.1.102', '127.0.1.103', '127.0.1.104', '127.0.1.105', '127.0.1.106', '127.0.1.107'
        ]
        result = Spamhaus.dig_spamhaus(domain + '.dbl.spamhaus.org')
        for r in result:
            if r in malicious_result:
                return True
        return False
