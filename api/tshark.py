#!/usr/bin/env python3
import subprocess


class Filter:
    def __init__(self, protocol=None, srcip=None, dstip=None,
                 srcport=None, dstport=None, start=None, end=None):
        self.protocol = protocol
        self.ip = Filter.IP(srcip, dstip)
        self.port = Filter.Port(srcport, dstport)
        self.period = Filter.Period(start, end)

    @property
    def display_filter(self):
        filters = []

        if self.ip.src:
            srcips = ['ip.src == {ip}'.format(ip=ip) for ip in self.ip.src]
            filters.append('(' + ' or '.join(srcips) + ')')

        if self.ip.dst:
            dstips = ['ip.dst == {ip}'.format(ip=ip) for ip in self.ip.dst]
            filters.append('(' + ' or '.join(dstips) + ')')

        if self.port.src:
            srcports = ['(tcp.srcport == {port} or udp.srcport == {port})'
                        .format(port=port) for port in self.port.src]
            filters.append('(' + ' or '.join(srcports) + ')')

        if self.port.dst:
            dstports = ['(tcp.dstport == {port} or udp.dstport == {port})'
                        .format(port=port) for port in self.port.dst]
            filters.append('(' + ' or '.join(dstports) + ')')

        if self.protocol:
            filters.append(self.protocol)

        if self.period.start:
            filters.append('frame.time_epoch >= %s' % self.period.start)

        if self.period.end:
            filters.append('frame.time_epoch <= %s' % self.period.end)

        return ' and '.join([filter for filter in filters if filter])

    class IP:
        def __init__(self, srcip=None, dstip=None):
            self.src = srcip or []
            self.dst = dstip or []

    class Port:
        def __init__(self, srcport=None, dstport=None):
            self.src = srcport or []
            self.dst = dstport or []

    class Period:
        def __init__(self, start=None, end=None):
            self.start = start
            self.end = end


def run(input, filter, format, output=None, **options):
    command = make_tshark_command(input, filter, format, output, **options)
    return exec_command(command)


def fields(input, filter, fields, two_pass=False):
    return run(input, filter, 'fields', e=fields, two=two_pass)


def make_tshark_command(input, filter, format, output=None, **options):
    if format == 'pcap':
        command = 'tshark -r \'{input}\' -Y \'{filter}\'' \
            .format(input=input, filter=filter.display_filter)
    else:
        command = 'tshark -r \'{input}\' -Y \'{filter}\' -T {format}' \
            .format(input=input, filter=filter.display_filter, format=format)

    if options.get('e'):
        if format in ['ek', 'fields', 'json', 'pdml']:
            if isinstance(options.get('e'), (list, set, tuple)):
                fields = options.get('e')
            elif isinstance(options.get('e'), str):
                fields = [options.get('e')]
            else:
                fields = []
            command += ''.join([' -e {field}'.format(field=field) for field in fields])

    if options.get('two'):
        command += ' -2'

    if output:
        if format == 'pcap':
            command += ' -w {output}'.format(output=output)
        else:
            command += ' > {output}'.format(output=output)

    return command


def exec_command(command):
    try:
        completed = subprocess.run(
            command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        if completed.returncode != 0:
            error = completed.stderr.decode('utf-8')
            raise CommandError(error)
        if not completed.stdout.decode('utf-8'):
            return []
        else:
            return completed.stdout.decode('utf-8').rstrip().split('\n')
    except CommandError as e:
        raise CommandError(str(e))
    except:  # NOQA
        import traceback
        traceback.print_exc()
        raise ExecutionError('Something went wrong')


class ExecutionError(Exception):
    pass


class CommandError(Exception):
    pass
