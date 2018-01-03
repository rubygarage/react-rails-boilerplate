default['postgresql']['client']['version'] = node['postgresql']['version']
default['postgresql']['defaults']['server']['version'] = node['postgresql']['version']

default['postgresql']['database']['name'] = node['project']['name']
