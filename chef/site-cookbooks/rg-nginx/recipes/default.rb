include_recipe 'nginx::source'

nginx_dir = node['nginx']['dir']

# HOST ----------------------------------------------------------------------------------------------------------------

template "#{nginx_dir}/sites-available/#{node.domain}" do
  source node.environment == 'production' ? 'production.erb' : 'staging.erb'
  owner 'root'
  group 'root'
  mode '0644'
  variables(
    ip: node[:ipaddress],
    domain: node[:domain],
    project_dir: node['project']['root']
  )
  notifies :restart, 'service[nginx]', :delayed
end

nginx_site node.domain do
  enable true
end
