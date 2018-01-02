include_attribute 'nginx::source'

override['nginx']['install_method'] = 'source'
override['nginx']['version'] = node['nginx']['source']['version']
override['nginx']['source']['prefix'] = "/opt/nginx-#{node['nginx']['source']['version']}"
override['nginx']['source']['sbin_path'] = "#{node['nginx']['source']['prefix']}/sbin/nginx"
override['nginx']['binary'] = node['nginx']['source']['sbin_path']
override['nginx']['init_style'] = 'init'

override['nginx']['source']['default_configure_flags'] = %W(
  --prefix=#{node['nginx']['source']['prefix']}
  --conf-path=#{node['nginx']['dir']}/nginx.conf
  --sbin-path=#{node['nginx']['source']['sbin_path']}
)

override['nginx']['source']['modules'] = %w(
  nginx::http_gzip_static_module
  nginx::http_ssl_module
)

override['nginx']['configure_flags'] = %w(
  --with-debug
)

override['nginx']['default_site_enabled'] = false
